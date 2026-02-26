import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  hello: "Hello! Welcome to FreightIQ. How can I help you with your freight and logistics needs today?",
  hi: "Hi there! I'm your FreightIQ assistant. Ask me about shipment tracking, risk prediction, or booking.",
  shipment: "You can track and manage shipments from the Dashboard. Use 'Book Shipment' to create new ones with origin, destination, cargo type, and mode selection.",
  risk: "Our AI engine calculates risk scores (0-100) using 50+ factors including weather, port congestion, customs delays, and route stability. Check the Risk Prediction page for details.",
  delay: "FreightIQ predicts delays up to 72 hours in advance using ML models. Visit Risk Prediction to see delay probability, predicted delay time, and contributing factors.",
  book: "To book a shipment, go to 'Book Shipment' in the sidebar. Enter origin, destination, cargo type, mode, and date. You'll get a Shipment ID, risk score, and ETA.",
  weather: "Weather disruptions are monitored in real-time. Our system tracks storms, fog, and extreme conditions that could impact your routes. Check the Alert Ticker for live updates.",
  congestion: "Port congestion data is updated continuously. The Admin Monitoring page shows congestion zones globally, and Risk Analysis breaks down congestion impact on your shipments.",
  price: "FreightIQ offers flexible plans for businesses of all sizes. Sign up for a free account to explore our platform's full capabilities.",
  help: "I can help with:\n• Shipment tracking & booking\n• Risk prediction & analysis\n• Route optimization\n• Weather & congestion alerts\n• What-if simulations\n\nWhat would you like to know?",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) return response;
  }
  return "Thanks for your question! I can help with shipment tracking, risk prediction, booking, weather alerts, and congestion monitoring. Try asking about any of these topics, or type 'help' for a full list.";
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hi! I'm the FreightIQ assistant. How can I help you today?", sender: "bot", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), text, sender: "user", timestamp: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, text: getBotResponse(text), sender: "bot", timestamp: new Date() }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-105"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-primary text-primary-foreground flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">FreightIQ Assistant</p>
              <p className="text-xs opacity-80">Online • Typically replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 h-[340px]">
            <div className="p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted px-4 py-2 rounded-xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about freight, risk, delays..."
              className="text-sm"
            />
            <Button size="icon" onClick={send} disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
