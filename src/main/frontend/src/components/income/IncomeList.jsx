import React, { Component } from "react";
import { ButtonGroup, Card, Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faListUl, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import MyToast from "../MyToast";
import authHeader from "../../services/auth-header";

import axios from "axios";

const API_URL = "http://localhost:8080/api/incomes/";

export default class IncomeList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			incomes: [],
			currentPage: 1,
			incomesPerPage: 5
		};
	}

	componentDidMount() {
    this.findAllIncomes();
	};

	findAllIncomes() {
		axios.get(API_URL, {
			headers: { Authorization: authHeader().Authorization },
		})
		.then(response => response.data)
		.then((data) => {
			this.setState({incomes: data});	
		})
	};

	deleteIncome = (incomeId) => {
		axios.delete(API_URL + incomeId, {
			headers: { Authorization: authHeader().Authorization },
		})
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
		if(this.state.currentPage < Math.ceil(this.state.incomes.length / this.state.incomesPerPage)){
			this.setState({
				currentPage: Math.ceil(this.state.incomes.length / this.state.incomesPerPage)
			});
		}
	};

	// Funcao que faz ir para a pagina seguinte
	nextPage = () => {
		if(this.state.currentPage < Math.ceil(this.state.incomes.length / this.state.incomesPerPage)){
			this.setState({
				currentPage: this.state.currentPage + 1
			});
		}
	};

	render() {
		const {incomes, currentPage, incomesPerPage} = this.state;
		const lastIndex = currentPage * incomesPerPage;
		const firstIndex = lastIndex - incomesPerPage;
		const currentIncomes = incomes.slice(firstIndex, lastIndex);
		const totalPages = incomes.length / incomesPerPage;

		const pageNumCss = {
			width: "45px",
			border: "1px solid",
			textAlign: "center",
			fontWeight: "bold"
		}

		return (
			<div>
				<div style={{ display: this.state.show ? "block" : "none" }}>
					<MyToast show = {this.state.show} message = {"Income Deleted Successfully."} type = {"danger"}/>
				</div>

				<Card className={"border border-ligth bg-light"}>
				<Card.Header><FontAwesomeIcon icon={faListUl}/> Income List</Card.Header>
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
							// this.state.incomes.length === 0 ?
							incomes.length === 0 ?
							<tr aling="center">
								<td colSpan="6"> No Incomes Available</td>
							</tr> :
							// this.state.incomes.map((income) => (
								currentIncomes.map((incomes, index) => (
								<tr key={index}>
									<td> {incomes.id}</td>
									<td> {incomes.description} </td>
									<td> €{incomes.value} </td>
									<td> {incomes.category} </td>
									<td> {incomes.date} </td>
									<td>
										<ButtonGroup>
											<Link to={"editIncome/" + incomes.id} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit}/></Link>{' '}
											<Button size="sm" variant="outline-primary" onClick={this.deleteIncome.bind(this, incomes.id)}><FontAwesomeIcon icon={faTrash}/></Button>
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