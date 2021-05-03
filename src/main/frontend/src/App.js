import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import User from "./components/User";
import Income from "./components/Income";
import IncomeList from "./components/IncomeList";
import Expense from "./components/Expense";
import ExpenseList from "./components/ExpenseList";
import UserList from "./components/UserList";

export default function App() {
	const marginTop = {
		marginTop: "20px",
	};

	const heading = "Welcome to Cash Flow App";
	const desc =
		"In this application you gonna be able to add, delete, update, and read data from the database.";

	return (
		<Router>
			<NavigationBar />
			<Container>
				<Row>
					<Col lg={12} style={marginTop}>
						<Switch>
							<Route
								path="/"
								exact
								component={() => <Welcome heading={heading} desc={desc} />}
							/>
							<Route path="/addIncome" exact component={Income} />
							<Route path="/editIncome/:id" exact component={Income} />
							<Route path="/listIncome" exact component={IncomeList} />
							<Route path="/addExpense" exact component={Expense} />
							<Route path="/editExpense/:id" exact component={Expense} />
							<Route path="/listExpense" exact component={ExpenseList} />
							<Route path="/users" exact component={UserList} />
						</Switch>
					</Col>
				</Row>
			</Container>
			<Footer />
		</Router>
	);
}
