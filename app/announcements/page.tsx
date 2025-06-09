"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function Announcements() {
  const [announcement, setAnnouncement] = useState<any[] | null>(null);
  const { user } = useUser();

  const deleteAnnouncement = async (id: number) => {
    if (!user || user.publicMetadata.role !== "admin") {
      await Swal.fire({
        icon: "error",
        title: "Action Denied",
        text: "Deletion of this announcement is not permitted due to policy restrictions. Please contact an administrator if you believe this is a mistake.",
        confirmButtonText: "I understand",
      });
      return; // stop execution
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      confirmButtonColor: "#27E530",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#F03738",
    });

    if (!result.isConfirmed) return;

    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);
    if (error) {
      await Swal.fire({
        icon: "error",
        title: "Announcement deletion failed:",
        text: error.message,
        confirmButtonText: "OK",
      });
      return;
    }

    await getAnnouncements(); // Refresh list
  };

  const getAnnouncements = async () => {
    const { data, error } = await supabase.from("announcements").select("*");
    if (error) {
      console.error("Oh no! Something went wrong:", error);
      await Swal.fire({
        title: "Something went wrong.",
        text: "Error: " + error.message,
        icon: "error",
        confirmButtonText: "Continue",
      });
      return;
    }
    setAnnouncement(data);
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-5xl text-center mb-5">
        Welcome {user?.firstName} to announcements
      </h1>
      <div className="flex justify-center gap-5">
        {announcement && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center w-full max-w-6xl">
            {announcement.map((a) => (
              <Card key={a.id} className="p-5 w-full min-h-85 flex flex-col">
                <div className="flex justify-between items-start">
                  <CardTitle>
                    <strong>{a.title}</strong> by {a.author}
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    style={{ alignSelf: "flex-start" }}
                    onClick={() => deleteAnnouncement(a.id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
                <CardContent>
                  <div>{a.content}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
