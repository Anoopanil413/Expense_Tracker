import React from 'react'
import { useGlobalState } from '../../contextApi/GlobalState';

const Remaining = () => {
    const { globalState, updateGlobalState } = useGlobalState();

    return (
        <>
            <div className='alert alert-success'>
                <span>Remaining: {globalState?.budgetLimit - globalState?.totalExp}</span>
            </div>
        </>
    )
}

export default Remaining