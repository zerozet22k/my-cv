import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap"
					rel="stylesheet"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
