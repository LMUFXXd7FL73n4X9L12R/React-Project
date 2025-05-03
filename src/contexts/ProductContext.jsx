import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
	// products state
	const [products, setProducts] = useState([]);
	// fetch products
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("https://fakestoreapi.com/product");
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, []);

	return (
		<ProductContext.Provider value={{ products }}>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductProvider;
