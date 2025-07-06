import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
                <div className="bg-primary p-3 rounded-xl">
                    <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold text-primary">Connect Hub</h1>
            </div>
        </div>
        {children}
      </div>
    </div>
  );
}
