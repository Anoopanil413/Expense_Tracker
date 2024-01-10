import React, { useEffect, useState } from 'react'
import Forms from '../common/forms'
import axiosInstance from '../axios/axiosInstance'
import { Navigate, useNavigate } from 'react-router-dom'

const Register = () => {

    const [formvalues, setFormValues] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate();



    const formHandler = (values) => {
        setFormValues(values)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post('/auth/register', formvalues);
                navigate("/login");

            } catch (error) {
                setErrorMsg(error?.response?.data?.message)
                console.error("this is errorroo", error?.response?.data?.message);
            }
        };
        if (formvalues) {
            console.log(formvalues)

            fetchData();
        }


    }, [formvalues])

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                <h2 style={{ color: '#ffff', fontWeight: 800 }}>Sign-Up</h2>
                <Forms pageLinkMsg="Log In" pageLink='/login' pageName="Sign Up" pageMessage="Already have an Account?" handleFun={formHandler} />
                {errorMsg && <p>{errorMsg}</p>}
            </div>
        </>
    )
}

export default Register