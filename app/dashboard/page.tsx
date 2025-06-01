"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth, RedirectToSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isSignedIn) return <RedirectToSignIn />;

  return (
    <div>
      <h1 className="text-4xl text-center">Welcome back, {user?.firstName}</h1>

      <div className="flex justify-center items-center mt-8">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Your profile</CardTitle>
            <CardDescription>
              Do you ever think how your profile looks?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <br />
            <div className="flex items-center space-x-4">
              <img
                className="rounded-full h-15"
                src={user?.imageUrl}
                alt="profile_img"
              />
              <h1 className="text-3xl">
                {user?.firstName} {user?.lastName}
              </h1>
            </div>
          </CardContent>
          <CardFooter>
            <h1>
              Do you need help? <br />
              <Button
                className="bg-gray-600 hover:bg-gray-700"
                onClick={() => {
                  router.push("/support");
                }}
              >
                Contact support
              </Button>
            </h1>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
