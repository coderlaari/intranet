"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export default function Support() {
  const { user } = useUser();
  const [message, setMessage] = useState<string>("");
  const sendSupport = async (message: string, requester: string) => {
    const { error } = await supabase.from("support_requests").insert([
      {
        requester,
        msg: message,
      },
    ]);
    if (error) {
      console.error("Error inserting support request:", error);
      Swal.fire({
        title: "Error sending support request",
        icon: "error",
        confirmButtonText: "Try again",
      });
    } else {
      console.log("Support request sent successfully");
      Swal.fire({
        title: "Support Request sent successfully",
        icon: "success",
        confirmButtonText: "Continue",
      });
      setMessage("");
    }
  };
  return (
    <div>
      <h1 className="text-4xl text-center">Support</h1>
      <h1 className="text-2xl text-center mt-5">
        Send email to {process.env.NEXT_PUBLIC_COMPANY_NAME_INTRANET} support
      </h1>
      <br />
      <div className="mt-4 flex justify-center">
        <label htmlFor="message" className="sr-only">
          Your message
        </label>
        <Textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full max-w-md h-100"
          placeholder="Your message"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          className="bg-green-700 hover:bg-green-800 h-12 w-30"
          onClick={() => {
            sendSupport(message, user?.fullName ?? "Unknown User");
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
