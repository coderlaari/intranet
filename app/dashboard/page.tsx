"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth, RedirectToSignIn, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Dashboard() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isSignedIn) return <RedirectToSignIn />;

  return (
    <div>
      <h1 className="text-4xl text-center">Welcome back, {user?.firstName}</h1>

      <div className="flex justify-center items-center mt-8 gap-7">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Account Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Last sign-in at:{" "}
              {user?.lastSignInAt
                ? new Date(user.lastSignInAt).toLocaleString()
                : "N/A"}
            </p>
            <p>Your Name*: {user?.firstName + " " + user?.lastName}</p>
            <p>
              Your Primary Email Address*:{" "}
              <Link
                className="text-blue-500"
                href={`mailto:${
                  user?.primaryEmailAddress?.emailAddress ?? "N/A"
                }`}
              >
                {user?.primaryEmailAddress?.emailAddress ?? "N/A"}
              </Link>
            </p>
          </CardContent>
          <CardFooter>
            <p>* Associated with this account.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
