import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our portfolio of brutalist digital architecture and immersive WebGL experiences.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
