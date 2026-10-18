import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw, Copy, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { ADVISOR_STORAGE_KEY, advisorEventSchema, messageText, restoreConversation, type AdvisorMessage } from "@/lib/advisor";
import logo from "@/assets/logo-lvdc.png";

export function DogAdvisor() {
  const [messages, setMessages] = useState<AdvisorMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"ready" | "submitted" | "streaming" | "error">("ready");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const active = useRef<AbortController | null>(null);
  const busy = status === "submitted" || status === "streaming";
  const focus = () => requestAnimationFrame(() => textarea.current?.focus());
  useEffect(() => {
    try { setMessages(restoreConversation(localStorage.getItem(ADVISOR_STORAGE_KEY))); }
    catch { setStorageWarning(true); }
    setLoaded(true);
    textarea.current?.focus();
    return () => active.current?.abort();
  }, []);
  function save(next: AdvisorMessage[]) {
    try { localStorage.setItem(ADVISOR_STORAGE_KEY, JSON.stringify(next)); }
    catch { setStorageWarning(true); }
  }
  async function send(text: string) {
    if (!text.trim() || active.current || !loaded) return;
    const user: AdvisorMessage = { id: crypto.randomUUID(), role: "user", parts: [{ type: "text", text: text.trim() }] };
    const history = [...messages, user];
    setMessages(history); save(history); setInput(""); setError(""); setStatus("submitted"); focus();
    const controller = new AbortController(); active.current = controller;
    const id = crypto.randomUUID(); let output = ""; let done = false;
    try {
      const response = await fetch("/api/advisor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }), signal: controller.signal });
      if (!response.ok) {
        const failure: unknown = await response.json();
        throw new Error(typeof failure === "object" && failure !== null && "message" in failure && typeof failure.message === "string" ? failure.message : "Le conseiller est indisponible.");
      }
      if (!response.body) throw new Error("La réponse est indisponible.");
      const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = "";
      function consume(line: string) {
        if (!line.trim()) return;
        const event = advisorEventSchema.parse(JSON.parse(line));
        if (event.type === "error") throw new Error(event.message);
        if (event.type === "done") { done = true; return; }
        output += event.text; setStatus("streaming");
        setMessages([...history, { id, role: "assistant", parts: [{ type: "text", text: output }] }]);
      }
      try {
        while (true) {
          const chunk = await reader.read();
          if (chunk.done) break;
          buffer += decoder.decode(chunk.value, { stream: true });
          const lines = buffer.split("\n"); buffer = lines.pop() ?? "";
          for (const line of lines) consume(line);
        }
        buffer += decoder.decode(); consume(buffer);
      } finally { reader.releaseLock(); }
      if (!done || !output) throw new Error("La réponse n’a pas pu être terminée. Votre demande est conservée.");
      save([...history, { id, role: "assistant", parts: [{ type: "text", text: output }] }]);
      setStatus("ready");
    } catch (failure) {
      if (controller.signal.aborted) { setStatus("ready"); setError("Réponse interrompue."); }
      else { setStatus("error"); setError(failure instanceof Error ? failure.message : "Le conseiller est indisponible. Votre demande est conservée."); }
    } finally { active.current = null; focus(); }
  }
  function clear() {
    if (!window.confirm("Effacer cet échange de votre navigateur ?")) return;
    setMessages([]); save([]); setError(""); setInput(""); setStatus("ready"); focus();
  }
  return (
    <section className="mx-auto max-w-4xl px-5 pb-6 pt-32">
      <div className="flex items-center justify-between gap-3 border-b pb-5">
        <div className="flex min-w-0 items-center gap-3">
          <img src={logo} alt="La Voix du Chien" className="h-12 w-12 shrink-0 rounded-full" />
          <div><p className="text-xs font-semibold uppercase text-primary">Le chien au cœur</p><h1 className="mt-1 text-2xl md:text-3xl">Parlons de votre chien</h1></div>
        </div>
        <Button variant="ghost" size="icon" aria-label="Effacer l’échange" title="Effacer l’échange" disabled={busy || !messages.length} onClick={clear}><RotateCcw /></Button>
      </div>
      <div className="flex h-[min(650px,68svh)] min-h-[360px] flex-col">
        <Conversation aria-label="Échange avec le conseiller" className="min-h-0">
          <ConversationContent className="gap-6 px-0 py-6">
            {!messages.length && <div className="py-6">
              <h2 className="text-2xl">Chaque duo a son histoire.</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">Qu’est-ce qui vous préoccupe ou vous ferait plaisir avec votre chien aujourd’hui ?</p>
              <div className="mt-7 flex flex-col items-start gap-3">
                {["Mon chien réagit aux autres chiens en balade", "Je cherche une activité à partager avec mon chien", "Je prépare des vacances avec mon chien"].map((text) => <Button key={text} variant="outline" disabled={!loaded} onClick={() => void send(text)} className="h-auto max-w-full justify-between whitespace-normal text-left py-3"><span>{text}</span><ArrowRight className="shrink-0" /></Button>)}
              </div>
            </div>}
            {messages.map((message) => <Message key={message.id} from={message.role} className="max-w-full">
              <p className={`text-xs font-medium ${message.role === "user" ? "text-right text-muted-foreground" : "text-primary"}`}>{message.role === "user" ? "Vous" : "Conseiller · La Voix du Chien"}</p>
              <MessageContent className={message.role === "user" ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground" : "w-full text-base leading-relaxed"}>
                {message.parts.map((part, i) => message.role === "assistant" ? <MessageResponse key={i} className="break-words [&_a]:text-primary [&_a]:underline">{part.text}</MessageResponse> : <p key={i} className="whitespace-pre-wrap break-words">{part.text}</p>)}
              </MessageContent>
              {message.role === "assistant" && !busy && <Button variant="ghost" size="icon-sm" title={copied === message.id ? "Copié" : "Copier la réponse"} aria-label={copied === message.id ? "Réponse copiée" : "Copier la réponse"} onClick={() => void navigator.clipboard.writeText(messageText(message)).then(() => setCopied(message.id)).catch(() => setError("Copie impossible dans ce navigateur."))}><Copy /></Button>}
            </Message>)}
            {status === "submitted" && <Shimmer>Je prends le temps de vous lire…</Shimmer>}
          </ConversationContent>
          <ConversationScrollButton aria-label="Voir les derniers messages" />
        </Conversation>
        {error && <div role="alert" className="mb-3 text-sm text-destructive">{error} <Link to="/contact" className="underline">Contacter l’association</Link></div>}
        <PromptInput className="bg-card" onSubmit={({ text }) => { void send(text); }}>
          <PromptInputTextarea ref={textarea} value={input} onChange={(e) => setInput(e.target.value)} aria-label="Votre besoin concernant votre chien" placeholder="L’âge de votre chien, votre situation, votre ville…" className="min-h-20 text-base" />
          <PromptInputFooter className="justify-end"><PromptInputSubmit status={status} disabled={!loaded || (!busy && !input.trim())} onStop={() => active.current?.abort()} aria-label={busy ? "Arrêter la réponse" : "Envoyer votre besoin"} title={busy ? "Arrêter la réponse" : "Envoyer"} className="h-10 w-10" /></PromptInputFooter>
        </PromptInput>
      </div>
      <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /><p>Conseiller IA, sans diagnostic vétérinaire. Vos messages sont envoyés à AI Gateway pour répondre et conservés dans ce navigateur. Évitez les informations personnelles.{storageWarning && " La sauvegarde locale n’est pas disponible."}</p></div>
    </section>
  );
}