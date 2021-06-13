
import React, { useState,useContext , useRef } from 'react';
import { Formik, Field, Form } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import APPCONSTANTS from '../../Constant/AppConstants';
import Button from '../../Constant/Button';
import axios from 'axios';
import "../../Assets/css/main_app.css";
import useToast from "../../Hooks/Toast";
import Select from 'react-select';
import AppContext from "../../Store/AppContext";

/**
     * Fire when user submits the form
     * @param {Object} values - Formik values 
     */

function Home() {
  const [state, setState] = useState(JSON.parse(JSON.stringify(APPCONSTANTS.HOME_INITIAL_VALUES.HOME_INPUT)));
  const Toast = useToast();
  const {spinner} = useContext(AppContext);
  const selectLeadRef = useRef();
  const selectBroadbandRef = useRef();

  // ---for select option we use react select to resset the options -----///
  const onClear = () => {
    selectLeadRef.current.select.clearValue();
    selectBroadbandRef.current.select.clearValue();
  };
  const onSubmitted = async (values, { setSubmitting, resetForm }) => {
    try {
      // --------we need remarks and user id as a payload so we are using session storage-----//
      let tmpData = { ...values };
      spinner.show()
      tmpData.remarks = JSON.parse(sessionStorage["userDetails"]).remarks;
      tmpData.addedBy = JSON.parse(sessionStorage["userDetails"]).id;
      await axios.post(APPCONSTANTS.APIS.HOME_DATA, tmpData);
      onClear();
      Toast.success({message:APPCONSTANTS.MESSAGES.SUCCESS.MESSAGES});
      // ------from Reset------// 
      resetForm(JSON.parse(JSON.stringify(APPCONSTANTS.HOME_INITIAL_VALUES.HOME_INPUT)));
      spinner.hide()
      setState(JSON.parse(JSON.stringify(APPCONSTANTS.HOME_INITIAL_VALUES.HOME_INPUT)));
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false)
      spinner.hide()
      Toast.error({message: APPCONSTANTS.MESSAGES.ERROR.DATAERROR,err});
    }
  }
  return (
    <div className="page_container ">
      <Formik
        initialValues={state}
        validationSchema={APPCONSTANTS.HOME_SCHEMAS.HOME}
        onSubmit={onSubmitted}>
        {({
          handleSubmit,
          errors,
          touched,
          isValid,
          isSubmitting,
          dirty,
          setFieldValue,
          values,
          resetForm
        }) => {
          return (
            <Form onSubmit={handleSubmit} >
              <div className="row home_inputs ">
                <div className="col-md-5 ">
                  <div className="form-row">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="firstName">First Name</label>
                      <Field className="form-control" name="firstName"  />
                      {errors.firstName && touched.firstName && <div className="text-danger text-danger">{errors.firstName}</div>}
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="lastName">Last Name</label>
                      <Field className="form-control" name="lastName" />
                      {errors.lastName && touched.lastName && <div className="text-danger">{errors.lastName}</div>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12">
                      <div className="form-group  ">
                        <label htmlFor="mobile" >Mobile<span className="requried-field">*</span></label>
                        <Field className="form-control" type="tel" name="mobile"  />
                        {errors.mobile && touched.mobile && <div className="text-error text-danger">{errors.mobile}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12">
                      <div className="form-group ">
                        <label htmlFor="area">Area</label>
                        <Field className="form-control" name="area"  />
                        {errors.area && touched.area && <div className="text-danger">{errors.area}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12">
                      <div className="form-group ">
                        <label htmlFor="existingBroadband">Existing Broadband</label>
                        <Select
                          ref={selectBroadbandRef}
                          options ={APPCONSTANTS.Broadbandlist}
                          onChange={(data) => setFieldValue("existingBroadband", data && data.value)}
                          name="existingBroadband"
                          placeholder=""
                          defaultValue={values && values.existingBroadband}
                        />
                        {errors.existingBroadband && touched.existingBroadband && <div className="text-danger">{errors.existingBroadband}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12">
                      <div className="form-group ">
                        <label htmlFor="leadType">Lead Type<span className="requried-field">*</span></label>
                        <Select
                          ref={selectLeadRef}
                          options={APPCONSTANTS.LeadTypeList}
                          onChange={(data) => setFieldValue("leadType", data && data.value)}
                          name="leadType"
                          defaultValue={values && values.leadType}
                          placeholder=""
                        />
                        {errors.leadType && touched.leadType && <div className="text-error text-danger">{errors.leadType}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 flx justify-content-end">
                      <Button  onClick={() => {resetForm(); onClear();}} disabled={!dirty||isSubmitting}/>
                      <button className="ml-3 update_button " type="submit" disabled={isSubmitting || !isValid || !dirty}>
                        SAVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}
export default Home;