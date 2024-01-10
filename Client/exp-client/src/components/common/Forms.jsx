import React from 'react'
import { useForm } from 'react-hook-form'

const Forms = (props) => {

    const { register, handleSubmit, watch
        , formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        props.handleFun(data)
    }
    return (
        <>
            <div className="genForm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: "Email is not valid."
                                }
                            })}
                        />
                        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                    </div>
                    <div className="form-control">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 6,
                                    message: "Password should be at-least 6 characters."
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="errorMsg">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="form-control">
                        <button className='formBut' type="submit">{props.pageName}</button>
                    </div>
                </form>
                <p>{props.pageMessage} <a href={props.pageLink}>{props.pageLinkMsg}</a></p>
            </div>

        </>
    )
}

export default Forms