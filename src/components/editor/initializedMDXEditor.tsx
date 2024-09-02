"use client";

import { useState, useEffect } from "react";
import Toolbar from "./toolbar";
import imageUploadHandler from "@/lib/\beditor/imageUploadHandler";
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  imagePlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

const codeBlockLanguages = {
  js: "JavaScript",
  ts: "Typescript",
  tsx: "TypeScript (React)",
  python: "Python",
  css: "CSS",
};

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        // ToolBar Plugin
        toolbarPlugin({
          toolbarContents: Toolbar,
        }),

        // Core Plugin
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),

        // CodeBlock Plugiin
        codeBlockPlugin({
          defaultCodeBlockLanguage: "js",
        }),
        codeMirrorPlugin({
          codeBlockLanguages: codeBlockLanguages,
        }),

        // Image Upload Plugin
        imagePlugin({ imageUploadHandler }),
      ]}
      {...props}
      ref={editorRef}
      contentEditableClassName="prose"
    />
  );
}
