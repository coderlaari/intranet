"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";

type Message = {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  sender_avatar: string;
  created_at: string;
};

export default function Chat() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
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
      console.warn("User is not logged in.");
      return;
    }

    const { id, fullName, imageUrl } = user;

    const { error } = await supabase.from("messages").insert({
      content: newMessage,
      sender_id: id,
      sender_name: fullName,
      sender_avatar: imageUrl,
    });

    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      setNewMessage("");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl text-center mb-4">
        Welcome {user?.firstName} to TeamChat
      </h1>

      <div className="border-2 border-t-red-500 border-r-blue-500 border-b-yellow-500 border-l-emerald-500 w-full max-w-2xl h-[500px] flex flex-col justify-between mx-auto mt-5 rounded-2xl p-4">
        <h1 className="text-2xl border-2 border-black h-10 w-50 text-center rounded mb-2">
          TeamChat
        </h1>

        {/* Messages */}
        <div className="overflow-y-auto flex-1 space-y-4 pr-2">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3 text-sm">
              <img
                src={msg.sender_avatar || "/globe.svg"}
                alt={msg.sender_name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="font-semibold text-gray-700">
                  {msg.sender_name}
                  <span className="ml-2 text-xs text-gray-400">
                    {dayjs(msg.created_at).format("HH:mm")}
                  </span>
                </div>
                <div>{msg.content}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex w-full gap-2 mt-4">
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
            className="p-2 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 hover:from-emerald-400 hover:to-blue-500 transition-colors duration-200 shadow-lg active:scale-95"
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
