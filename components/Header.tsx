"use client";

// Next / React Imports
import React from "react";
import { useRouter } from "next/navigation";
// UI Imports
import { Button } from "./ui/button";
import { HomeIcon, LayoutDashboardIcon, HelpCircle, Bell } from "lucide-react";

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
        <HomeIcon />
        Home
      </Button>
      <Button
        className="bg-amber-700 hover:bg-amber-800"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        <LayoutDashboardIcon />
        Dashboard
      </Button>
      <Button
        className="bg-amber-700 hover:bg-amber-800"
        onClick={() => {
          router.push("/support");
        }}
      >
        <HelpCircle />
        Support
      </Button>
      <Button
        className="bg-amber-700 hover:bg-amber-800"
        onClick={() => {
          router.push("/announcements");
        }}
      >
        <Bell />
        Announcements
      </Button>
    </div>
  );
}
