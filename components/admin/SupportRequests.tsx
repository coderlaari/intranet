"use client";

import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Trash2, Verified } from "lucide-react";
import Swal from "sweetalert2";

export default function SupportRequests() {
  const [requests, setRequests] = useState<any[]>([]);

  const getRequests = async () => {
    const { data, error } = await supabase.from("support_requests").select("*");
    if (data) setRequests(data);
    if (error) {
      console.error(error);
    }
  };

  const makeRequestDone = async (id: number) => {
    const { error } = await supabase
      .from("support_requests")
      .update({ is_done: "Yes" })
      .eq("id", id);
    if (error) {
      console.error(error);
    } else {
      Swal.fire({
        title: "Successfully marked request as done",
        icon: "success",
        confirmButtonText: "Great!",
      });
      getRequests();
    }
  };

  const deleteRequest = async (id: number) => {
    const result = Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete a support request",
      icon: "warning",
      confirmButtonText: "Yes, I am sure.",
      showCancelButton: true,
      cancelButtonText: "No, cancel.",
      cancelButtonColor: "#FD0F0F",
      confirmButtonColor: "#2FFD0F",
    });
    if (!(await result).isConfirmed) {
      Swal.fire({
        title: "Operation Cancelled",
        icon: "info",
        confirmButtonText: "Continue",
      });
    } else {
      const { error } = await supabase
        .from("support_requests")
        .delete()
        .eq("id", id);
      if (error) {
        console.error(error);
      } else {
        Swal.fire({
          title: "Successfully deleted request",
          icon: "success",
          confirmButtonText: "Continue",
        });
        getRequests();
      }
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold text-center">Support Requests</h1>
      <ul>
        {requests.map(
          (req) =>
            !req.is_done && (
              <li key={req.id} className="mb-6 list-none">
                <div>Requester: {req.requester}</div>
                <div>Message:</div>
                <div className="text-center font-semibold">{req.msg}</div>
                <br />
                <div className="flex gap-4">
                  <Button
                    className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 hover:from-green-500 hover:via-teal-600 hover:to-blue-600 text-white font-semibold"
                    onClick={() => makeRequestDone(req.id)}
                  >
                    <Verified />
                    Make this request as done
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteRequest(req.id)}
                  >
                    <Trash2 />
                    Delete
                  </Button>
                </div>
                <hr className="mt-6 border-t border-gray-300" />
              </li>
            )
        )}
      </ul>
    </div>
  );
}
