import React from "react";

export function Education() {
	return (
		<section className="py-16 px-4 md:px-16 bg-white">
			<div className="max-w-7xl mx-auto space-y-12">
				<h2 className="text-3xl font-bold mb-8">Education</h2>

				<div className="flex items-start space-x-8">
					<div className="flex-shrink-0">
						{/* You can replace this with an actual image/icon representing the university or a cap icon */}
						<div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
							<span className="text-2xl font-bold text-gray-700">GU</span>
						</div>
					</div>
					<div className="space-y-2">
						<h4 className="text-xl font-bold">Greenwich University</h4>
						<p className="text-gray-600">Feb 2018</p>
						<p className="text-gray-700">
							Skills: Responsiveness, Web Pages, RWD, Networking, Game Engines,
							HTML5, SASS, SQL
						</p>
					</div>
				</div>

				{/* More education entries can be added in a similar fashion... */}
			</div>
		</section>
	);
}
