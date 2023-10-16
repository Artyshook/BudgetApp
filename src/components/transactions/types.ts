
export interface TransactionProps {
    amount: number
    category: string
    description: string
    saving_goal_Id?: string | ''
    id?: string
    start_date: Date
    userId: string
    category_type: string
}