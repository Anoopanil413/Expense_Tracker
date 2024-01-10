import React from 'react'
import { useGlobalState } from '../../contextApi/GlobalState';

const ExpenseTotal = () => {
    const { globalState, updateGlobalState } = useGlobalState();

    return (
        <>
            <div className='alert alert-primary'>
                <span>Spent so far: ₹{globalState?.totalExp}</span>
            </div>
        </>
    )
}

export default ExpenseTotal