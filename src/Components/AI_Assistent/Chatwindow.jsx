import React from "react";
import ChatHeader from "./Chatheader";
import ChatMessages from "./Chatmessages";
import QuickQuestions from "./Quickquestions";
import ChatInput from "./Chatinput";

export default function ChatWindow({
  isOpen,
  messages,
  isTyping,
  onClose,
  onMinimize,
  onClear,
  onSend,
  showQuickQuestions,
}) {
  return (
    <div
      className={`fixed bottom-24 right-6 z-50 w-[92vw] max-w-[380px] h-[600px] max-h-[75vh]
        flex flex-col
        bg-white/60 backdrop-blur-xl
        border border-white/60
        rounded-2xl shadow-[0_20px_60px_rgba(28,51,80,0.35)]
        origin-bottom-right
        transition-all duration-300 ease-out
        ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-90 translate-y-4 pointer-events-none"}`}
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.55) 100%)",
      }}
    >
      <ChatHeader onClose={onClose} onMinimize={onMinimize} onClear={onClear} />
      <ChatMessages messages={messages} isTyping={isTyping} />
      {showQuickQuestions && <QuickQuestions onSelect={onSend} />}
      <ChatInput onSend={onSend} disabled={isTyping} />
    </div>
  );
}