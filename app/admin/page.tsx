// app/admin/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MakeAdmin from "@/components/MakeAdmin";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user || user.publicMetadata.role !== "admin") {
    return redirect("/"); // or /sign-in
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-2xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <MakeAdmin />
    </div>
  );
}
