import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <div className="w-full max-w-md p-4">
        <SignIn />
      </div>
    </div>
  );
}
