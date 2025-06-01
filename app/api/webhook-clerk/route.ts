import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const event = await request.json();

    if (event.type === "user.created") {
      const user = event.data;

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email_addresses?.[0]?.email_address ?? null,
        first_name: user.first_name ?? null,
        last_name: user.last_name ?? null,
      });

      if (error) {
        console.error("Supabase upsert error:", error);
        return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
