import { useEffect, useState } from 'react';
import api from '../api/axiosConfig.js'


function Ranking() {
    const [ranking, setRanking] = useState([]);

    const fetchRanking = async () => {
        const params = { limit: 50 }
        const response = await api.get('/ranking', { params });
        setRanking(response.data);
    }

    useEffect(() => {
        try {
            fetchRanking();
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <div className='mt-6 mx-auto max-w-96'>
            <div>
                {ranking && 
                ranking.map((user, index) => {
                    return (
                        <div
                        key={user.username}
                        className='flex justify-between bg-gray-600 text-2xl rounded-xl px-4 py-2 m-2'
                        {...(index === 0
                            ?
                            {style: {color: '#e330a7', backgroundColor: '#002b57', boxShadow: '0 0 20px #e330a7'}}
                            :
                            {style: {color: '#66FCF1'}}
                        )}
                        
                        >
                            <span>#{index + 1} {user.username}</span>
                            <span>{user.score}</span>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default Ranking;
