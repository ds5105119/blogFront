import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import stripMarkdown from "strip-markdown";
import remarkStringify from "remark-stringify";

export default async function extractDataFromMarkdownWithMatter(
  markdown: string,
): Promise<{ content: string; data: any; tags: any; image: string | null }> {
  const { content, data } = matter(markdown);

  const result = await unified()
    .use(remarkParse)
    .use(stripMarkdown)
    .use(remarkStringify)
    .process(content);

  const strippedContent = result.toString();
  const tagRegex = /#([\w가-힣]+)/g;
  const tags = [...strippedContent.matchAll(tagRegex)].map((match) => match[1]);

  const imageRegex = new RegExp(
    `!\\[.*?\\]\\((${process.env.NEXT_PUBLIC_AWS_S3_URL}[^)]+)\\)`,
    "i",
  );
  const imageMatch = markdown.match(imageRegex);
  const imageUrl = imageMatch ? imageMatch[1] : null;

  return {
    content: strippedContent,
    data: markdown,
    tags: tags,
    image: imageUrl,
  };
}
