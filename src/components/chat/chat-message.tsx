"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type {
  ChatMessage as ChatMessageType,
  EnhancedChatMessage,
  MessagePart,
} from "@/types/chat";
import { isEnhancedMessage } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessageProps {
  message: ChatMessageType | EnhancedChatMessage;
}

function MessagePartRenderer({
  part,
  hasReasoningParts = false,
}: {
  part: MessagePart;
  hasReasoningParts?: boolean;
}) {
  switch (part.type) {
    case "text":
      return (
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
              return <h3 className="text-sm font-semibold mb-1">{children}</h3>;
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
          {part.text}
        </ReactMarkdown>
      );

    case "reasoning":
      return (
        <div className="text-sm text-muted-foreground opacity-70 font-mono whitespace-pre-wrap">
          {part.text}
        </div>
      );

    case "tool-invocation":
      return (
        <div className="mt-2 border-l-2 border-blue-300 dark:border-blue-600 pl-3 bg-blue-50 dark:bg-blue-900/20 rounded-r-md py-2">
          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
            Tool: {part.toolInvocation.toolName} ({part.toolInvocation.state})
          </div>
          {part.toolInvocation.state === "call" && part.toolInvocation.args && (
            <pre className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/30 p-2 rounded overflow-x-auto">
              {JSON.stringify(part.toolInvocation.args, null, 2)}
            </pre>
          )}
          {part.toolInvocation.state === "result" &&
            part.toolInvocation.result && (
              <pre className="text-xs text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-800/30 p-2 rounded overflow-x-auto">
                {JSON.stringify(part.toolInvocation.result, null, 2)}
              </pre>
            )}
          {part.toolInvocation.state === "error" &&
            part.toolInvocation.errorMessage && (
              <div className="text-xs text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-800/30 p-2 rounded">
                Error: {part.toolInvocation.errorMessage}
              </div>
            )}
        </div>
      );

    case "source":
      return (
        <div className="mt-2 text-xs">
          <a
            href={part.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            📎 {part.source.title || part.source.url}
          </a>
        </div>
      );

    case "file":
      return (
        <div className="mt-2 p-2 border border-gray-200 dark:border-gray-700 rounded-md">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            File: {part.filename || "Unnamed"} ({part.mediaType})
          </div>
          {part.mediaType.startsWith("image/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={part.url}
              alt={part.filename || "Image"}
              className="max-w-full h-auto rounded"
            />
          ) : (
            <a
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline text-sm"
            >
              Download {part.filename || "file"}
            </a>
          )}
        </div>
      );

    case "step-start":
      return hasReasoningParts ? (
        <hr className="my-2 border-gray-300 dark:border-gray-600" />
      ) : null;

    default:
      return null;
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  // Use type guard to check if this is an enhanced message with parts
  const isEnhanced = isEnhancedMessage(message);

  // Separate reasoning and non-reasoning parts
  const reasoningParts = isEnhanced
    ? message.parts.filter((part) => part.type === "reasoning")
    : [];
  const nonReasoningParts = isEnhanced
    ? message.parts.filter((part) => part.type !== "reasoning")
    : [];

  // Calculate estimated thinking time based on reasoning text length
  const totalReasoningLength = reasoningParts.reduce(
    (total, part) => total + (part as { text: string }).text.length,
    0
  );
  const estimatedSeconds = Math.max(1, Math.round(totalReasoningLength / 100)); // Rough estimate

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
          {isEnhanced ? (
            // Render message parts for enhanced messages
            <>
              {/* Render reasoning parts in accordion if present - pinned to top */}
              {reasoningParts.length > 0 && (
                <div className="mb-2">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="thinking" className="border-none">
                      <AccordionTrigger className="text-xs text-muted-foreground hover:no-underline py-2">
                        Thought for {estimatedSeconds} second
                        {estimatedSeconds !== 1 ? "s" : ""}
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        <div className="space-y-1">
                          {reasoningParts.map((part, index) => (
                            <MessagePartRenderer
                              key={`reasoning-${index}`}
                              part={part}
                              hasReasoningParts={true}
                            />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {/* Render non-reasoning parts after accordion */}
              {nonReasoningParts.map((part, index) => (
                <MessagePartRenderer
                  key={`non-reasoning-${index}`}
                  part={part}
                  hasReasoningParts={reasoningParts.length > 0}
                />
              ))}
            </>
          ) : (
            // Fallback to legacy content rendering for backward compatibility
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
                  return (
                    <div className="overflow-x-auto -mx-1">{children}</div>
                  );
                },
                p({ children }) {
                  return (
                    <span className="block mb-2 last:mb-0">{children}</span>
                  );
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
                    <h1 className="text-base font-bold mb-2 mt-1">
                      {children}
                    </h1>
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
          )}
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
