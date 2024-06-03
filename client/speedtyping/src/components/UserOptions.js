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
        <div className="rounded-lg user-boxer">
            <div className='text-2xl font-bold text-white'>Change user name:</div>
            <form onSubmit={postData} className='flex gap-4'>
                <input type="text" name="username" placeholder="username" required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className='p-2 bg-sky-200 rounded-lg'
                />
                <input type="submit" className='p-2 bg-sky-400 rounded-lg hover:bg-sky-300 hover:cursor-pointer' />
            </form>
        </div>
    );
}

export default UserOptions;