import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function POST(req: Request) {
  const { userId: adminId } = await auth();

  if (!adminId) return new Response("Unauthorized", { status: 401 });

  const admin = await clerkClient.users.getUser(adminId);

  if (admin.publicMetadata.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  const { userId } = await req.json();

  if (!userId) return new Response("Missing userId", { status: 400 });

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: "admin" },
    });

    return new Response("OK", { status: 200 });
  } catch (err: any) {
    if (err.status === 404) {
      return new Response("No user found with the provided ID.", { status: 404 });
    }
    console.error("Unexpected error updating user:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
