

function LoginPage() {

    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <div className="flex justify-center">
            <form className="flex flex-col ">
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='username' name='username' placeholder="username"/>
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password'/>
                </div>

                <button onClick={onSubmit}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage;