import React, { useEffect } from 'react'
import Budjet from '../common/Budjet'
import Remaining from '../common/Remaining'
import ExpenseTotal from '../common/ExpenseTotal'
import ExpenseList from '../common/ExpenseList'
import AddExpense from '../common/AddExpense'
import axiosInstance from '../axios/axiosInstance'
import { useGlobalState } from '../../contextApi/GlobalState'

const Home = () => {
    const { globalState, updateGlobalState } = useGlobalState();


    useEffect(() => {
        axiosInstance.get('/expense/user')
            .then((res) => {
                updateGlobalState("budgetLimit", res?.data?.user?.budgetLimit);
                console.log(globalState)

            })

            .catch((error) => {
                console.log(error)
            })

    }, [])
    return (
        <>
            <div className='container'>
                <h1 className='mt-3'>My Budget Planner</h1>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <Budjet />
                    </div>
                    <div className='col-sm'>
                        <Remaining />
                    </div>
                    <div className='col-sm'>
                        <ExpenseTotal />
                    </div>
                </div>
                <h3 className='mt-3'>Expenses</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <ExpenseList />
                    </div>
                </div>
                <h3 className='mt-3'>Add Expense</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <AddExpense />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home