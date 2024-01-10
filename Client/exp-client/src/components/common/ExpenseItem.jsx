import React from 'react'
import { TiDelete } from 'react-icons/ti';
import axiosInstance from '../axios/axiosInstance';
import { useGlobalState } from '../../contextApi/GlobalState';


const ExpenseItem = (props) => {
    const { globalState, updateGlobalState } = useGlobalState();

    const handleDelete = async () => {
        const response = await axiosInstance.delete(`/delete/:${props.id}`)
        if (globalState.value1) {
            updateGlobalState("value1", false)

        } else {
            updateGlobalState("value1", true)

        }


    }
    return (
        <>
            <li key={props.id} className='list-group-item d-flex justify-content-between align-items-center'>
                {props.name}
                <div>
                    <span className='badge badge-primary badge-pill mr-3' style={{ color: 'white', backgroundColor: 'blue' }}>
                        {props.cost}
                    </span>
                    <button onClick={handleDelete}><TiDelete size='1.5em'></TiDelete></button>
                </div>
            </li>
        </>
    )
}

export default ExpenseItem