import { useState } from 'react';
import api from '../api/axiosConfig.js'
import Cookies from "js-cookie";

function UserOptions() {
    const [username, setUsername] = useState('');
    const access_token = Cookies.get('access_token');

    const postData = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/user/set-username', username, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
    
            if (response.data.logged_in) {
                Cookies.set('access_token', response.data.token, {path: '/'});
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    }
    

    return (
        <div className="user-boxer">
            <div>change user name:</div>
            <form onSubmit={postData}>
                <input type="text" name="username" placeholder="username" required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input type="submit" />
            </form>
        </div>
    );
}

export default UserOptions;