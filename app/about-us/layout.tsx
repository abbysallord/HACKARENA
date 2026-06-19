import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about the HackArena core team and our mission to build cinematic digital platforms.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
