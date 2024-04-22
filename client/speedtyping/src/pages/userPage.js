import UserQuick from "../components/Userquick";
import UserBar from "../components/UserBar";
import { useAuth } from '../contexts/AuthContext.jsx';

function UserPage() {

    const { userData } = useAuth();

    return (
        <div className="user-container">
            <UserQuick></UserQuick>
            <UserBar></UserBar>
        </div>
    )
}

export default UserPage;