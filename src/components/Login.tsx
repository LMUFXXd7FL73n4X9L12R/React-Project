// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login, resetPassword } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(email, password);
			navigate("/");
		} catch (error) {
			setError("Failed to log in: " + error.message);
		}
		setLoading(false);
	}

	async function handlePasswordReset() {
		if (!email) {
			return setError("Please enter your email address");
		}

		try {
			setError("");
			setLoading(true);
			await resetPassword(email);
			setError("Password reset email sent. Check your inbox.");
		} catch (error) {
			setError("Failed to reset password: " + error.message);
		}
		setLoading(false);
	}

	return (
		<div className="login-container">
			<div className="form-container">
				<h2>Log In</h2>
				{error && <div className="alert alert-danger">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="btn-primary" disabled={loading}>
						Log In
					</button>
				</form>
				<div className="forgot-password">
					<button
						className="btn-link"
						onClick={handlePasswordReset}
						disabled={loading}
					>
						Forgot Password?
					</button>
				</div>
				<div className="signup-link">
					Need an account? <Link to="/signup">Sign Up</Link>
				</div>
			</div>
		</div>
	);
}
