import React, { useState, useRef } from "react";
import Particles from "react-tsparticles";
import type { Engine, Container } from "tsparticles-engine";
import { Skill } from "./SkillsShowcase";

type ParticlesBackgroundProps = {
  skills: Skill[];
  color: string;
  init: (engine: Engine) => Promise<void>;
  loaded: (container?: Container) => Promise<void>;
};

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  skills,
  color,
  init,
  loaded,
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<{
    x: number;
    y: number;
    name: string;
    proficiency: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleParticlesLoaded = async (container?: Container) => {
    if (loaded) await loaded(container);
    if (!container) return;

    const canvas = container.canvas.element;
    if (!canvas) return;

    canvas.addEventListener("mousemove", (e) => {
      const mousePos = container.interactivity.mouse.position || {
        x: e.offsetX,
        y: e.offsetY,
      };

      const radius = 40;
      const nearbyParticles = container.particles.quadTree.queryCircle(
        mousePos,
        radius
      );

      if (nearbyParticles.length > 0) {
        const p = nearbyParticles[0];
        const shapeData = (p as any).shapeData;

        if (!shapeData || !shapeData.src) {
          setHoveredSkill(null);
          return;
        }

        const skillInfo = skills.find(
          (icon: Skill) => icon.src === shapeData.src
        );
        if (skillInfo) {
          setHoveredSkill({
            x: e.offsetX,
            y: e.offsetY,
            name: skillInfo.name,
            proficiency: skillInfo.proficiency,
          });
        } else {
          setHoveredSkill(null);
        }
      } else {
        setHoveredSkill(null);
      }
    });
  };

  // EXACTLY one manual particle per skill
  const manualParticles = skills.map((skill) => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;

    return {
      position: { x, y },
      options: {
        shape: {
          type: "image",
          image: {
            src: skill.src,
            width: 64,
            height: 64,
          },
        },
        size: {
          value: 32,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.8,
            sync: false,
          },
        },
        move: {
          // Casting strings to "any" to silence TS about literal union mismatch
          direction: "none" as any,
          speed: 2,
          enable: true,
          straight: true,
          outMode: "out" as any,
        },
        collisions: { enable: true },
        opacity: {
          value: 1,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.1,
            sync: false,
          },
        },
      },
    };
  });

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      {hoveredSkill && (
        <div
          className="absolute bg-gray-800 text-white px-2 py-1 rounded text-sm pointer-events-none"
          style={{
            left: hoveredSkill.x + 15,
            top: hoveredSkill.y + 15,
            whiteSpace: "nowrap",
            zIndex: 9999,
          }}
        >
          {hoveredSkill.name} - {hoveredSkill.proficiency}%
        </div>
      )}

      <Particles
        id="tsparticles"
        init={init}
        loaded={handleParticlesLoaded}
        options={{
          background: {
            color: { value: color },
          },
          fpsLimit: 60,
          interactivity: {
            detect_on: "canvas",
            events: {
              onClick: { enable: false, mode: "push" },
              onHover: { enable: true, mode: "bubble" },
              resize: true,
            },
            modes: {
              push: { quantity: 10 },
              bubble: {
                distance: 150,
                size: 25,
                duration: 2,
                opacity: 1,
                speed: 3,
              },
            },
          },
          particles: {
            number: { value: 0 },
            links: {
              color: "#aaa",
              distance: 100,
              enable: true,
              opacity: 0.8,
              width: 0.8,
            },
            collisions: { enable: true },
            move: {
              direction: "none",
              enable: true,
              speed: 2,
              straight: true,
              outMode: "out",
            },
            shape: {
              type: "square",
            },
            size: {
              value: 32,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 2,
                sync: true,
              },
            },
            twinkle: {
              lines: {
                enable: true,
                frequency: 0.001,
                opacity: 1,
                color: "#ffffff",
                width: 0.5,
              },
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 1,
                color: "#fff",
                width: 0.5,
              },
            },
          },
          manualParticles: manualParticles,
          retina_detect: true,
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
