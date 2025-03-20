// pages/portfolio.tsx (Next.js pages router)
import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { Engine, Container } from "tsparticles-engine";
import { loadFull } from "tsparticles"; // loads all tsparticles plugins

// Other imports for your components
import "font-awesome/css/font-awesome.min.css";

import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Header } from "@/components/Header";
import HonorsAndInterests, { Honors } from "@/components/HonorsAndInterests";

import { SkillsShowcase } from "@/components/SkillsShowcase";
import AboutMe from "@/components/AboutMe";
import ProjectShowcase from "@/components/ProjectShowcase";
import { Footer } from "@/components/Footer";
import data from "@/data.json";

// IMPORTANT: dynamically import ParticlesBackground
const ParticlesBackground = dynamic(
  () => import("@/components/ParticlesBackground"),
  { ssr: false }
);

// A wrapper to ensure content is above the particle background
const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 w-full max-w-full text-black">{children}</div>
  );
};

export default function Portfolio() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // load all tsparticles shapes / presets
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log("Particles loaded ->", container);
  }, []);

  return (
    <div className="relative w-full">
      {/* The interactive background with floating icons */}
      <ParticlesBackground
        skills={data.skills}
        color={data.color ?? "#1e1e1e"}
        init={particlesInit}
        loaded={particlesLoaded}
      />

      {/* Foreground content */}
      <ContentWrapper>
        <Header
          profile={data.profile}
          social={data.social}
          color={data.color}
        />
        <AboutMe color={data.color} profile={data.profile} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <SkillsShowcase skills={data.skills} color={data.color} />
        <ProjectShowcase projects={data.projects} color={data.color} />
        <HonorsAndInterests interests={data.interests} honors={data.honors} />
        <Footer social={data.social} />
      </ContentWrapper>
    </div>
  );
}
