import React, { useState } from "react";
import DOMPurify from "dompurify";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: newMessages,
        }),
      });

      const data = await response.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn’t get a response.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    const safeHtml = DOMPurify.sanitize(
      content
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
        .replace(/\n/g, "<br />") // line breaks
        .replace(
          /(\d+)\.\s(.*?)(?=<br|$)/g,
          "<div><strong>$1.</strong> $2</div>"
        ) // numbered list
    );
    return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg"
      >
        {isOpen ? "Close Chat" : "🩺 MediChatBot"}
        {/* 💬 */}
      </button>

      {isOpen && (
        <div className="mt-4 w-80 h-96 bg-white rounded-xl shadow-lg flex flex-col border border-gray-200 overflow-hidden">
          <div className="p-3 font-bold bg-red-600 text-white rounded-t-xl flex items-center justify-between">
            🩺 QRUPAY Chatbot
          </div>
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg max-w-[90%] ${
                    msg.role === "user"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.role === "assistant"
                    ? formatMessage(msg.content)
                    : msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center text-gray-400">Typing...</div>
            )}
          </div>
          <div className="p-2 border-t border-gray-200 flex items-center gap-2">
            <input
              className="flex-1 border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring focus:border-red-300"
              type="text"
              placeholder="Ask about fever, symptoms, etc..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
