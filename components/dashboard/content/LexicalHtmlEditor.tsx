// /components/dashboard/content/LexicalHtmlEditor.tsx
import React, { useMemo } from "react";
import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { $getRoot } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";

import LexicalToolbar from "./LexicalToolbar";

type Props = {
  valueHtml: string;
  onChangeHtml: (html: string) => void;
  readOnly?: boolean;
  onUploadImage?: () => Promise<string | null>;
  onUploadVideo?: () => Promise<string | null>;
  rightSlot?: React.ReactNode;
};

function Placeholder() {
  return (
    <div
      className="caption"
      style={{
        position: "absolute",
        pointerEvents: "none",
        top: 12,
        left: 12,
        color: "var(--muted)",
      }}
    >
      Write your post…
    </div>
  );
}

function buildInitialConfig(
  valueHtml: string,
  readOnly?: boolean,
): InitialConfigType {
  return {
    namespace: "BTLSBlogEditor",
    editable: !readOnly,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
    onError(error) {
      console.error(error);
    },
    editorState: (editor) => {
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        if (!valueHtml?.trim()) return;

        const parser = new DOMParser();
        const dom = parser.parseFromString(valueHtml, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        root.append(...nodes);
      });
    },
  };
}

export default function LexicalHtmlEditor({
  valueHtml,
  onChangeHtml,
  readOnly,
  onUploadImage,
  onUploadVideo,
  rightSlot,
}: Props) {
  const initialConfig = useMemo(
    () => buildInitialConfig(valueHtml, readOnly),
    [valueHtml, readOnly],
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--r-md)",
            overflow: "hidden",
            background: "var(--bg-elevated)",
          }}
        >
          <LexicalToolbar
            disabled={readOnly}
            onUploadImage={onUploadImage}
            onUploadVideo={onUploadVideo}
            rightSlot={rightSlot}
          />

          <div style={{ position: "relative" }}>
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  style={{
                    minHeight: 320,
                    padding: 12,
                    outline: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--size-lg)",
                    lineHeight: "var(--leading-relaxed)",
                    color: "var(--ink-700)",
                  }}
                />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>

          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <OnChangePlugin
            onChange={(editorState, editor) => {
              editorState.read(() => {
                const html = $generateHtmlFromNodes(editor, null);
                onChangeHtml(html);
              });
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}
