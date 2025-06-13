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
      >
        Sign In
      </Button>
    </div>
  );
}
