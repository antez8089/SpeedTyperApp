import { formToJSON } from 'axios';
import api from '../api/axiosConfig.js'
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

    const {
        login
    } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = new FormData(e.target);

        const userJsonData = formToJSON(userData);

        const response = await api.post('/auth/sign-in', userJsonData, {
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


    return (
        <div className="flex justify-center">
            <form className="flex flex-col " onSubmit={handleLogin}>
                <input type='email' name='email' placeholder="email"/>
                <input type='password' name='password'/>
                <input type='submit' />
            </form>
        </div>
    )
}

export default LoginPage;