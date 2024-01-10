import React, { useEffect, useState } from 'react'
import ExpenseItem from './ExpenseItem';
import axiosInstance from '../axios/axiosInstance';
import { useGlobalState } from '../../contextApi/GlobalState';

const ExpenseList = () => {
    const { globalState, updateGlobalState } = useGlobalState();


    const [expenses, setExpense] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/expense/getAll');
                setExpense(response?.data);

                const sum = expenses.reduce((acc, exp) => acc + (exp?.amount || 0), 0);
                updateGlobalState("totalExp", sum);
            } catch (error) {
                console.error("Error fetching expense data:", error);
            }
        };

        fetchData();
    }, [globalState])
    return (
        <ul className='list-group'>
            {expenses.length > 0 ? expenses.map((expense) => (
                <ExpenseItem id={expense._id} name={expense.category} cost={expense.amount} />
            )) : <h4>Add your Expenses</h4>}
        </ul>
    )
}

export default ExpenseList