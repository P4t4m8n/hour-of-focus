import { GINGER_KID_IMAGE } from "@/constants/images";
import React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
  testimonies: React.ReactNode;
  articles: React.ReactNode;
  video: React.ReactNode;
}

export default function HomeLayout({
  children,
  testimonies,
  articles,
  video,
}: Readonly<HomeLayoutProps>) {
  return (
    <section className="justify-items-center grid md:gap-gaps-md gap-gaps md:pb-gaps-md pb-gaps home-layout">
      {children}
      {video}
      {testimonies}
      {articles}
      <link rel="preload" href={GINGER_KID_IMAGE} as="image" />

    </section>
  );
}
