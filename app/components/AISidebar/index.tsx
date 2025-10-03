"use client";
import React, { useState } from "react";
import { X, MessageCircle, Send, Loader2 } from "lucide-react";

interface QAPair {
  id: string;
  question: string;
  answer: string;
  timestamp: Date;
}

interface AISidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AISidebar: React.FC<AISidebarProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<QAPair[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const currentQuestion = question.trim();
    setQuestion("");
    setIsLoading(true);

    try {
      // Use our secure server-side API route instead of calling external API directly
      const response = await fetch("/api/family-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: currentQuestion }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get answer: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Handle the specific response format: { data: { answer: "...", question: "..." }, success: true }
      const answerText =
        data.data?.answer || data.answer || "Sorry, I couldn't generate an answer.";

      const newQA: QAPair = {
        id: Date.now().toString(),
        question: currentQuestion,
        answer: answerText,
        timestamp: new Date(),
      };

      setConversations((prev) => [newQA, ...prev]);
    } catch (error) {
      console.error("Error asking question:", error);
      const errorQA: QAPair = {
        id: Date.now().toString(),
        question: currentQuestion,
        answer: "Sorry, there was an error processing your question. Please try again.",
        timestamp: new Date(),
      };
      setConversations((prev) => [errorQA, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onClose();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 max-w-sm sm:max-w-none bg-zinc-900 border-l border-zinc-700 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-zinc-700">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold text-zinc-100 truncate">
                <span className="hidden sm:inline">Ask about Family Tree</span>
                <span className="sm:hidden">Family AI</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {conversations.length === 0 && !isLoading && (
              <div className="text-center text-zinc-500 mt-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Ask me anything about the family tree!</p>
                <p className="text-xs mt-2 opacity-75">
                  Try questions like "Who are Juan Pablo Rivillas Ospina's children?" or "Tell me about David Rivillas de Magalhaes". You must use the full name.
                </p>
              </div>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <div className="flex items-center space-x-2 text-zinc-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}

            {/* Conversation history */}
            {conversations.map((qa) => (
              <div key={qa.id} className="space-y-3">
                {/* Question */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 rounded-lg px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[80%]">
                    <p className="text-white text-sm break-words">{qa.question}</p>
                    <p className="text-blue-200 text-xs mt-1 opacity-75">
                      {formatTime(qa.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Answer */}
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-lg px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[80%] border border-zinc-700">
                    <p className="text-zinc-100 text-sm whitespace-pre-wrap break-words">
                      {qa.answer}
                    </p>
                    <p className="text-zinc-500 text-xs mt-1 opacity-75">
                      AI • {formatTime(qa.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input form */}
          <div className="p-3 sm:p-4 border-t border-zinc-700">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about family..."
                className="flex-1 bg-zinc-800 border border-zinc-600 rounded-md px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-w-0"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!question.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-md px-3 py-2 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-zinc-500 mt-2 hidden sm:block">
              Each question is independent - no conversation history is maintained.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
