import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center p-50">
      <SignUp />
    </div>
  );
}
