"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

export default function CreateAnnouncement() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useUser();

  const createAnnouncement = async () => {
    if (!title || !content) {
      setStatus("error");
      setMessage("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    const { data, error } = await supabase.from("announcements").insert([
      {
        author: user?.fullName,
        title,
        content,
      },
    ]);

    if (error) {
      setStatus("error");
      setMessage("Error inserting announcement. Please try again.");
      console.error("Error inserting data:", error);
    } else {
      setStatus("success");
      setMessage("Announcement created successfully!");
      setTitle("");
      setContent("");
      console.log("Inserted announcement:", data);
    }
  };

  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center">Create Announcement</h2>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={status === "loading"}
        className="w-full"
      />
      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        disabled={status === "loading"}
        className="w-full min-h-[150px]"
      />
      <Button
        onClick={createAnnouncement}
        disabled={status === "loading" || !title || !content}
        className="w-full"
      >
        {status === "loading" ? "Creating..." : "Create Announcement"}
      </Button>
      {message && (
        <p
          className={
            status === "success"
              ? "text-green-600"
              : status === "error"
              ? "text-red-600"
              : ""
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}
