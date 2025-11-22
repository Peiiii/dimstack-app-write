import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/toolkit/utils/shadcn-utils';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  isDark?: boolean;
}

export const MarkdownRenderer = ({ content, className, isDark = false }: MarkdownRendererProps) => {
  return (
    <div className={cn("prose dark:prose-invert max-w-none text-sm break-words", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
              const { children, className, node: _node, ref: _ref, ...rest } = props as { children?: React.ReactNode, className?: string, node?: unknown, ref?: unknown, [key: string]: unknown };
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <div className="relative group">
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    language={match[1]}
                    style={isDark ? vscDarkPlus : oneLight}
                    className="rounded-md border border-border/50 !my-3"
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code {...rest} className={cn("bg-muted px-1.5 py-0.5 rounded-sm font-mono text-xs", className)}>
                  {children}
                </code>
              );
          },
          p({ children }) {
              return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
          },
          ul({ children }) {
              return <ul className="list-disc list-outside ml-4 mb-2 space-y-1">{children}</ul>
          },
          ol({ children }) {
              return <ol className="list-decimal list-outside ml-4 mb-2 space-y-1">{children}</ol>
          },
          li({ children }) {
              return <li className="leading-relaxed">{children}</li>
          },
          h1({ children }) {
              return <h1 className="text-base font-bold mt-4 mb-2 border-b pb-1">{children}</h1>
          },
          h2({ children }) {
              return <h2 className="text-sm font-bold mt-3 mb-2">{children}</h2>
          },
          h3({ children }) {
              return <h3 className="text-sm font-semibold mt-2 mb-1">{children}</h3>
          },
          h4({ children }) {
              return <h4 className="text-xs font-semibold mt-2 mb-1">{children}</h4>
          },
          a({ children, href }) {
              return <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4 hover:text-primary/80">{children}</a>
          },
          blockquote({ children }) {
              return <blockquote className="border-l-2 border-primary/50 pl-4 italic text-muted-foreground my-2">{children}</blockquote>
          },
          table({ children }) {
            return <div className="my-4 w-full overflow-y-auto rounded-md border border-border"><table className="w-full text-sm m-0 border-collapse">{children}</table></div>;
          },
          thead({ children }) {
            return <thead className="bg-muted/50 text-left font-medium border-b border-border">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody className="divide-y divide-border/50">{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="hover:bg-muted/30 transition-colors m-0 p-0">{children}</tr>;
          },
          th({ children }) {
            return <th className="px-4 py-2 font-medium border-r border-border/50 last:border-r-0">{children}</th>;
          },
          td({ children }) {
            return <td className="px-4 py-2 border-r border-border/50 last:border-r-0">{children}</td>;
          },
          hr() {
            return <hr className="my-4 border-border" />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
