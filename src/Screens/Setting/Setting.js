import React, { useState,useContext } from 'react';
import { Formik, Field } from 'formik';
import classNames from "classnames";
import axios from 'axios';
import APPCONSTANTS from "../../Constant/AppConstants";
import Button from '../../Constant/Button';
import useToast from "../../Hooks/Toast"
import '../../Assets/css/main_app.css';
import AppContext from "../../Store/AppContext";


const Setting = () => {
    const [state, setState] = useState(JSON.parse(JSON.stringify(APPCONSTANTS.INITIAL_VALUES.CHANGE_PASSWORD)));
    const [error, setErrorMessage] = useState("");
    const Toast = useToast();
    const {spinner} = useContext(AppContext)
    /**
     * Triggered when user submit the form(Click on update password)
     * @param {Object} values - Formik form input values 
     * @param {Object} param1 - Formik objects
     */
    const onSubmitted = async (values, { setSubmitting, resetForm }) => {
        try {
            let tmpHeader = { ...values };
            spinner.show()
            // ------using tempHeader for storing the current user Email id----//
            tmpHeader.email = JSON.parse(sessionStorage["userDetails"]).email;
            await axios.put(APPCONSTANTS.APIS.RESET_PASSWORD, {}, { headers: { ...tmpHeader } }).then(({ data }) => {
                sessionStorage["changePassword"] = JSON.stringify(data);
                Toast.success({ message: APPCONSTANTS.MESSAGES.SUCCESS.MESSAGES});

                // Resetting form
                resetForm(JSON.parse(JSON.stringify(APPCONSTANTS.INITIAL_VALUES.CHANGE_PASSWORD)));
                spinner.hide()
                setState(JSON.parse(JSON.stringify(APPCONSTANTS.INITIAL_VALUES.CHANGE_PASSWORD)));
                // Setting Formik 'isSubmitting' as false
                setSubmitting(false);
            }).catch(({ response }) => {
                setErrorMessage(response.data.error);
                console.log(setErrorMessage)
                Toast.error({message:response.data.message})
                spinner.hide()
                setSubmitting(false);
            });
        } catch (err) {
            setSubmitting(false);
        }
    }
    return  <Formik
                enableReinitialize={true}
                onSubmit={onSubmitted}
                initialValues={state}
                validationSchema={APPCONSTANTS.Schema.Settings}>
                {
                    ({
                        handleSubmit,
                        isSubmitting,
                        touched,
                        errors,
                        isValid,
                        resetForm,
                        dirty,
                    }) => <form onSubmit={handleSubmit}  className="page_container ">
                            <div className="row ">
                                <div className="col-md-6 col-sm-6">
                                    <div className="row">
                                        <div className=" col-md-8 form-group ">
                                            <label htmlFor="currentPassword">Enter current Password<span className="requried-field">*</span></label>
                                            <Field type="password" name="currentPassword" className={classNames("form-control curent_password-input")} />
                                            {touched.currentPassword && errors.currentPassword && <label className="errorMessage text-danger" htmlFor="login-email">{errors.currentPassword}</label>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" col-md-8 form-group">
                                            <label htmlFor="newPassword" >Enter New Password</label>
                                            <Field type="password" name="newPassword" className={classNames("form-control newPassword_input")} />
                                            {touched.newPassword && errors.newPassword && <label className="errorMessage text-danger" htmlFor="newPassword">{errors.newPassword}</label>}
                                        </div>
                                    </div>
                                    <div className="errorMessage">{error}</div>
                                    <div className="row">
                                        <div className=" col-md-8 text-right">
                                            <Button onClick={()=>{resetForm();setErrorMessage("")}} />
                                            <button className="ml-3 update_button " type="submit" disabled={isSubmitting || !isValid || !dirty}>
                                                UPDATE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                }
            </Formik>}


export default Setting