import { Link } from "react-router-dom"

function HomePage() {

    return(
        <div>
            <h1>Home page</h1>
            <Link to="/keyboard">Typing</Link>
            <Link to="/words">Words</Link>
        </div>
    )

}

export default HomePage