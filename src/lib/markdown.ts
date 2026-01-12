import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

export type TocItem = { depth: 2 | 3; text: string; id: string };

type MdNode = {
  type?: string;
  value?: unknown;
  depth?: unknown;
  children?: unknown;
};

function isNodeArray(value: unknown): value is MdNode[] {
  return Array.isArray(value);
}

function getTextFromHeadingNode(node: MdNode): string {
  if (!isNodeArray(node.children)) return "";
  return node.children
    .map((child) => {
      if (child.type === "text" || child.type === "inlineCode") {
        return typeof child.value === "string" ? child.value : "";
      }
      if (child && typeof child === "object" && isNodeArray(child.children)) {
        return getTextFromHeadingNode(child);
      }
      return "";
    })
    .join("")
    .trim();
}

export async function renderMarkdownWithToc(markdown: string): Promise<{
  html: string;
  toc: TocItem[];
}> {
  const toc: TocItem[] = [];
  const slugger = new GithubSlugger();

  const mdast = unified().use(remarkParse).use(remarkGfm).parse(markdown);

  visit(mdast, (node) => {
    const n = node as unknown as MdNode;
    if (n.type !== "heading") return;
    const depth = typeof n.depth === "number" ? n.depth : null;
    if (depth !== 2 && depth !== 3) return;

    const text = getTextFromHeadingNode(n);
    if (!text) return;

    toc.push({ depth, text, id: slugger.slug(text) });
  });

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["headingLink"],
      },
    })
    .use(
      rehypeSanitize,
      // Allow basic tables, code blocks, and headings.
      ({
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          a: [
            ...(defaultSchema.attributes?.a ?? []),
            ["href"],
            ["target"],
            ["rel"],
          ],
          code: [...(defaultSchema.attributes?.code ?? []), ["className"]],
          span: [...(defaultSchema.attributes?.span ?? []), ["className"]],
          h2: [...(defaultSchema.attributes?.h2 ?? []), ["id"]],
          h3: [...(defaultSchema.attributes?.h3 ?? []), ["id"]],
        },
      } as unknown as typeof defaultSchema)
    )
    .use(rehypeStringify)
    .process(markdown);

  return { html: String(file), toc };
}
