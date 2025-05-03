import React from "react";

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
	return (
		<div className="flex flex-wrap justify-center gap-3 mb-8">
			<button
				role="button"
				aria-label="Filter by all products"
				className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
					activeCategory === "all"
						? "bg-cyan-600 text-white"
						: "bg-gray-200 text-gray-800 hover:bg-gray-300"
				}`}
				onClick={() => onSelectCategory("all")}
			>
				All Products
			</button>

			{categories.map((category) => (
				<button
					key={category}
					role="button"
					aria-label={`Filter by ${category}`}
					className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
						activeCategory === category
							? "bg-cyan-600 text-white"
							: "bg-gray-200 text-gray-800 hover:bg-gray-300"
					}`}
					onClick={() => onSelectCategory(category)}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</button>
			))}
		</div>
	);
};

export default CategoryFilter;
