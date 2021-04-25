import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlusCircle,
	faSave,
	faUndo,
	faList,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "./MyToast";

import axios from "axios";

export default class Income extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.state.show = false;
		this.updateIncome = this.updateIncome.bind(this);
		this.addIncome = this.addIncome.bind(this);
	}

	initialState = {
		id: "",
		date: "",
		description: "",
		value: "",
		category: "",
	};

	componentDidMount() {
		const incomeId = +this.props.match.params.id;
		if (incomeId) {
			this.findIncomeById(incomeId);
		}
	}

	findIncomeById = (incomeId) => {
		fetch("http://localhost:8080/api/incomes/" + incomeId)
			.then((response) => response.json())
			.then((income) => {
				if (income) {
					this.setState({
						id: income.id,
						date: income.date,
						description: income.description,
						value: income.value,
						category: income.category,
					});
				}
			})
			.catch((error) => {
				console.error("Error - " + error);
			});
	};

	// findIncomeById = (incomeId) => {
	// 	axios
	// 		.get("http://localhost:8080/api/income/" + incomeId)
	// 		.then((response) => {
	// 			if (response.data != null) {
	// 				this.setState({
	// 					id: response.data.id,
	// 					date: response.data.date,
	// 					description: response.data.description,
	// 					value: response.data.value,
	// 					category: response.data.category,
	// 				});
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error - " + error);
	// 		});
	// };

	resetIncome = () => {
		this.setState(() => this.initialState);
	};

	addIncome = (event) => {
		event.preventDefault();

		const income = {
			date: this.state.date,
			description: this.state.description,
			value: this.state.value,
			category: this.state.category,
		};

		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		fetch("http://localhost:8080/api/incomes", {
			method: "POST",
			body: JSON.stringify(income),
			headers,
		})
			.then((response) => response.json())

			.then((income) => {
				if (income) {
					this.setState({ show: true, method: "post" });
					setTimeout(() => this.setState({ show: false }), 3000);
				} else {
					this.setState({ show: false });
				}
			});

		this.setState(this.initialState);
	};

	// updateIncome = (event) => {
	// 	//This fuction is not working
	// 	event.preventDefault();

	// 	const income = {
	// 		id: this.state.id,
	// 		date: this.state.date,
	// 		description: this.state.description,
	// 		value: this.state.value,
	// 		category: this.state.category,
	// 	};

	// 	console.log("essa e a variavel antes do fetch" + income);

	// 	const headers = new Headers();
	// 	headers.append("Content-Type", "application/json");

	// 	fetch("https://localhost:8080/api/incomes", income.id, {
	// 		method: "PUT",
	// 		body: JSON.stringify(income),
	// 		headers,
	// 	})
	// 		.then((response) => response.json())
	// 		.then((income) => {
	// 			if (income) {
	// 				this.setState({ show: true, method: "put" });
	// 				setTimeout(() => this.setState({ show: false }), 3000);
	// 				setTimeout(() => this.incomeList(), 3000);
	// 				console.log("essa e a variavel depois do fetch" + income);
	// 			} else {
	// 				this.setState({ show: false });
	// 				console.log("essa e a variavel depois do fetch" + income);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.log("Error: ", error);
	// 		});

	// 	this.setState(this.initialState);
	// 	console.log("essa e a variavel no final da funcao" + income);
	// };

	updateIncome = (event) => {
		event.preventDefault();

		const income = {
			id: this.state.id,
			date: this.state.date,
			description: this.state.description,
			value: this.state.value,
			category: this.state.category,
		};

		console.log(income);

		axios
			.put("http://localhost:8080/api/incomes/" + income.id, {
				id: income.id,
				date: income.date,
				description: income.description,
				value: income.value,
				category: income.category,
			})
			.then((response) => {
				if (response.data != null) {
					this.setState({ show: true, method: "put" });
					setTimeout(() => this.setState({ show: false }), 3000);
					setTimeout(() => this.incomeList(), 3000);
				} else {
					this.setState({ show: false });
				}
			});

		this.setState(this.initialState);
	};

	incomeChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	incomeList = () => {
		return this.props.history.push("/list");
	};

	render() {
		const { date, description, value, category } = this.state;

		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast
						show={this.state.show}
						message={
							this.state.method === "put"
								? "Income Updated Successfully."
								: "Income Saved Successfully."
						}
						type={"success"}
					/>
				</div>

				<Card className={"border border-ligth bg-light"}>
					<Card.Header>
						{" "}
						<FontAwesomeIcon
							icon={this.state.id ? faEdit : faPlusCircle}
						/>{" "}
						{this.state.id ? "Update Income" : "Add New Income"}
					</Card.Header>

					<Form
						onReset={this.resetIncome}
						onSubmit={this.state.id ? this.updateIncome : this.addIncome}
						id="incomeFormId"
					>
						<Card.Body>
							<Form.Row>
								<Form.Group as={Col} controlId="formGridDate">
									<Form.Label>Date</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="date"
										name="date"
										value={date}
										onChange={this.incomeChange}
										className={"bg-ligth"}
										placeholder="Enter date"
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridDescription">
									<Form.Label>Description</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="text"
										name="description"
										value={description}
										onChange={this.incomeChange}
										className={"bg-ligth"}
										placeholder="Enter description"
									/>
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group as={Col} controlId="formGridValue">
									<Form.Label>Value</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="number"
										step="0.01"
										min="0"
										max="9999999"
										name="value"
										value={value}
										onChange={this.incomeChange}
										className={"bg-ligth"}
										placeholder="Enter value"
									/>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridCategory">
									<Form.Label>Category</Form.Label>
									<Form.Control
										required
										autoComplete="off"
										type="text"
										name="category"
										value={category}
										onChange={this.incomeChange}
										className={"bg-ligth"}
										placeholder="Enter category"
									/>
								</Form.Group>
							</Form.Row>
						</Card.Body>
						<Card.Footer style={{ textAlign: "right" }}>
							<Button size="small" variant="success" type="submit">
								<FontAwesomeIcon icon={faSave} />{" "}
								{this.state.id ? "Update" : "Save"}
							</Button>{" "}
							<Button size="small" variant="info" type="reset">
								<FontAwesomeIcon icon={faUndo} /> Reset
							</Button>{" "}
							<Button
								size="small"
								variant="info"
								type="button"
								onClick={this.incomeList.bind()}
							>
								<FontAwesomeIcon icon={faList} /> Income List
							</Button>
						</Card.Footer>
					</Form>
				</Card>
			</div>
		);
	}
}
