import axios from "axios";

const INCOME_API_BASE_URL = "http://localhost:8080/api/incomes";

class IncomeService {
	getIncome() {
		return axios.get(INCOME_API_BASE_URL);
	}
}

export default new IncomeService();
