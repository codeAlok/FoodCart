import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserOffline from "./UserOffline";
import RestaurantOnline from "./RestaurantOnline";
import Footer from "./Footer";
import { SWIGGY_MAIN_API } from "../utils/constants";


// ** Body (main container) component **
const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [resTitle, setResTitle] = useState("");

    useEffect( ()=> {
        fetchData();
    }, [] );

    // **** function to fetch Live API Data and Apply to our Project ****
    const fetchData = async () => {
        const data = await fetch(SWIGGY_MAIN_API);

        const json = await data.json();

        // taking data of all restaurants from top-brand and title
        setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setResTitle(json?.data?.cards[2]?.card?.card?.title);
    };

    // *** UI to display if you're offline ***
    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false){
        return <UserOffline />
    }

    // using conditional rendering (? :)
    return (listOfRestaurants == undefined || listOfRestaurants.length === 0) 
        ? <Shimmer /> 
        : (
            <div className="mt-[12vh]">

                {/* online restaurant Data show */}
                <RestaurantOnline resTitle={resTitle} resData={listOfRestaurants}/>
                <Footer />
            </div>
        );
};

export default Body;