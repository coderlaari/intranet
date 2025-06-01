"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div className="flex gap-2 mr-auto">
      <Button
        className="bg-amber-700 hover:bg-amber-800"
        onClick={() => {
          router.push("/");
        }}
      >
        Home
      </Button>
      <Button
        className="bg-amber-700 hover:bg-amber-800"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        Dashboard
      </Button>
      <Button
        className="bg-amber-700 hover:bg-amber-800"
        onClick={() => {
          router.push("/support");
        }}
      >
        Support
      </Button>
      <Button
        className="bg-amber-700 hover:bg-amber-800"
        onClick={() => {
          router.push("/announcements");
        }}
      >
        Announcements
      </Button>
    </div>
  );
}
