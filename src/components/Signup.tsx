import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signup } = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(email, password);
			navigate("/");
		} catch (error) {
			setError("Failed to create an account: " + error.message);
		}
		setLoading(false);
	}

	return (
		<div className="signup-container">
			<div className="form-container">
				<h2>Sign Up</h2>
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
					<div className="form-group">
						<label>Confirm Password</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="btn-primary" disabled={loading}>
						Sign Up
					</button>
				</form>
				<div className="login-link">
					Already have an account? <Link to="/login">Log In</Link>
				</div>
			</div>
		</div>
	);
}
