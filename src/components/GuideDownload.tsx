import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Only set this to the original association PDF once it has been supplied.
export const GUIDE_URL: string | null = null;

export function GuideDownload() {
  return <div>
    {GUIDE_URL ? <Button asChild><a href={GUIDE_URL} download><Download /> Télécharger maintenant</a></Button> : <Button disabled><Download /> Télécharger maintenant</Button>}
    {!GUIDE_URL && <p className="mt-2 text-sm text-muted-foreground">Le guide gratuit sera bientôt disponible.</p>}
  </div>;
}