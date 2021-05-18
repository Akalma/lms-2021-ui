import { specialChars } from '@testing-library/user-event';
import * as Yup from 'yup';


// const lowercase = /(?=.*[a-z])/;
// const uppercase = /(?=.*[A-Z])/;
// const Numaric = /(?=.*[0-9])/;
// const specialChar   = /(?=.*[$&+,:;=?@#-'<>.-^*()%!])/;


const NEWPASSWORD = "http://3.7.48.196:8085";
const API_NEWPASSWORD = `${NEWPASSWORD}/web`;
const VALIDATION_DATA = {
    Schema: {
        Settings: Yup.object({
            currentPassword: Yup.string().required('Enter Current password'),
            newPassword: Yup.string()
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                )
                // .matches(specialChar, 'Password should be 1 specialchar')
                // .min(8, 'Password is too short - should be 8 chars minimum.')
                // .max(10, 'password is too long-should be 10 chars maximum')
                .required('No password provided.'),

        })
    },
    APIS: {
        UPDATE: `${API_NEWPASSWORD}/chnage-password`
    },
    MESSAGES: {
        SUCCESS: {

        },
        INFO: {

        },
        ERROR: {

        }
    }
}


export default VALIDATION_DATA;