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
  ListsToggle,
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
            <ListsToggle />
            <Separator />

            <CodeToggle />
            <InsertCodeBlock />
            <Separator />

            <BlockTypeSelect />
            <InsertImage />
            <CreateLink />
          </>
        ),
      },
    ]}
  />
);

export default Toolbar;
