// pages/portfolio.tsx (Next.js pages router)
import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { Engine, Container } from "tsparticles-engine";
import { loadFull } from "tsparticles";

import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Header } from "@/components/Header";
import HonorsAndInterests from "@/components/HonorsAndInterests";
import { SkillsShowcase } from "@/components/SkillsShowcase";
import AboutMe from "@/components/AboutMe";
import SimplifiedProjects from "@/components/SimplifiedProjects";
import { Footer } from "@/components/Footer";
import data from "@/data.json";

// @ts-expect-error - next/dynamic with @ alias resolution differs at compile time
const ParticlesBackground = dynamic(() => import("@/components/ParticlesBackground"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-white" />,
}) as React.ComponentType<any>;

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative z-10 w-full max-w-full text-black">{children}</div>;
};

export default function Portfolio() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log("Particles loaded ->", container);
  }, []);

  return (
    <div className="relative w-full">
      <ParticlesBackground
        skills={data.skills}
        color={data.color ?? "#1e1e1e"}
        init={particlesInit}
        loaded={particlesLoaded}
      />

      <ContentWrapper>
        <Header profile={data.profile} social={data.social} color={data.color} />
        <AboutMe color={data.color} profile={data.profile} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <SkillsShowcase groups={data.skillGroups} />
        <SimplifiedProjects projects={data.projects} color={data.color} />
        <HonorsAndInterests interests={data.interests} honors={data.honors} />
        <Footer social={data.social} />
      </ContentWrapper>
    </div>
  );
}
