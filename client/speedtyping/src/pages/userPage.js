import UserQuick from "../components/Userquick";
import UserBar from "../components/UserBar";
import CustomWordSets from "../components/CustomWordSets";
import { useAuth } from '../contexts/AuthContext.jsx';

function UserPage() {

    const { userData } = useAuth();

    return (
        <div className="flex gap-10 mx-auto mt-10 max-w-screen-xl">
            <UserQuick></UserQuick>
            <UserBar></UserBar>
            <CustomWordSets></CustomWordSets>
        </div>
    )
}

export default UserPage;