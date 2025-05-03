import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext.jsx";
import { CurrencyContext } from "../contexts/CurrencyContext.jsx";
import { Link } from "react-router";

const Checkout = () => {
	const { cart, total, clearCart } = useContext(CartContext);
	const { currencySymbol } = useContext(CurrencyContext);

	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		address: "",
		city: "",
		postalCode: "",
		country: "",
		cardNumber: "",
		cardName: "",
		expDate: "",
		cvv: "",
	});

	const handleCheckout = (e) => {
		e.preventDefault();
		setLoading(true);

		// Simulate payment processing
		setTimeout(() => {
			setLoading(false);
			alert("Payment successful! Your order has been placed.");
			clearCart();
		}, 1500);
	};

	// Calculate subtotal, shipping and taxes
	const subtotal = total;
	const shipping = cart.length > 0 ? 10.0 : 0;
	const tax = subtotal * 0.08;
	const grandTotal = subtotal + shipping + tax;

	return (
		<section
			className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 flex items-center"
			data-testid="checkout"
		>
			<div className="container mx-auto px-4">
				<h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
					Checkout
				</h1>

				{cart.length === 0 ? (
					<div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto text-center">
						<div className="text-gray-500 mb-4">
							<svg
								className="w-16 h-16 mx-auto text-gray-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								></path>
							</svg>
							<p className="mt-4 text-lg">Your cart is empty</p>
							<p className="mt-2 text-sm text-gray-500">
								Looks like you haven't added anything to your cart yet.
							</p>
						</div>
						<Link
							to="/"
							className="inline-block mt-4 px-6 py-3 bg-cyan-500 text-white font-medium rounded-md hover:bg-cyan-600 transition-colors"
						>
							Continue Shopping
						</Link>
					</div>
				) : (
					<div className="flex flex-col lg:flex-row gap-8">
						{/* Order Summary */}
						<div className="lg:w-1/2">
							<div className="bg-white p-6 rounded-lg shadow-md mb-6">
								<h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
									Order Summary
								</h2>

								<div className="max-h-80 overflow-y-auto mb-4">
									{cart.map((item) => (
										<div
											key={item.id}
											className="flex items-center py-4 border-b border-gray-100"
										>
											<div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
												{item.image && (
													<img
														src={item.image}
														alt={item.title}
														className="w-full h-full object-cover"
													/>
												)}
											</div>
											<div className="ml-4 flex-grow">
												<h3 className="text-sm font-medium text-gray-900 line-clamp-1">
													{item.title}
												</h3>
												<p className="text-sm text-gray-500">
													Qty: {item.amount}
												</p>
											</div>
											<div className="text-right">
												<p className="text-sm font-medium text-gray-900">
													{currencySymbol}
													{(item.price * item.amount).toFixed(2)}
												</p>
											</div>
										</div>
									))}
								</div>

								<div className="space-y-2 pt-2">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Subtotal</span>
										<span className="font-medium">
											{currencySymbol}
											{subtotal.toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Shipping</span>
										<span className="font-medium">
											{currencySymbol}
											{shipping.toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Tax (8%)</span>
										<span className="font-medium">
											{currencySymbol}
											{tax.toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between text-base pt-2 mt-2 border-t border-gray-200">
										<span className="font-semibold">Total</span>
										<span className="font-bold">
											{currencySymbol}
											{grandTotal.toFixed(2)}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Payment Form */}
						<div className="lg:w-1/2">
							<div className="bg-white p-6 rounded-lg shadow-md">
								<h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
									Payment Details
								</h2>

								<form onSubmit={handleCheckout}>
									<div className="mb-6">
										<h3 className="text-lg font-medium mb-4">
											Contact Information
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label
													htmlFor="fullName"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Full Name
												</label>
												<input
													type="text"
													id="fullName"
													name="fullName"
													value={formData.fullName}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
													required
												/>
											</div>
											<div>
												<label
													htmlFor="email"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Email Address
												</label>
												<input
													type="email"
													id="email"
													name="email"
													value={formData.email}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
													required
												/>
											</div>
										</div>
									</div>

									<div className="mb-6">
										<h3 className="text-lg font-medium mb-4">
											Shipping Address
										</h3>
										<div className="space-y-4">
											<div>
												<label
													htmlFor="address"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Street Address
												</label>
												<input
													type="text"
													id="address"
													name="address"
													value={formData.address}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
													required
												/>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
												<div>
													<label
														htmlFor="city"
														className="block text-sm font-medium text-gray-700 mb-1"
													>
														City
													</label>
													<input
														type="text"
														id="city"
														name="city"
														value={formData.city}
														className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
														required
													/>
												</div>
												<div>
													<label
														htmlFor="postalCode"
														className="block text-sm font-medium text-gray-700 mb-1"
													>
														Postal Code
													</label>
													<input
														type="text"
														id="postalCode"
														name="postalCode"
														value={formData.postalCode}
														className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
														required
													/>
												</div>
												<div>
													<label
														htmlFor="country"
														className="block text-sm font-medium text-gray-700 mb-1"
													>
														Country
													</label>
													<input
														type="text"
														id="country"
														name="country"
														value={formData.country}
														className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
														required
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="mb-6">
										<h3 className="text-lg font-medium mb-4">Payment Method</h3>
										<div className="space-y-4">
											<div>
												<label
													htmlFor="cardNumber"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Card Number
												</label>
												<input
													type="text"
													id="cardNumber"
													name="cardNumber"
													value={formData.cardNumber}
													placeholder="1234 5678 9012 3456"
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
													required
												/>
											</div>

											<div>
												<label
													htmlFor="cardName"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Name on Card
												</label>
												<input
													type="text"
													id="cardName"
													name="cardName"
													value={formData.cardName}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
													required
												/>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<label
														htmlFor="expDate"
														className="block text-sm font-medium text-gray-700 mb-1"
													>
														Expiration Date
													</label>
													<input
														type="text"
														id="expDate"
														name="expDate"
														value={formData.expDate}
														placeholder="MM/YY"
														className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
														required
													/>
												</div>
												<div>
													<label
														htmlFor="cvv"
														className="block text-sm font-medium text-gray-700 mb-1"
													>
														CVV
													</label>
													<input
														type="text"
														id="cvv"
														name="cvv"
														value={formData.cvv}
														placeholder="123"
														className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
														required
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="mt-8">
										<button
											type="submit"
											role="button"
											aria-label="place order"
											className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-offset-2 disabled:opacity-70"
											disabled={loading}
										>
											{loading ? (
												<span className="flex items-center justify-center">
													<svg
														className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														></circle>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														></path>
													</svg>
													Processing...
												</span>
											) : (
												`Place Order • ${currencySymbol}${grandTotal.toFixed(
													2
												)}`
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default Checkout;
