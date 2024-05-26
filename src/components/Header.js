import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom"; // A component used instead of anchor tag
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { FaGenderless } from "react-icons/fa";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    const [openMenu, setOpenMenu] = useState(false)

    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext);

    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold bg-green-100 mb-2 h-[10vh] px-2 fixed top-0 z-10">
                <div className="h-[80%]">
                    <Link to="/">
                        <img className="h-[100%]" src={LOGO_URL} alt="logo" />
                    </Link>
                </div>

                {/* *** for small screen *** */}
                {!openMenu
                    ? (<div className="md:hidden" onClick={() => {
                        setOpenMenu(true);
                    }}>
                        <RxHamburgerMenu className="text-4xl font-bold" />
                    </div>)

                    : (<div className="md:hidden bg-slate-200 border-2 border-slate-200 w-[70vw] h-[100vh] text-center absolute right-0 top-0">

                        <ul className="p-2 w-full">
                            <RxCross1 className="text-4xl font-bold" onClick={() => {
                                setOpenMenu(false);
                            }} />

                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500"> <Link to="/">Home</Link> </li>
                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500"> <Link to="/about">About Us</Link> </li>
                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500"> <Link to="/contact">Contact Us</Link> </li>
                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500"> <Link to="/cart">Cart</Link> </li>
                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500">
                                <button onClick={() => {
                                    btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                                }}
                                >
                                    {btnName}
                                </button>
                            </li>

                            <li className="px-2 py-4 text-xl border-b-[1px] border-gray-500">
                                {loggedInUser}
                                <FaGenderless className={onlineStatus ? "text-green-500 inline" : "text-red-500 inline "} />
                            </li>
                        </ul>
                    </div>)
                }

                {/* *** for large screen *** */}
                <div className="hidden md:flex md:items-center">
                    <ul className="flex items-center p-2">
                        <li className="px-2"> <Link to="/">Home</Link> </li>
                        <li className="px-2"> <Link to="/about">About Us</Link> </li>
                        <li className="px-2"> <Link to="/contact">Contact Us</Link> </li>
                        <li className="px-2"> <Link to="/cart">Cart</Link> </li>
                        <button
                            className="px-2"
                            onClick={() => {
                                btnName === "login" ? setBtnName("logout") : setBtnName("login");
                            }}
                        >
                            {btnName}
                        </button>

                        <li className="px-2">{loggedInUser}</li>
                        <FaGenderless className={onlineStatus ? "text-green-500" : "text-red-500 "} />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;