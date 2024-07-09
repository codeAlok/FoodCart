import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserOffline from "./UserOffline";
import RestaurantOnline from "./RestaurantOnline";
import Footer from "./Footer";
import { useSelector } from "react-redux";


// ** Body (main container) component **
const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [resTitle, setResTitle] = useState("");
    const {latitude, longitude} = useSelector((store) => store.location)

    console.log("inside body ", latitude, "  lng ", longitude)
    useEffect( ()=> {
        fetchData();
    }, [latitude] );

    // **** function to fetch Live API Data and Apply to our Project ****
    const fetchData = async () => {
        const data = await fetch(
            `https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D${latitude}%26lng%3D${longitude}%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING`
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