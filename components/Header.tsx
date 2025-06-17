"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  HomeIcon,
  LayoutDashboardIcon,
  HelpCircle,
  Bell,
  Monitor,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  return (
    <div className="flex gap-2 mr-auto">
      <Button
        className="bg-emerald-400 hover:bg-emerald-500"
        onClick={() => {
          router.push("/");
        }}
      >
        <HomeIcon />
        <p>Home</p>
      </Button>
      <Button
        className="bg-emerald-400 hover:bg-emerald-500"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        <LayoutDashboardIcon />
        <p>Dashboard</p>
      </Button>
      <Button
        className="bg-emerald-400 hover:bg-emerald-500"
        onClick={() => {
          router.push("/support");
        }}
      >
        <HelpCircle />
        <p>Support</p>
      </Button>
      <Button
        className="bg-emerald-400 hover:bg-emerald-500"
        onClick={() => {
          router.push("/announcements");
        }}
      >
        <Bell />
        <p>Announcements</p>
      </Button>
    </div>
  );
}
