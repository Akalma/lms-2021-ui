import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import { navigate } from "@reach/router";
import APPCONSTANTS from "../../Constant/AppConstants";
import axios from 'axios';
import './auth.css';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Fired when user submits the form
     * @param {Object} values - Formik values 
     */
    const onSubmitted = (payload, { setSubmitting }) => {
        try {
            axios.get(APPCONSTANTS.APIS.LOGIN, { headers: { ...payload } }).then(({ data }) => {
                sessionStorage["userDetails"] = JSON.stringify(data);
                navigate('/dashboard', {state:{ title: "HOME"}});
            }).catch(({ response }) => {
                setErrorMessage((response && response.data && response.data.message) || APPCONSTANTS.MESSAGES.ERROR.LOGINERROR);
                setSubmitting(false);
            })
        } catch (err) {
            console.error("Exception occurred in onSubmitted -- ", err);
        }
    }
    return <div className="login-master-page">
        <div className="lt-ad">
            <h3>Lead Management System</h3>
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum</p>
        </div>
        <div className="main-content">
            <Formik
                onSubmit={onSubmitted}
                initialValues={APPCONSTANTS.LOGIN_INITIAL_VALUES.LOG_IN}
                validationSchema={APPCONSTANTS.SCHEMAS.LOGIN}>
                {
                    ({
                        handleSubmit,
                        isSubmitting,
                        touched,
                        errors,
                        isValid,
                        dirty
                    }) => <form className="form-signin " onSubmit={handleSubmit}>
                            <div className="product-type mb-4 text-center">Login to LMS</div>
                            {
                                errorMessage && <div className="alert alert-danger f13" role="alert">
                                    {errorMessage}
                                </div>
                            }
                            <div className="multi-container">
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="login-email" className="sr-only">Email</label>
                                        <Field type="text" name="email" placeholder="email" className="form-control" />
                                         {errors.email && touched.email && <div className="text-error">{errors.email}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="login-password" className="sr-only">Password</label>
                                        <Field type="password" name="password" placeholder="Password" className="form-control"/>
                                        {touched.password && errors.password && <label className="text-error" htmlFor="login-password">{errors.password}</label>}
                                    </div>
                                    <button className="btn btn-primary btn-block login-button login log-in-button" type="submit" disabled={isSubmitting || !isValid || !dirty}>
                                        {!isSubmitting && <span>Login</span>}
                                        {
                                            isSubmitting
                                            && <span>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;Logging In...
                                            </span>
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                }
            </Formik>
        </div>
    </div>
}

export default Login