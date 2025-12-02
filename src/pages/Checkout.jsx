// src/pages/Checkout.jsx
import React, { useContext, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { CartContext }    from '../contexts/CartContext.jsx';
import { CurrencyContext } from '../contexts/CurrencyContext.jsx';

const Checkout = () => {
  const { cart, total, clearCart }  = useContext(CartContext);
  const { currencySymbol, convertPrice }          = useContext(CurrencyContext);

  /** ---------------- Form state ---------------- */
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName:   '',
    email:      '',
    address:    '',
    city:       '',
    postalCode: '',
    country:    '',
    cardNumber: '',
    cardName:   '',
    expDate:    '',
    cvv:        '',
  });

  /** Generic change handler so every <input> only needs onChange={handleChange} */
  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  /** --------------- Check-out ------------------ */
  const handleCheckout = useCallback(
    e => {
      e.preventDefault();
      if (loading) return;

      setLoading(true);
      // fake payment network latency
      setTimeout(() => {
        alert('Payment successful! Your order has been placed.');
        clearCart();
        setLoading(false);
      }, 1500);
    },
    [loading, clearCart],
  );

  /** -------------- Totals (memoised) ----------- */
  const { shipping, tax, grandTotal } = useMemo(() => {
    const convertedTotal = convertPrice ? parseFloat(convertPrice(total)) : total;
    const shipping = cart.length ? 10 : 0;          // flat-rate demo shipping
    const tax      = convertedTotal * 0.08;         // 8 % VAT
    return {
      shipping,
      tax,
      grandTotal: convertedTotal + shipping + tax,
    };
  }, [cart.length, total, convertPrice]);

  /** -------------- Render ---------------------- */
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
          /* ---------------- Empty cart -------------- */
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="mt-4 text-lg">Your cart is empty</p>
            <p className="mt-2 text-sm text-gray-500">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>

            <Link
              to="/"
              className="inline-block mt-4 px-6 py-3 bg-cyan-500 text-white font-medium rounded-md hover:bg-cyan-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* --------------- Cart & Form -------------- */
          <div className="flex flex-col lg:flex-row gap-8">
            {/* -------- Order summary -------- */}
            <div className="lg:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="max-h-80 overflow-y-auto mb-4 divide-y divide-gray-100">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center py-4">
                      <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100">
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
                      <p className="text-sm text-gray-500">
                        {currencySymbol}
                        {convertPrice ? 
                          (convertPrice(item.price) * item.amount).toFixed(2) : 
                          (item.price * item.amount).toFixed(2)
                        }
                      </p>
                    </div>
                  ))}
                </div>

                <dl className="space-y-2 pt-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium">
                      {currencySymbol}
                      {convertPrice ? convertPrice(total) : total.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium">
                      {currencySymbol}
                      {shipping.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tax&nbsp;(8%)</dt>
                    <dd className="font-medium">
                      {currencySymbol}
                      {tax.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 text-base">
                    <dt className="font-semibold">Total</dt>
                    <dd className="font-bold">
                      {currencySymbol}
                      {grandTotal.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* -------- Payment form -------- */}
            <div className="lg:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
                  Payment Details
                </h2>

                <form onSubmit={handleCheckout}>
                  {/* ---- Contact info ---- */}
                  <fieldset className="mb-6">
                    <legend className="text-lg font-medium mb-4">
                      Contact Information
                    </legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Email Address"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </fieldset>

                  {/* ---- Shipping ---- */}
                  <fieldset className="mb-6">
                    <legend className="text-lg font-medium mb-4">
                      Shipping Address
                    </legend>

                    <div className="space-y-4">
                      <Input
                        label="Street Address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          id="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          label="Postal Code"
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          label="Country"
                          id="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* ---- Payment ---- */}
                  <fieldset className="mb-6">
                    <legend className="text-lg font-medium mb-4">
                      Payment Method
                    </legend>

                    <div className="space-y-4">
                      <Input
                        label="Card Number"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label="Name on Card"
                        id="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Expiration Date"
                          id="expDate"
                          placeholder="MM/YY"
                          value={formData.expDate}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          label="CVV"
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* ---- Submit ---- */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-offset-2 disabled:opacity-60"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing…
                      </span>
                    ) : (
                      `Place Order • ${currencySymbol}${grandTotal.toFixed(2)}`
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ---------- Small reusable <Input /> helper ---------- */
function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
    </div>
  );
}

export default Checkout;
