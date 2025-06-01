"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import devLog from "@/lib/utils";

export default function Support() {
  const { user } = useUser();
  const [message, setMessage] = useState<string>("");
  const sendSupport = async (message: string, userfullname: string) => {
    console.log("sendSupport function called");
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
          onChange={(e) => setMessage(e.target.value)}
          className="w-full max-w-md h-100"
          placeholder="Your message"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          className="bg-green-700 hover:bg-green-800 h-12 w-30"
          onClick={() => {
            sendSupport(
              message,
              (user?.firstName ?? "") + " " + (user?.lastName ?? "")
            );
            devLog("Support function called");
            console.log("name:", user?.firstName + " " + user?.lastName);
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
