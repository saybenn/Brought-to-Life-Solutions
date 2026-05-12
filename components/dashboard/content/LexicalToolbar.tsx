// /components/dashboard/content/LexicalToolbar.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";

function promptUrl(label: string): string | null {
  const v = prompt(label);
  if (!v) return null;
  const trimmed = v.trim();
  return trimmed ? trimmed : null;
}

function escapeAttr(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// YouTube/Vimeo -> iframe embed HTML
function buildVideoEmbedHtml(url: string) {
  const u = url.trim();

  const ytMatch =
    u.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/) ||
    u.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (ytMatch?.[1]) {
    const id = ytMatch[1];
    return `<iframe src="https://www.youtube.com/embed/${id}" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  const vmMatch = u.match(/vimeo\.com\/(\d+)/);
  if (vmMatch?.[1]) {
    const id = vmMatch[1];
    return `<iframe src="https://player.vimeo.com/video/${id}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }

  // fallback: link
  const safe = escapeAttr(u);
  return `<p><a href="${safe}" target="_blank" rel="noopener noreferrer">${safe}</a></p>`;
}

function ToolbarButton({
  title,
  active,
  disabled,
  onClick,
  children,
}: {
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      aria-pressed={active}
      onClick={onClick}
      style={{
        height: 32,
        minWidth: 32,
        padding: "0 10px",
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: active
          ? "color-mix(in oklab, var(--sage-100) 70%, var(--white))"
          : "var(--bg-elevated)",
        color: "var(--ink-900)",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        lineHeight: "32px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 1,
        height: 22,
        background: "var(--border)",
        display: "inline-block",
        alignSelf: "center",
        margin: "0 6px",
      }}
    />
  );
}

// Insert arbitrary HTML into Lexical by converting it to nodes
function insertHtml(editor: any, html: string) {
  editor.update(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;

    const parser = new DOMParser();
    const dom = parser.parseFromString(html, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    $insertNodes(nodes);

    // ensure paragraph after embeds so typing continues normally
    $insertNodes([$createParagraphNode()]);
  });
}

export default function LexicalToolbar({
  disabled,
  onUploadImage,
  onUploadVideo,
  rightSlot,
}: {
  disabled?: boolean;
  onUploadImage?: () => Promise<string | null>; // returns public URL
  onUploadVideo?: () => Promise<string | null>; // returns video URL to embed
  rightSlot?: React.ReactNode;
}) {
  const [editor] = useLexicalComposerContext();

  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }: any) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        setFormats({
          bold: selection.hasFormat("bold"),
          italic: selection.hasFormat("italic"),
          underline: selection.hasFormat("underline"),
        });
      });
    });
  }, [editor]);

  const applyHeading = useCallback(
    (tag: "h1" | "h2" | "h3" | "p") => {
      editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        if (tag === "p") {
          $setBlocksType(selection, () => $createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(tag));
        }
      });
    },
    [editor],
  );

  const insertQuote = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      $setBlocksType(selection, () => $createQuoteNode());
    });
  }, [editor]);

  const insertHr = useCallback(() => {
    insertHtml(editor, `<hr />`);
  }, [editor]);

  const insertLink = useCallback(() => {
    const url = promptUrl("Link URL:");
    if (!url) return;
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
  }, [editor]);

  const insertImage = useCallback(async () => {
    // Prefer upload picker
    if (onUploadImage) {
      const url = await onUploadImage();
      if (!url) return;
      insertHtml(editor, `<p><img src="${escapeAttr(url)}" alt="" /></p>`);
      return;
    }

    // fallback prompt
    const url = promptUrl("Image URL:");
    if (!url) return;
    insertHtml(editor, `<p><img src="${escapeAttr(url)}" alt="" /></p>`);
  }, [editor, onUploadImage]);

  const insertVideo = useCallback(async () => {
    let url: string | null = null;
    if (onUploadVideo) url = await onUploadVideo();
    else url = promptUrl("Video URL (YouTube/Vimeo):");
    if (!url) return;

    const html = buildVideoEmbedHtml(url);
    insertHtml(editor, html);
  }, [editor, onUploadVideo]);

  const layout = useMemo(
    () => ({
      container: {
        display: "flex",
        flexWrap: "wrap" as const,
        gap: 10,
        padding: 10,
        borderBottom: "1px solid var(--border)",
        position: "sticky" as const,
        top: 0,
        background: "var(--bg-elevated)",
        zIndex: 5,
        justifyContent: "space-between" as const,
        alignItems: "center" as const,
      },
      left: {
        display: "flex",
        flexWrap: "wrap" as const,
        gap: 8,
        alignItems: "center" as const,
      },
      right: {
        display: "flex",
        gap: 8,
        alignItems: "center" as const,
      },
    }),
    [],
  );

  return (
    <div style={layout.container}>
      <div style={layout.left}>
        {/* text */}
        <ToolbarButton
          title="Bold"
          active={formats.bold}
          disabled={disabled}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        >
          <b>B</b>
        </ToolbarButton>

        <ToolbarButton
          title="Italic"
          active={formats.italic}
          disabled={disabled}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        >
          <i>I</i>
        </ToolbarButton>

        <ToolbarButton
          title="Underline"
          active={formats.underline}
          disabled={disabled}
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          }
        >
          <u>U</u>
        </ToolbarButton>

        <Divider />

        {/* headings */}
        <ToolbarButton
          title="Heading 1"
          disabled={disabled}
          onClick={() => applyHeading("h1")}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          title="Heading 2"
          disabled={disabled}
          onClick={() => applyHeading("h2")}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          disabled={disabled}
          onClick={() => applyHeading("h3")}
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          title="Paragraph"
          disabled={disabled}
          onClick={() => applyHeading("p")}
        >
          ¶
        </ToolbarButton>

        <Divider />

        {/* lists */}
        <ToolbarButton
          title="Bulleted list"
          disabled={disabled}
          onClick={() =>
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
          }
        >
          • List
        </ToolbarButton>

        <ToolbarButton
          title="Numbered list"
          disabled={disabled}
          onClick={() =>
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
          }
        >
          1. List
        </ToolbarButton>

        <ToolbarButton
          title="Remove list"
          disabled={disabled}
          onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}
        >
          ⟲
        </ToolbarButton>

        <Divider />

        {/* blocks */}
        <ToolbarButton title="Quote" disabled={disabled} onClick={insertQuote}>
          ❝
        </ToolbarButton>

        <ToolbarButton
          title="Horizontal rule"
          disabled={disabled}
          onClick={insertHr}
        >
          —
        </ToolbarButton>

        <Divider />

        {/* links/media */}
        <ToolbarButton title="Link" disabled={disabled} onClick={insertLink}>
          🔗
        </ToolbarButton>

        <ToolbarButton title="Image" disabled={disabled} onClick={insertImage}>
          🖼
        </ToolbarButton>

        <ToolbarButton title="Video" disabled={disabled} onClick={insertVideo}>
          ▶
        </ToolbarButton>
      </div>

      {rightSlot ? <div style={layout.right}>{rightSlot}</div> : null}
    </div>
  );
}
