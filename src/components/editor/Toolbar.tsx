"use client";

import {
  ConditionalContents,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  ChangeCodeMirrorLanguage,
  BlockTypeSelect,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  Separator,
} from "@mdxeditor/editor";

const Toolbar = () => (
  <ConditionalContents
    options={[
      {
        when: (editor) => editor?.editorType === "codeblock",
        contents: () => <ChangeCodeMirrorLanguage />,
      },
      {
        fallback: () => (
          <>
            <UndoRedo />
            <Separator />

            <BoldItalicUnderlineToggles />
            <CodeToggle />
            <InsertCodeBlock />
            <Separator />

            <InsertImage />
            <BlockTypeSelect />
            <CreateLink />
          </>
        ),
      },
    ]}
  />
);

export default Toolbar;
