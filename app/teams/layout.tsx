import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams",
  description: "Meet the engineers, architects, and designers of HackArena who build your digital reality.",
  alternates: {
    canonical: "/teams",
  },
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
