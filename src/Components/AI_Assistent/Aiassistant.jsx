import React, { useState, useEffect, useCallback } from "react";
import FloatingButton from "./FloatingButton";
import ChatWindow from "./ChatWindow";
import { getAIResponse, makeMessage } from "./AIUtils";
import { WELCOME_MESSAGE } from "./AIResponses";

const AI_THINK_DELAY = 900;

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // Seed the welcome message the first time the chat is opened.
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([makeMessage({ sender: "ai", text: WELCOME_MESSAGE })]);
    }
    if (isOpen) setHasUnread(false);
  }, [isOpen, messages.length]);

  const handleSend = useCallback((text) => {
    const userMsg = makeMessage({ sender: "user", text });
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate "thinking" — purely local, no network call.
    setTimeout(() => {
      const { text: replyText, hotels } = getAIResponse(text);
      const aiMsg = makeMessage({ sender: "ai", text: replyText, hotels });
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      setHasUnread((prev) => !isOpenRef.current);
    }, AI_THINK_DELAY);
  }, []);

  // Track open state in a ref so the setTimeout closure above reads the
  // latest value without needing to be re-created every render.
  const isOpenRef = React.useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const handleClear = () => {
    setMessages([makeMessage({ sender: "ai", text: WELCOME_MESSAGE })]);
  };

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <>
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        onClose={close}
        onMinimize={close}
        onClear={handleClear}
        onSend={handleSend}
        showQuickQuestions={messages.length <= 1}
      />
      <FloatingButton isOpen={isOpen} onClick={toggleOpen} hasUnread={hasUnread} />
    </>
  );
}