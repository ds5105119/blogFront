import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";


export const serializeMdx = (source: string) => {
  return serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkToc, remarkGfm],
      rehypePlugins: [
        rehypeCodeTitles,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
      format: "mdx",
    },
  });
};