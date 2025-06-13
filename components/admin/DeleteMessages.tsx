"use client";

import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";

export default function DeleteMessages() {
  const deleteMessages = async () => {
    const result = Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete all TeamChat Messages",
      icon: "warning",
      confirmButtonText: "Yes, I am sure.",
      showCancelButton: true,
      cancelButtonText: "No, cancel.",
      cancelButtonColor: "#FD0F0F",
      confirmButtonColor: "#2FFD0F",
    });
    if (!(await result).isConfirmed) {
      Swal.fire({
        title: "Deleting canceled",
        text: "TeamChat Message Deletion was canceled",
        icon: "info",
        confirmButtonText: "Continue",
      });
    } else {
      const { error } = await supabase
        .from("messages")
        .delete()
        .not("id", "eq", "00000000-0000-0000-0000-000000000000");
      if (error) {
        throw new Error(error.message);
      } else {
        Swal.fire({
          title: "Successfully deleted all TeamChat Messages",
          icon: "success",
          confirmButtonText: "Continue",
        });
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold text-center">
        Delete all TeamChat Messages
      </h1>
      <Button
        variant="destructive"
        onClick={deleteMessages}
        className="mt-4 flex items-center gap-2"
      >
        <Trash2 />
        Delete TeamChat Messages
      </Button>
    </div>
  );
}
