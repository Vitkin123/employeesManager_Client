import axios, {AxiosResponse} from "axios";


axios.defaults.baseURL = "http://localhost:5000/api";


export const requests = {
    get: () => getEmployees()
}
const getEmployees = () => {
    axios.get("https://localhost:5001/api/Employees/GetEmployees").then(employees => {
    })
}


