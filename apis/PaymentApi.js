import axios from 'axios'

const PaymentApi=axios.create({
    baseURL: process.env.baseUrl
})
export default PaymentApi