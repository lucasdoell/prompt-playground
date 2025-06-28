"use client";

import type { ChatMessage as ChatMessageType } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`w-full flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] break-words rounded-2xl overflow-hidden ${
          message.role === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
        }`}
      >
        <div className="px-3 py-2 text-sm leading-relaxed overflow-wrap-anywhere">
          <ReactMarkdown
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match;

                return !isInline ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md my-2 -mx-1"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className={`${className} bg-black/20 dark:bg-white/20 px-1 py-0.5 rounded text-xs font-mono`}
                    {...rest}
                  >
                    {children}
                  </code>
                );
              },
              pre({ children }) {
                return <div className="overflow-x-auto -mx-1">{children}</div>;
              },
              p({ children }) {
                return <span className="block mb-2 last:mb-0">{children}</span>;
              },
              ul({ children }) {
                return (
                  <ul className="list-disc list-inside mb-2 space-y-1 ml-2">
                    {children}
                  </ul>
                );
              },
              ol({ children }) {
                return (
                  <ol className="list-decimal list-inside mb-2 space-y-1 ml-2">
                    {children}
                  </ol>
                );
              },
              li({ children }) {
                return <li className="text-sm">{children}</li>;
              },
              h1({ children }) {
                return (
                  <h1 className="text-base font-bold mb-2 mt-1">{children}</h1>
                );
              },
              h2({ children }) {
                return (
                  <h2 className="text-sm font-bold mb-1 mt-1">{children}</h2>
                );
              },
              h3({ children }) {
                return (
                  <h3 className="text-sm font-semibold mb-1">{children}</h3>
                );
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-2 border-current pl-3 italic mb-2 opacity-80">
                    {children}
                  </blockquote>
                );
              },
              strong({ children }) {
                return <strong className="font-semibold">{children}</strong>;
              },
              em({ children }) {
                return <em className="italic">{children}</em>;
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <div className="px-3 pb-1 text-xs opacity-70">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
