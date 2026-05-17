import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-card-bg">
        <Loader2 size={24} className="animate-spin text-forest" />
      </div>
    }>
      <UpdatePasswordForm />
    </Suspense>
  );
}
