import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const event = await request.json();
    console.log("📦 Clerk Webhook Event:", JSON.stringify(event, null, 2));

    if (event.type === "user.created") {
      const user = event.data;

      const userId = user.id;
      const email = user.email_addresses?.[0]?.email_address ?? null;
      const firstName = user.first_name ?? null;
      const lastName = user.last_name ?? null;

      if (!userId || !email) {
        console.error("❌ Missing required user data");
        return NextResponse.json({ error: "Missing user ID or email" }, { status: 400 });
      }

      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        email: email,
        first_name: firstName,
        last_name: lastName,
      });

      if (error) {
        console.error("❌ Supabase upsert error:", error);
        return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
      }

      console.log("✅ User inserted into Supabase:", userId);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook handler error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
