import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";

const InitializedMDXEditor = dynamic(() => import("./initializedMDXEditor"), {
  ssr: false,
});

const Editor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <InitializedMDXEditor {...props} editorRef={ref} />
));

Editor.displayName = "Editor";

export default Editor;
