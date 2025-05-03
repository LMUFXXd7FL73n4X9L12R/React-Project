import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearch(value);
	};

	return (
		<div className="max-w-md mx-auto mb-8" data-testid="searchbar">
			<div className="relative flex items-center">
				<input
					type="text"
					placeholder="Search products..."
					role="textbox"
					aria-label="search"
					value={searchTerm}
					onChange={handleSearch}
					className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-gray-800"
				/>
				<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
					<svg
						className="w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
