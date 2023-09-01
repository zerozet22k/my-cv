import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import projectsData from "./projects.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProjectProps {
	title: string;
	description: string;
	imageUrls: string[];
	projectUrl: string;
	techStack?: string[];
}

const Project: React.FC<
	ProjectProps & { onSelectImage: (imageUrl: string | null) => void }
> = ({ title, description, imageUrls, projectUrl, onSelectImage }) => {
	return (
		<div className="p-6">
			{/* Images List */}
			<div className="flex space-x-2 overflow-x-auto">
				{imageUrls.map((imageUrl, idx) => (
					<img
						key={idx}
						src={imageUrl}
						alt={`${title}-screenshot-${idx}`}
						onClick={() => onSelectImage(imageUrl)}
						className="w-48 h-48 object-cover rounded-md cursor-pointer hover:border-blue-400 border-2 transition"
					/>
				))}
			</div>
			<h3 className="text-xl mt-4 font-semibold">{title}</h3>
			<p className="text-sm mt-2 text-gray-700">{description}</p>
			<a
				href={projectUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-500 mt-4 inline-block hover:underline"
			>
				View Project
			</a>
		</div>
	);
};
const ProjectShowcase: React.FC = () => {
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
	};

	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	useEffect(() => {
		if (selectedImage) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [selectedImage]);

	return (
		<>
			<section className="py-16 px-4 md:px-16 bg-white">
				<Slider {...sliderSettings}>
					{projectsData.map((project, index) => (
						<Project
							key={index}
							{...project}
							onSelectImage={setSelectedImage}
						/>
					))}
				</Slider>
			</section>
			{/* Overlay */}
			{selectedImage && (
				<div
					className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-75 z-50"
					onClick={() => setSelectedImage(null)}
				>
					<div
						className="relative mx-auto my-auto w-3/5 vw h-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={selectedImage}
							alt="overlay-screenshot"
							className="w-full h-auto object-contain shadow-lg rounded"
						/>
						<span
							className="absolute text-6xl top-2 right-2 text-white cursor-pointer hover:text-red-500 transition duration-200"
							onClick={() => setSelectedImage(null)}
						>
							&times;
						</span>
					</div>
				</div>
			)}
		</>
	);
};

export default ProjectShowcase;
