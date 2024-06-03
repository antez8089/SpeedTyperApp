import { useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';
import Cookies from "js-cookie";

function UserQuick() {
    const [data, setData] = useState(null);
    const access_token = Cookies.get('access_token');

    const response = api.get("/user/get-username", {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(response => {
        setData(response.data);
    });

    return (
        <div className="usr">
            <div className="user-photo">
                <img src="/speedtyping_logo.png" alt="User" />
            </div>
            <div className="user-info">
            <div>
                <div style={{ color: '#66FCF1' }}>Username: {data}</div>
            </div>
            </div>
        </div>
    );
}

export default UserQuick;