import React from "react";

import { Link } from "react-router";

const Hero = () => {
	return (
		<section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
			<div className="container mx-auto flex justify-around h-full">
				{/* text */}
				<div className="flex flex-col justify-center">
					<div className="font-semibold flex items-center uppercase">
						<div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>Urban Loom
					</div>
					<h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">
						Style That Speaks.
						<br />
						<span className="font-light">New collections now available</span>
					</h1>
					<a
						href="#explore-section"
						className="self-start uppercase font-semibold border-b-2 border-primary"
					>
						Discover More
					</a>
				</div>
			</div>
		</section>
	);
};

export default Hero;
