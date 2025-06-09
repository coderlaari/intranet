"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

export default function AdminForm() {
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const promote = async () => {
    setStatus("loading");
    setMessage(null);
    const response = Swal.fire({
      title: "Are you sure?",
      text: `You are about to promote user with ID of ${userId}`,
      icon: "warning",
      confirmButtonText: "Yes, I'm sure.",
      confirmButtonColor: "#27E530",
      showCancelButton: true,
      cancelButtonColor: "#F03738",
      cancelButtonText: "Cancel",
    });
    if (!(await response).isConfirmed) {
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/clerk/set-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("User promoted successfully!");
      } else if (res.status === 404) {
        // Custom message for 404
        setStatus("error");
        setMessage("Oops! No user found for the given ID.");
      } else {
        const text = await res.text();
        setStatus("error");
        setMessage("Error: " + text || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-center">Make Admin</h2>
      <Input
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full"
      />
      <Button
        onClick={promote}
        disabled={status === "loading" || !userId}
        className="w-full"
      >
        {status === "loading" ? "Promoting..." : "Make Admin"}
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
