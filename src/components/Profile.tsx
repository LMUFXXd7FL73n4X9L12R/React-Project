import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	async function handleLogout() {
		setError("");

		try {
			await logout();
			navigate("/login");
		} catch {
			setError("Failed to log out");
		}
	}

	return (
		<div className="profile-container">
			<div className="profile-card">
				<h2>Profile</h2>
				{error && <div className="alert alert-danger">{error}</div>}
				<div className="profile-info">
					<strong>Email:</strong> {currentUser.email}
				</div>
				<div className="profile-links">
					<button className="btn-primary" onClick={() => navigate("/")}>
						Back to Shop
					</button>
					<button className="btn-outline" onClick={handleLogout}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}
