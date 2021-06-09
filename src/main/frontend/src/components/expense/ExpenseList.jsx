import React, { Component } from "react";
import { ButtonGroup, Card, Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import MyToast from "../MyToast";
import authHeader from "../../services/auth-header";

import axios from "axios";

const API_URL = "http://localhost:8080/api/expenses/";

export default class ExpenseList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expenses: [],
			currentPage: 1,
			expensesPerPage: 5
		};
	}

	componentDidMount() {
    this.findAllExpenses();
	}

	findAllExpenses() {
		axios.get(API_URL, {
			headers: { Authorization: authHeader().Authorization },
		})
		.then(response => response.data)
		.then((data) => {
			this.setState({expenses: data});
		})
	};

	deleteExpense = (expenseId) => {
		axios.delete(API_URL + expenseId, {
			headers: { Authorization: authHeader().Authorization },
		})
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

	// Funcao para mudar a pagina
	changePage = event => {
		this.setState({
			[event.target.name]: parseInt(event.target.value)
		});
	};

	// Funcao que faz voltar para a primeira pagina da lista
	firstPage = () => {
		if(this.state.currentPage > 1){
			this.setState({
				currentPage: 1
			});
		}	
	};

	// Funcao que volta para pagina anterior
	prevPage = () => {
		if(this.state.currentPage > 1){
			this.setState({
				currentPage: this.state.currentPage - 1
			});
		}
	};

	// Funcao que faz ir para a ultima pagina da lista
	lasttPage = () => { // This fuction is not working
		if(this.state.currentPage < Math.ceil(this.state.expenses.length / this.state.expensesPerPage)){
			this.setState({
				currentPage: Math.ceil(this.state.expenses.length / this.state.expensesPerPage)
			});
		}
	};

	// Funcao que faz ir para a pagina seguinte
	nextPage = () => {
		if(this.state.currentPage < Math.ceil(this.state.expenses.length / this.state.expensesPerPage)){
			this.setState({
				currentPage: this.state.currentPage + 1
			});
		}
	};

	render() {
		const {expenses, currentPage, expensesPerPage} = this.state;
		const lastIndex = currentPage * expensesPerPage;
		const firstIndex = lastIndex - expensesPerPage;
		const currentexpenses = expenses.slice(firstIndex, lastIndex);
		const totalPages = expenses.length / expensesPerPage;

		const pageNumCss = {
			width: "45px",
			border: "1px solid",
			textAlign: "center",
			fontWeight: "bold"
		}
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
							expenses.length === 0 ?
							<tr aling="center">
								<td colSpan="6"> No Expenses Available</td>
							</tr> :
							currentexpenses.map((expenses, index) => (
								<tr key={index}>
									<td> {expenses.id}</td>
									<td> {expenses.description} </td>
									<td> €{expenses.value} </td>
									<td> {expenses.category} </td>
									<td> {expenses.date} </td>
									<td>
										<ButtonGroup>
											<Link to={"editExpense/" + expenses.id} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit}/></Link>{' '}
											<Button size="sm" variant="outline-primary" onClick={this.deleteExpense.bind(this, expenses.id)}><FontAwesomeIcon icon={faTrash}/></Button>
										</ButtonGroup>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
				</Card.Body>
				<Card.Footer>
					<div style={{"float":"left"}}>
								Showing Page {currentPage} of {totalPages}
					</div>
					<div style={{"float":"right"}}>
								<InputGroup>
									<InputGroup.Prepend>
										<Button type="button" disable={currentPage === 1 ? true : false} onClick={this.firstPage}>
											<FontAwesomeIcon icon={faFastBackward}/> First
										</Button>
										<Button type="button" disable={currentPage === 1 ? true : false} onClick={this.prevPage}>
											<FontAwesomeIcon icon={faStepBackward}/> Prev
										</Button>
									</InputGroup.Prepend>
									<FormControl style={pageNumCss} name="currentPage" value={currentPage} onChange={this.changePage}/>
									<InputGroup.Append>
										<Button type="button" disable={currentPage === totalPages ? true : false} onClick={this.nextPage}>
											<FontAwesomeIcon icon={faStepForward}/> Next
										</Button>
										<Button type="button" disable={currentPage === totalPages ? true : false} onClick={this.lasttPage}>
											<FontAwesomeIcon icon={faFastForward}/> Last
										</Button>
									</InputGroup.Append>

								</InputGroup>
					</div>
				</Card.Footer>
			</Card>
			</div>
		);
	}
}