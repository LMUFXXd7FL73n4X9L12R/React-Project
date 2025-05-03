import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import "./index.css";
import App from "./App.jsx";

import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";
import CurrencyProvider from "./contexts/CurrencyContext.jsx";

createRoot(document.getElementById("root")).render(
	<SidebarProvider>
		<CurrencyProvider>
			<CartProvider>
				<ProductProvider>
					<StrictMode>
						<Router>
							<App />
						</Router>
					</StrictMode>
				</ProductProvider>
			</CartProvider>
		</CurrencyProvider>
	</SidebarProvider>
);
