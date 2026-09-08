/**
 * Creates a <meta> tag if it doesn't exist yet, otherwise updates its
 * content in place. Avoids duplicate tags on hot-reload/remount and
 * keeps App.tsx free of raw DOM query strings.
 */
export function setMetaTag(
  nameOrProperty: string,
  content: string,
  attribute: "name" | "property" = "name"
): void {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${nameOrProperty}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, nameOrProperty);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
