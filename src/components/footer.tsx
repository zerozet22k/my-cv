import {
	faFacebook,
	faInstagram,
	faLinkedin,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function Footer() {
	return (
		<footer className="bg-gray-900 py-6">
			<div className="container mx-auto px-4 text-center">
				<div className="mb-4 text-white">
					<h3 className="text-xl font-bold mb-2">Stay Connected</h3>
					<p>Follow me on my social media platforms.</p>
				</div>

				<div className="flex justify-center items-center space-x-4 mb-4">
					{/* You can expand these with your actual social media links */}
					<a
						href="#"
						className="text-white hover:text-gray-400"
						aria-label="Twitter"
					>
						<FontAwesomeIcon
							icon={faTwitter}
							size="lg"
						/>
					</a>
					<a
						href="#"
						className="text-white hover:text-gray-400"
						aria-label="Instagram"
					>
						<FontAwesomeIcon
							icon={faInstagram}
							size="lg"
						/>
					</a>
					<a
						href="#"
						className="text-white hover:text-gray-400"
						aria-label="Facebook"
					>
						<FontAwesomeIcon
							icon={faFacebook}
							size="lg"
						/>
					</a>
					<a
						href="#"
						className="text-white hover:text-gray-400"
						aria-label="LinkedIn"
					>
						<FontAwesomeIcon
							icon={faLinkedin}
							size="lg"
						/>
					</a>
				</div>

				<div className="text-white">
					<p>
						&copy; {new Date().getFullYear()} Thi Ha Zaw[Zet]. All rights
						reserved.
					</p>
					<p className="mt-2">
						Made with <span className="text-red-500">❤</span> Thi Ha
					</p>
				</div>
			</div>
		</footer>
	);
}
