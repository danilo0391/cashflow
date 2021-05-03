import React, { Component } from "react";
import { ButtonGroup, Card, Table, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import MyToast from "./MyToast";
import axios from "axios";

export default class ExpenseList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expenses: [],
		};
	}

	componentDidMount() {
    this.findAllExpenses();
	}

	findAllExpenses() {
		fetch("http://localhost:8080/api/expenses")
		.then(response => response.json())
		.then((data) => {
			this.setState({expenses: data});
		})
	};

	// deleteIncome = (incomeId) => {
	// 	fetch("http://localhost:8080/api/income" + incomeId, {
	// 		method: "DELETE"
	// 	})
	// 	.then(response => response.json())
	// 	.then((income) => {
	// 		if(income){
	// 			this.setState({ show: true });
	// 			setTimeout(() => this.setState({ show: false }), 3000);
	// 			this.setState({
	// 				income: this.state.income.filter(income => income.id !== incomeId)
	// 			});
	// 		} else {
	// 			this.setState({ show: false });
	// 		}
	// 	})
	// };

	deleteExpense = (expenseId) => {
		axios.delete("http://localhost:8080/api/expenses/" + expenseId)
		.then(response => {
			if(response.data != null){
				this.setState({ show: true });
				setTimeout(() => this.setState({ show: false }), 3000);
				this.setState({
					expenses: this.state.expenses.filter(expense => expense.id !== expenseId)
				});
			} else {
				this.setState({ show: false });
			}
		})
	};

	render() {
		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast show = {this.state.show} message = {"Expense Deleted Successfully."} type = {"danger"}/>
				</div>

				<Card className={"border border-ligth bg-light"}>
				<Card.Header><FontAwesomeIcon icon={faList}/> Expenses List</Card.Header>
				<Card.Body>
				<div>
					<Table bordered hover striped variant="ligth">
						<tbody>
							<tr>
								<th>ID</th>
								<th>Description</th>
								<th>Value</th>
								<th>Category</th>
								<th>Date</th>
								<th>Actions</th>
							</tr>
						</tbody>
						<tbody>
							{
							this.state.expenses.length === 0 ?
							<tr aling="center">
								<td colSpan="6"> No Expenses Available</td>
							</tr> :
							this.state.expenses.map((expense) => (
								<tr key={expense.id}>
									<td> {expense.id}</td>
									<td> {expense.description} </td>
									<td> €{expense.value} </td>
									<td> {expense.category} </td>
									<td> {expense.date} </td>
									<td>
										<ButtonGroup>
											<Link to={"editExpense/" + expense.id} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit}/></Link>{' '}
											<Button size="sm" variant="outline-primary" onClick={this.deleteExpense.bind(this, expense.id)}><FontAwesomeIcon icon={faTrash}/></Button>
										</ButtonGroup>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
				</Card.Body>
			</Card>

			</div>
			
			// <div>
			// 	User List
				
			// </div>
		);
	}
}