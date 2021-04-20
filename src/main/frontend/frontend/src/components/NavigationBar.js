import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavigationBar() {
	return (
		<Navbar bg="dark" variant="dark">
			<Link to={""} className="navbar-brand">
				Home
			</Link>
			<Nav className="mr-auto">
				<Link to={"add"} className="nav-link">
					Add Income
				</Link>
				<Link to={"list"} className="nav-link">
					Incomes List
				</Link>
				<Link to={"users"} className="nav-link">
					Users List
				</Link>
			</Nav>
		</Navbar>
	);
}
