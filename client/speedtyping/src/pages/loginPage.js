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
        login(userData.username, userData.password);
        navigate('/user')
    };

    const fields = [
        { id: 'username', label: 'Username', type: 'text', value: '' },
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