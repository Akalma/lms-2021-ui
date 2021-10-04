
import * as Yup from 'yup';
import "yup-phone";

export let HOSTNAME = `${location.origin}:8089`; // Storing  a  Host  Name in global variable
if (HOSTNAME !== null && ((HOSTNAME.indexOf('localhost') !== -1)
    || (HOSTNAME.indexOf('127.0.0.1') !== -1)))
    HOSTNAME = "http://localhost:8089";


// const phoneRegExp = /^((\\[+]?[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/        
const phoneRegExp = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const API_HOSTNAME = `${HOSTNAME}/lms`;
const SETTINGSDATA = `${HOSTNAME}/lms`;
const HOME_DATA_NAME = `${HOSTNAME}/lms`;

// ----Home select options----//
const Broadbandlist = [
    { value: 'NONE', label: 'NONE' },
    { value: 'BSNL', label: 'BSNL' },
    { value: 'AIRTEL', label: 'AIRTEL' },
    { value: 'ACT', label: 'ACT' },
    { value: 'HATHWAY', label: 'HATHWAY' }
]
const LeadTypeList = [
    { value: 'HOT', label: 'HOT' },
    { value: 'WARM', label: 'WARM' },
    { value: 'COLD', label: 'COLD' },
    { value: 'CLOSED', label: 'CLOSE' }
]
const APPCONSTANTS = Object.freeze({
    SCHEMAS: {
        LOGIN: Yup.object({
            email: Yup.string()
                .max(15, 'Less than 15 characters')
                .required('Enter valid username'),
            password: Yup.string()
                .required('Enter valid password'),
        })
    },
    Broadbandlist,
    LeadTypeList,

    // ------Home page validation---//
    HOME_SCHEMAS: {

        HOME: Yup.object().shape(
            {

                mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
                    .min(10).
                    max(13).required('Enter valid phone number'),
                leadType: Yup.string().required("Lead type is requried "),

            }
        )
    },
    // ----Settings page validation-----//
    Schema: {
        Settings: Yup.object({
            currentPassword: Yup.string().required('Enter current password'),
            newPassword: Yup.string()
                .min(6, 'Minimum 6 char requried')
                .required('Enter password'),

        })
    },
    // -----Settings page validation ------//
    SETTINGS_SCHEMAS: {
        SETTING: Yup.object({
            current_password: Yup.string().required('Ops! password mismatch'),
            new_password: Yup.string().required('Enter new password'),
        })
    },
    APIS: {
        LOGIN: `${API_HOSTNAME}/v2/login`,
        RESET_PASSWORD: `${SETTINGSDATA}/v2/reset/password`,
        HOME_DATA: `${HOME_DATA_NAME}/v2/lead/data`,
        DOWNLOAD_DATA: `${API_HOSTNAME}/v2/download/reports`,
        VIEW_DATA: `${API_HOSTNAME}/v2/reports`,
        PAGINATION_COUNT: `${API_HOSTNAME}/v2/reports/count`,

    },

    MESSAGES: {
        SUCCESS: {
            MESSAGES: "Lead created successfully"
        },
        INFO: {

        },
        ERROR: {
            ERROR: "No recordes found",
            ERRORS: "Please select from and to date",
            DATAERROR: "Lead creation failed! Please try again ",
            LOGINERROR: "Something went wrong, Please try after some time"
        }
    },
    INITIAL_VALUES: {
        CHANGE_PASSWORD: {
            currentPassword: "",
            newPassword: ""
        }
    },
    LOGIN_INITIAL_VALUES: {
        LOG_IN: {
            email: "",
            password: "",
        }

    },
    HOME_INITIAL_VALUES: {
        HOME_INPUT: {
            firstName: '',
            lastName: '',
            mobile: '',
            area: '',
            existingBroadband: '',
            leadType: ''
        }
    }


})

export default APPCONSTANTS;