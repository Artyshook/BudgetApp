import axios from 'axios'
import { CashFlowProps } from './types'

export const getTransactions = async (userID: string, date: Date) => {
    try {
        const result = await axios.get(
            'http://localhost:1000/api/transactions',
            {
                params: {
                    monthYear: date,
                    userID,
                },
            }
        )
        return result.data.transactions
    } catch (error) {
        console.error(error)
    }
}

export const createTranTransaction = async (data: CashFlowProps) => {
    try {
        const result = await axios.post(
            'http://localhost:1000/api/transaction',
            data
        )

        return result
    } catch (error) {
        console.log(error)
    }
}

export const updateTransaction = async (data: CashFlowProps) => {
    try {
        const result = await axios.post(
            'http://localhost:1000/transaction/:id',
            data
        )
        return result
    } catch (error) {
        console.log(error)
    }
}

export const deleteTransaction = async (id: string) => {
    try {
        const result = await axios.delete(
            'http://localhost:1000/transaction/:id',
            { data: { id } }
        )
        return result
    } catch (error) {
        console.log(error)
    }
}
