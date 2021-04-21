import React, { Component } from "react";
import { ButtonGroup, Card, Table, Button } from "react-bootstrap";

import IncomeService from "../service/IncomeService";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import MyToast from "./MyToast";
import axios from "axios";

export default class IncomeList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			incomes: [],
		};
	}

	componentDidMount() {
    this.findAllIncomes();
	}

	// componentDidMount() {
  //   IncomeService.getIncome().then((res) => {
  //     this.setState({ income: res.data});
  //   });
	// }

	findAllIncomes() {
		fetch("http://localhost:8080/api/incomes")
		.then(response => response.json())
		.then((data) => {
			this.setState({incomes: data});
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

	deleteIncome = (incomeId) => {
		axios.delete("http://localhost:8080/api/incomes/" + incomeId)
		.then(response => {
			if(response.data != null){
				this.setState({ show: true });
				setTimeout(() => this.setState({ show: false }), 3000);
				this.setState({
					incomes: this.state.incomes.filter(income => income.id !== incomeId)
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
					<MyToast show = {this.state.show} message = {"Income Deleted Successfully."} type = {"danger"}/>
				</div>

				<Card className={"border border-ligth bg-light"}>
				<Card.Header><FontAwesomeIcon icon={faList}/> Income List</Card.Header>
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
							this.state.incomes.length === 0 ?
							<tr aling="center">
								<td colSpan="6"> No Incomes Available</td>
							</tr> :
							this.state.incomes.map((income) => (
								<tr key={income.id}>
									<td> {income.id}</td>
									<td> {income.description} </td>
									<td> €{income.value} </td>
									<td> {income.category} </td>
									<td> {income.date} </td>
									<td>
										<ButtonGroup>
											<Link to={"edit/" + income.id} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit}/></Link>{' '}
											<Button size="sm" variant="outline-primary" onClick={this.deleteIncome.bind(this, income.id)}><FontAwesomeIcon icon={faTrash}/></Button>
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