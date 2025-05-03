import { createContext, useState, useEffect } from "react";

export const CURRENCY_SYMBOLS = {
	USD: "$",
	EUR: "€",
	GBP: "£",
};

export const EXCHANGE_RATES = {
	USD: 1,
	EUR: 0.87891,
	GBP: 0.74841,
};

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
	const [currency, setCurrency] = useState("USD");
	const [currencySymbol, setCurrencySymbol] = useState(
		CURRENCY_SYMBOLS[currency]
	);

	useEffect(() => {
		const savedCurrency = localStorage.getItem("currency");
		if (savedCurrency) {
			setCurrency(savedCurrency);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("currency", currency);
		setCurrencySymbol(CURRENCY_SYMBOLS[currency]);
	}, [currency]);

	return (
		<CurrencyContext.Provider value={{ currency, setCurrency, currencySymbol }}>
			{children}
		</CurrencyContext.Provider>
	);
};

export default CurrencyProvider;
