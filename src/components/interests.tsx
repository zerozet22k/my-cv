import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrophy,
	faGamepad,
	faBook,
	faCode,
} from "@fortawesome/free-solid-svg-icons";

export function Interests() {
	return (
		<section className="py-16 px-4 md:px-16 bg-white z-10">
			<div className="max-w-5xl mx-auto space-y-8">
				<h2 className="text-3xl font-bold mb-8 text-center">
					Personal Interests
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="flex flex-col items-center space-y-4">
						<FontAwesomeIcon
							icon={faGamepad}
							className="text-6xl text-gray-500 mb-4"
						/>
						<h3 className="text-xl font-semibold">Gaming</h3>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<FontAwesomeIcon
							icon={faBook}
							className="text-6xl text-gray-500 mb-4"
						/>
						<h3 className="text-xl font-semibold">Reading</h3>
					</div>
					<div className="flex flex-col items-center space-y-4">
						<FontAwesomeIcon
							icon={faCode}
							className="text-6xl text-gray-500 mb-4"
						/>
						<h3 className="text-xl font-semibold">Coding</h3>
					</div>
				</div>
			</div>
		</section>
	);
}
