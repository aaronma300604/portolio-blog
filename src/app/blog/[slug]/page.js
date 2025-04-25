import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import ZoomBlurBackground from '@/components/ZoomBlurBackground';
import { LinkIcon } from '@/components/Icons';



function generateHeaderIdFromChildren(children) {
        const headerText = typeof children === 'string'
        ? children
        : children.map(child => (typeof child === 'string' ? child : child.props?.children || '')).join('');
    
        return headerText
        .toLowerCase()
        .replace(/\s+/g, '-') 
        .replace(/[^\w-]/g, '');
    }

function transformExcalidrawLinks(content) {
    const newContent = content.replace(/!\[\[([^\]]+?)(?:\s*\|\s*\d+)?\]\]/g, (match, filename) => {
        console.log(filename);
        const imagePath = `/embeddings/${filename.replace('.excalidraw', '.svg').replace(/\s+/g, '-').toLowerCase()}`;
        console.log(imagePath);
        return `![${filename}](${imagePath})`;
    });
    return newContent;
}

  function transformObsidianInternalLinks(content) {
    return content.replace(/(?<!!)\[\[([^\]]+)\]\]/g, (match, p1) => {
      const [slug, label] = p1.split('|');
      const linkText = label || slug.trim();
      const anchorLink = `#${slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
      return `[${linkText}](${anchorLink})`;
    });
  }
  
  function transformObsidianLinks(content) {
    content = transformObsidianInternalLinks(content);
    content = transformExcalidrawLinks(content);
        return content;
  }
  
  
      

const postsDir = path.join(process.cwd(), 'src', 'posts');

export async function generateStaticParams() {
    const filenames = fs.readdirSync(postsDir);
    return filenames.map((filename) => ({
        slug: filename.replace(/\.md$/, ''),
    }));
}

const renderers = {
    h1: ({ node, ...props }) => <h1 className="mt-10 text-4xl font-bold" id={generateHeaderIdFromChildren(props.children)} {...props} />,
    h2: ({ node, ...props }) => <h2 className="mt-8 text-3xl font-semibold" id={generateHeaderIdFromChildren(props.children)} {...props} />,
    h3: ({ node, ...props }) => <h3 className="mt-6 text-2xl font-semibold" id={generateHeaderIdFromChildren(props.children)} {...props} />,
    h4: ({ node, ...props }) => <h4 className="mt-6 text-xl font-semibold" id={generateHeaderIdFromChildren(props.children)} {...props} />,
    h5: ({ node, ...props }) => <h5 className="mt-6 text-0.5xl font-semibold" id={generateHeaderIdFromChildren(props.children)} {...props} />,
    p: ({ node, ...props }) => <p className="my-4" {...props} />,
    a: ({ node, ...props }) => <a className="text-blue-600 underline" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-8 my-4" {...props} />, 
    ol: ({ node, ...props }) => <ol className="list-decimal pl-8 my-4" {...props} />,
    li: ({ node, ...props }) => <li className="my-2" {...props} />,
  };

export default async function Page({ params }) {
  if (!params?.slug) {
    throw new Error("Missing slug param");
  }
  
    const filePath = path.join(postsDir, `${params.slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);
  
    const transformedContent = transformObsidianLinks(content);
  
    return (
      <ZoomBlurBackground imageUrl={data.image || '/images/examplecart.svg'}>
      <div className="prose max-w-4xl mt-40 mx-auto p-8 bg-[var(--post-container-bg)]/70 backdrop-blur-md rounded-2xl shadow-xl">
      <div className="flex items-center mt-10">
      <h1 className="text-4xl font-bold flex items-center">
        {data.title}
        <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 w-8 h-8 flex items-center justify-center"
        >
        {LinkIcon}
        </a>
      </h1>
      </div>
      <ReactMarkdown
      skipHtml={false}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={renderers}
      >
      {transformedContent}
      </ReactMarkdown>
      </div>
      </ZoomBlurBackground>
    );
  }
