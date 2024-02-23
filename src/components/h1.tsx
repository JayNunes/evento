import { cn } from "@/lib/utils";

type titleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ children, className }: titleProps) {
  return (
    <h1
      className={cn("text-3xl lg:text-6xl font-bold tracking-tight", className)}
    >
      {children}
    </h1>
  );
}
