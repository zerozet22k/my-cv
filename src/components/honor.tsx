import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faGamepad, faBook, faCode } from '@fortawesome/free-solid-svg-icons';
export function Honors() {
	return (
		<section className="py-16 px-8 md:px-32 z-10">
			<div className="max-w-5xl mx-auto space-y-8 text-white">
				<h2 className="text-3xl font-bold mb-8">Honors & Awards</h2>
				<div className="flex items-center space-x-4">
					<div className="bg-blue-500 p-4 rounded-full">
						<FontAwesomeIcon
							icon={faTrophy}
							className="text-4xl text-white"
						/>
					</div>
					<div>
						<h3 className="text-xl font-semibold">
							Invitation to Google Foobar Challenge
						</h3>
						<p className="text-white">
							Recognized and invited by Google for a coding challenge.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
