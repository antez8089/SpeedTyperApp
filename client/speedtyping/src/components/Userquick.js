import { useEffect } from "react";

function UserQuick() {

    useEffect(() => {
        // TODO: Fetch user data from the server
    }, [])

  return (
    <div className="usr">
        <div className="user-photo">
            <img src="/unnamed.jpg" alt="User Photo" />
        </div>
        <div className="user-info">
            <h2>Imie: Tu imie</h2>
            <p>Email: Tu email</p>
            <p>Wiek: tu wiek</p>
        </div>
    </div>
    );
}

export default UserQuick;
