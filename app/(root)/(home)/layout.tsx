import React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
  testimonies: React.ReactNode;
  articles: React.ReactNode;
  video:React.ReactNode;
}

export default function HomeLayout({
  children,
  testimonies,
  articles,
  video
}: Readonly<HomeLayoutProps>) {
  return (
    <section className="max-w-full justify-items-center grid gap-20 mobile:gap-10 home-layout pb-36 mobile:pb-20">
      {children}
      {video}
      {testimonies}
      {articles}
    </section>
  );
}
