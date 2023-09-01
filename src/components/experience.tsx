import React from "react";

export function Experience() {
	return (
		<section className="py-16 px-4 md:px-16">
			<div className="max-w-7xl mx-auto space-y-12">
				<h2 className="text-3xl font-bold mb-8 text-white">Experience</h2>

				{/* Experience - Startup Dev Myanmar */}
				<div className="bg-white p-6 rounded-md shadow space-y-4">
					<h3 className="text-xl font-semibold">
						Software Development Engineer &amp; Team Lead
					</h3>
					<p className="text-sm text-gray-700 italic">
						Startup Dev Myanmar, Jan 2021 - Present &middot; Yangon, Myanmar
					</p>
					<ul className="list-disc list-inside text-gray-700 space-y-2">
						<li>
							Stepped up as a key leadership figure in a startup with close
							associates, guiding project directions and making crucial
							decisions.
						</li>
						<li>
							Developed and maintained various web applications using a range of
							technologies.
						</li>
						<li>
							Collaborated with the team to enhance user interfaces and user
							experience.
						</li>
					</ul>
					<p className="font-semibold">Skills Used:</p>
					<p>
						REST APIs, User Interface Design, JSOM, DOM, Responsiveness, and
						more...
					</p>
					<div className="mt-4 border-t border-gray-300 pt-4">
						<h4 className="text-lg font-semibold">Endorsements:</h4>
						<div className="mt-2">
							<p className="font-medium my-2 underline">
								U Yang Paing, CEO, PMXpress, Thailand
							</p>
							<p className="text-gray-700">
								&quot;Thi Ha&apos;s dedication to our project was evident in
								every aspect of the work. Their technical prowess combined with
								an eye for design significantly improved our platform.&quot;
							</p>
						</div>
						<div className="mt-2">
							<p className="font-medium my-2 underline">
								U Linn Zaw Htike, Head Master, NEC, Myanmar
							</p>
							<p className="text-gray-700">
								&quot;Working with Thi Ha was transformative for our online
								presence. Their understanding of our needs combined with their
								technical skills led to an outstanding website.&quot;
							</p>
						</div>
						<div className="mt-2">
							<p className="font-medium my-2 underline">
								Daw Aye Myat, Program Coordinator, Honest Online Learning
								Program, Myanmar
							</p>
							<p className="text-gray-700">
								&quot;Thi Ha&apos;s contribution to the HOLP platform was
								invaluable. Their strategic approach to development and their
								passion for online education ensured our platform was both
								user-friendly and robust. We couldn&apos;t have achieved our
								milestones without their expertise.&quot;
							</p>
						</div>
					</div>
				</div>

				{/* Experience - Self-employed */}
				<div className="bg-white p-6 rounded-md shadow space-y-4 mt-8">
					<h3 className="text-xl font-semibold">Game Developer</h3>
					<p className="text-sm text-gray-700 italic">
						Self-employed, Jan 2010 - Present
					</p>
					<ul className="list-disc list-inside text-gray-700 space-y-2">
						<li>
							Developed and published various games, catering to diverse
							audiences.
						</li>
						<li>
							Implemented user-friendly interfaces, ensuring an engaging user
							experience.
						</li>
					</ul>
					<p className="font-semibold">Skills Used:</p>
					<p>UI Design, API, Networking, Game Programming, and more...</p>
				</div>
			</div>
		</section>
	);
}
