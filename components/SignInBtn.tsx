"use client";

import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default function SignInBtn() {
  return (
    <div>
      <Button
        onClick={() => {
          redirect("/sign-in");
        }}
        className="bg-gradient-to-br from-blue-400 to-amber-950"
      >
        Sign In
      </Button>
    </div>
  );
}
