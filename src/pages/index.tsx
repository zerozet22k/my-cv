// Adjust the path based on your folder structure
import "font-awesome/css/font-awesome.min.css";

import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Header } from "@/components/header";
import { Honors } from "@/components/honor";
import { Interests } from "@/components/interests";
import { Skills } from "@/components/skills";
import Summary from "@/components/summary";
import ProjectShowcase from "@/components/projectShowcase";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Engine, Container } from "tsparticles-engine";

export default function Portfolio() {
	const particlesInit = useCallback(async (engine: Engine) => {
		console.log(engine);
		await loadSlim(engine);
	}, []);

	const particlesLoaded = useCallback(async (container?: Container) => {
		console.log(container);
	}, []);
	return (
		<div className="portfolio w-full">
			<div className="absolute top-0 left-0 w-full h-full">
				<Particles
					id="tsparticles"
					init={particlesInit}
					loaded={particlesLoaded}
					options={{
						background: {
							color: {
								value: "#0d47a1",
							},
						},
						fpsLimit: 60,
						interactivity: {
							events: {
								onClick: {
									enable: true,
									mode: "push",
								},
								onHover: {
									enable: true,
									mode: "bubble",
								},
								resize: true,
							},
							modes: {
								push: {
									quantity: 10,
								},
								bubble: {
									distance: 400,
									size: 15,
									duration: 2,
								},
							},
						},
						particles: {
							color: {
								value: ["#ffffff", "#ddd", "#bbb", "#aaa"],
							},
							links: {
								color: "#aaa",
								distance: 100,
								enable: true,
								opacity: 0.8,
								width: 0.8,
							},
							collisions: {
								enable: false,
							},
							move: {
								direction: "none",
								enable: true,
								outMode: "out",
								speed: 2,
								straight: false,
							},
							number: {
								density: {
									enable: true,
									value_area: 800,
								},
								value: 200,
							},
							opacity: {
								value: 1,
								anim: {
									enable: true,
									speed: 0.8,
									opacity_min: 0.1,
									sync: false,
								},
							},
							shape: {
								type: ["circle", "square", "triangle", "star", "polygon"],
								polygon: {
									nb_sides: 6,
								},
							},
							size: {
								value: 8,
								random: true,
								anim: {
									enable: true,
									speed: 2,
									size_min: 0.8,
									sync: false,
								},
							},
							twinkle: {
								lines: {
									enable: true,
									frequency: 0.05,
									opacity: 1,
									color: "#ff0000",
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
						retina_detect: true,
					}}
				/>
			</div>
			<div className="relative z-10 w-full max-w-full">
				<Header />
				<Summary />
				<Experience />
				<Education />
				<Skills />
				<ProjectShowcase />
				<Honors />
				<Interests />
			</div>
		</div>
	);
}
