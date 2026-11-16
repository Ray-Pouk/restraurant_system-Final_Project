import { useEffect, useRef, useState } from "react";
import { useRestaurant } from "../context/RestaurantContext";
import { getAIResponse, suggestedQuestions } from "../data/aiResponses";
import "./AIAssistant.css";

function AIAssistant() {
  const { menu, orders } = useRestaurant();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm your restaurant assistant. Ask me about specials, dietary options, or recommendations.",
    },
  ]);

  const bottomRef = useRef(null);

  // Keep the newest message in view
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  function sendMessage(text) {
    const question = text.trim();
    if (!question) return;

    const reply = getAIResponse(question, { menu, orders });

    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: "user", text: question },
      { id: Date.now() + 1, sender: "bot", text: reply },
    ]);
    setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <button
        className="ai-toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        {isOpen ? "Close Chat" : "💬 Ask AI"}
      </button>

      {isOpen && (
        <div className="ai-chat" role="dialog" aria-label="AI assistant">
          <div className="ai-header">Restaurant Assistant</div>

          <div className="ai-messages">
            {messages.map((message) => (
              <div key={message.id} className={`ai-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="ai-suggestions">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <form className="ai-input" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}

export default AIAssistant;
