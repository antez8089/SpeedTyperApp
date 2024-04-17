import { formToJSON } from 'axios';
import api from '../api/axiosConfig.js'
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form.js';


function LoginPage() {

    const {
        login
    } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (userData) => {
        const response = await api.post('/auth/sign-in', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.data.logged_in) {
            login(response.data.token);
            console.log("login successful");
            navigate('/user')
        } else {
            console.log("login failed");
        }

    };

    const fields = [
        { id: 'email', label: 'Email', type: 'email', value: '' },
        { id: 'password', label: 'Password', type: 'password', value: '' },
    ]

    return (
        <div className="flex justify-center">
            <div className="w-96">
                <Form fields={fields} onSubmit={handleLogin} />
            </div>
        </div>
    )
}

export default LoginPage;