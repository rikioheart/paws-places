<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Directory pros, partners and events live as static data in src/lib/data.ts — simple to edit without an admin area.
- Public forms (contact, walk registrations) insert via createServerFn in src/lib/forms.functions.ts into insert-only RLS tables — visitors can never read submissions.
- The interactive map is a projected SVG/absolute-positioned layer (no map library) — SSR-safe and on-brand.

- Official WordPress content is imported as static, source-attributed data; never render untrusted WordPress HTML. This keeps public pages SSR-safe without runtime credentials.
- Articles have a /blog parent and /blog/$slug child route with shared static paragraph data so each article is readable and indexable on the replacement site.
- Missing business locations remain unpinned; town coordinates are approximate, not consultation addresses, to avoid implying unsupported location precision.
