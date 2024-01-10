import React, { useState } from 'react'
import axiosInstance from '../axios/axiosInstance';
import { useGlobalState } from '../../contextApi/GlobalState';

const AddExpense = () => {
    const [category, setCAtegory] = useState('');
    const [amount, setAmount] = useState('');
    const { globalState, updateGlobalState } = useGlobalState();


    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Heloooo", category, amount)
        axiosInstance.post('/expense/add', { amount, category })
            .then((resp) => {
                if (globalState.value) {
                    updateGlobalState("value", false)

                } else {
                    updateGlobalState("value", true)

                }
            })
            .catch((error) => {
                console.log(error)
            })


    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='row'>
                    <div className='col-sm'>
                        <label htmlFor='category' style={{ color: 'black' }}>category</label>
                        <input
                            required='required'
                            type='text'
                            className='form-control'
                            id='name'
                            value={category}
                            onChange={(event) => setCAtegory(event.target.value)}

                        ></input>
                    </div>
                    <div className='col-sm'>
                        <label htmlFor='cost' style={{ color: 'black' }}>Cost</label>
                        <input
                            required='required'
                            type='text'
                            className='form-control'
                            id='cost'
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}

                        ></input>
                    </div>
                    <div className='row'>
                        <div className='col-sm'>
                            <button type='submit' className='btn btn-primary mt-3'>
                                Save
                            </button>
                        </div>
                    </div>

                </div>

            </form>
        </>
    )
}

export default AddExpense