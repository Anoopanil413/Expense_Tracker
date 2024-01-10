import React, { useEffect, useState } from 'react'
import Forms from '../common/forms'
import "./formStyle.css"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axios/axiosInstance'
import localStorageHook from '../customHooks/localStorage'

const Login = () => {
    const [formvalues, setFormValues] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [value, setValue] = localStorageHook('token')
    const navigate = useNavigate();



    const formHandler = (values) => {
        setFormValues(values)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post('/auth/login', formvalues);
                await setValue(response?.data?.token)

            } catch (error) {
                setErrorMsg(error?.response?.data?.message)
                console.error("this is errorroo", error);
            }
        };
        if (formvalues) {

            fetchData();
        }


    }, [formvalues])

    useEffect(() => {
        if (value) {
            navigate('/home')
        }

    }, [value])


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                <h2 style={{ color: '#ffff', fontWeight: 800 }}>Log-In</h2>
                <Forms pageLinkMsg="Register" pageLink='/register' pageName="Log in" pageMessage="Dont have an Account?" handleFun={formHandler} />
            </div>
        </>

    )
}

export default Login