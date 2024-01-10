import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../axios/axiosInstance';
import { useGlobalState } from '../../contextApi/GlobalState';


const Budjet = () => {
    const { globalState, updateGlobalState } = useGlobalState();

    const [budjet, setBudjet] = useState()
    const handleBudget = () => {
        axiosInstance.post('/expense/budget/set', { budgetLimit: budjet })
            .then(() => {
                if (globalState.value) {
                    updateGlobalState("value", false)

                } else {
                    updateGlobalState("value", true)

                }

            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <>
            <div className="alert alert-secondary">
                <span>₹{globalState?.budgetLimit}</span>
            </div>
            <div className="input-group mb-3">
                <input type="number" className="form-control" placeholder="Enter budget" aria-label="Enter budget" aria-describedby="basic-addon2"
                    value={budjet}
                    onChange={(event) => setBudjet(event.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={handleBudget}>Add Budget</button>
                </div>
            </div>

        </>
    )
}

export default Budjet