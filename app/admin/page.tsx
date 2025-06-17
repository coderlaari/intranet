// app/admin/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MakeAdmin from "@/components/admin/MakeAdmin";
import CreateAnnouncement from "@/components/admin/CreateAnnouncement";
import DeleteMessages from "@/components/admin/DeleteMessages";
import SupportRequests from "@/components/admin/SupportRequests";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user || user.publicMetadata.role !== "admin") {
    return redirect("/unauthorized");
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center">
        Administrator Panel
      </h1>
      <div className="max-w-md mx-auto mt-20 p-6 border border-gray-200 rounded-2xl shadow-lg bg-white space-y-6">
        <MakeAdmin />
        <CreateAnnouncement />
        <DeleteMessages />
      </div>

      <div className="flex justify-center mt-6">
        <Card className="w-300 mr-5 ml-5">
          <CardContent>
            <SupportRequests />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
