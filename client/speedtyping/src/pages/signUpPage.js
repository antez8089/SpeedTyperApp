import { formToJSON } from 'axios';
import api from '../api/axiosConfig.js'
import Form from '../components/Form.js';


function SignUpPage() {

    const postData = async (userData) => {
        console.log(userData);
        if (userData.password !== userData.password_confirmation) {
            console.log('different passwords');
            return false;
        }

        const response = await api.post('/auth/sign-up', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
    }

    const fields = [
        { id: 'username', label: 'Username', type: 'text', value: '' },
        { id: 'email', label: 'Email', type: 'email', value: '' },
        { id: 'password', label: 'Password', type: 'password', value: '' },
        { id: 'password_confirmation', label: 'Confirm Password', type: 'password', value: '' },
    ]

    return(
        <div className='flex justify-center'>
            <div className='w-96'>
                <Form fields={fields} onSubmit={postData} />
            </div>
        </div>
    )

}

export default SignUpPage