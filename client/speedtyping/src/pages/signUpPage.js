import { formToJSON } from 'axios';
import api from '../api/axiosConfig.js'

function SignUpPage() {

    const postData = async (e) => {
        e.preventDefault();
        const userData = new FormData(e.target);

        if (userData.get('password')!==userData.get('password_confirmation')) {
            console.log('different passwords');
            return false;
        }

        const userDataJson = formToJSON(userData);
        const response = await api.post('/register', userDataJson);

        console.log(response);
    }

    return(
        <div>
            <form onSubmit={postData}>
                <input type="text" name="username" placeholder="username" required/>
                <input type="email" name="email" placeholder="email" required/>
                <input type="password" name="password" placeholder="password" required/>
                <input type="password" name="password_confirmation" placeholder="confirm password" required/>
                <input type="submit" />
            </form>
        </div>
    )

}

export default SignUpPage