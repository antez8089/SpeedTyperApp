import { useEffect } from "react";

function UserQuick( { userData }) {

    useEffect(() => {
        console.log(userData);
    }, [])

  return (
    <div className="usr">
        <div className="user-photo">
            <img src="/unnamed.jpg" alt="User Photo" />
        </div>
        <div className="user-info">
            <h2>Imie: Tu imie</h2>
            <p>Email: {userData.sub}</p>
            <p>Wiek: tu wiek</p>
        </div>
    </div>
    );
}

export default UserQuick;
