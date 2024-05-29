import { useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';
import Cookies from "js-cookie";

function UserStatisticks() {
    const [data, setData] = useState(null);
    const access_token = Cookies.get('access_token');

    const response = api.get("/user/get-score", {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }).then(response => {
        setData(response.data);
    });
    

    return (
      <div className="user-boxer">
            <div>
                <div>Score : {data}</div>
            </div>
      </div>
      );
  }
  
export default UserStatisticks;
  