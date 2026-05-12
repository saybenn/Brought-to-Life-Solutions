// /lib/blog/sanitize.ts
import sanitizeHtml, {
  type Attributes,
  type IOptions,
  type Tag,
} from "sanitize-html";

// Tight, blog-friendly allowlist (+ optional iframe for YouTube/Vimeo)
export function sanitizePostHtml(dirty: string): string {
  const opts: IOptions = {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "s",
      "blockquote",
      "h1",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "a",
      "code",
      "pre",
      "img",
      "hr",
      "span",
      "iframe", // video embeds
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title"],
      iframe: [
        "src",
        "width",
        "height",
        "frameborder",
        "allow",
        "allowfullscreen",
      ],
      span: ["style"],
      p: ["style"],
      h1: ["style"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),

      // Force iframe src to approved hosts; otherwise drop it.
      // IMPORTANT: return type MUST always be Tag (with attribs: Attributes).
      iframe: (tagName: string, attribs: Attributes): Tag => {
        const src = String(attribs.src ?? "");

        const okYoutube =
          /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+$/.test(src);
        const okVimeo =
          /^https:\/\/player\.vimeo\.com\/video\/\d+$/.test(src);

        if (!okYoutube && !okVimeo) {
          return {
            tagName: "span",
            attribs: { "data-embed": "removed" }, // MUST be string values
            text: "",
          };
        }

        return {
          tagName: "iframe",
          attribs: {
            src,
            width: String(attribs.width ?? "560"),
            height: String(attribs.height ?? "315"),
            frameborder: String(attribs.frameborder ?? "0"),
            allow: String(
              attribs.allow ??
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            ),
            allowfullscreen: "true",
          },
        };
      },
    },
    disallowedTagsMode: "discard",
  };

  return sanitizeHtml(dirty, opts);
}