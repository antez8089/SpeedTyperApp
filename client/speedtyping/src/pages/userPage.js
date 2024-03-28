import UserQuick from "../components/Userquick";
import UserBar from "../components/UserBar";

function UserPage() {

    return (
        <div className="user-container">
            <UserQuick></UserQuick>
            <UserBar></UserBar>
        </div>
    )
}

export default UserPage;