"use client";

// Make full name instead of user id

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
};

export default function Chat() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Load existing messages
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error loading messages:", error.message);
      } else {
        setMessages(data || []);
      }
    };
    loadMessages();

    // Subscribe to new messages in real-time
    const channel = supabase
      .channel("global-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const message = payload.new as Message;
          setMessages((msgs) => [...msgs, message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!user?.id) {
      console.warn("User not logged in!");
      return;
    }

    const { error } = await supabase.from("messages").insert({
      content: newMessage,
      sender_id: user.id,
    });

    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      setNewMessage("");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl text-center">
        Welcome {user?.firstName} to TeamChat
      </h1>

      <div className="border-2 border-t-red-500 border-r-blue-500 border-b-yellow-500 border-l-emerald-500 w-125 h-200 flex flex-col justify-between items-center mx-auto mt-5 rounded-2xl">
        <h1 className="text-2xl border-2 border-black h-10 w-50 mt-5 text-center rounded">
          TeamChat
        </h1>

        {/* Messages container */}
        <div
          className="overflow-y-auto px-4 py-2 flex-1 w-full max-h-[300px] mt-4 mb-2 space-y-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {messages.map((msg) => (
            <div key={msg.id} className="text-sm">
              <span className="text-gray-500 font-semibold">
                {msg.sender_id}
              </span>
              : {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="flex w-full px-10 mb-5">
          <Textarea
            className="w-full h-24"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            className="ml-2 p-2 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 hover:from-emerald-400 hover:to-blue-500 transition-colors duration-200 shadow-lg active:scale-95"
            aria-label="Send message"
            onClick={sendMessage}
          >
            <Send className="text-white w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
