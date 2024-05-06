import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// import useAuth from '../hooks/useAuth';
// import { useAuth } from '../hooks/useAuth';
// import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const { userData, logout } = useAuth();

    console.log("userData", userData)

    const handleLogOut = () => {
        // localStorage.removeItem('userData');
        logout()
    };

    return (
        <div className='bg-yellow-300 p-5 space-x-8 flex w-full justify-around text-[#242424] font-bold text-xl'>
            <Link to="/">Home</Link>
            <div className='flex space-x-5'>
                <Link to="/login">{userData ? <h1>Hi, {userData?.name!}</h1> : "SignIn"} </Link>
                {
                    userData &&
                    <a href="/" onClick={handleLogOut}>Log Out</a>
                }
            </div>
        </div>
    );
}

export default Navbar;
