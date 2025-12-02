import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<AuthProvider>
			<div className="overflow-hidden">
				<Header />
				<Routes>
					{/* Public routes */}
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/product/:id" element={<ProductDetails />} />
					<Route path="/checkout" element={<Checkout />} />

					{/* Protected routes */}
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
				</Routes>
				<Sidebar />
				<Footer />
			</div>
		</AuthProvider>
	);
}

export default App;
