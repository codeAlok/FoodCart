import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserOffline from "./UserOffline";
import RestaurantOnline from "./RestaurantOnline";
import Footer from "./Footer";


// ** Body (main container) component **
const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [resTitle, setResTitle] = useState("");

    useEffect( ()=> {
        fetchData();
    }, [] );

    // **** function to fetch Live API Data and Apply to our Project ****
    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

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