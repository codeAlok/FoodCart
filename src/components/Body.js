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
    const [locationService, setLocationService] = useState(true);
    const [resTitle, setResTitle] = useState("");
    const { latitude, longitude } = useSelector((store) => store.location)

    console.log("inside body ", latitude, "  lng ", longitude)
    useEffect(() => {
        fetchData();
    }, [latitude]);

    // **** function to fetch Live API Data and Apply to our Project ****
    const fetchData = async () => {
        const data = await fetch(
            `https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D${latitude}%26lng%3D${longitude}%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING`
        );

        const json = await data.json();

        // ** to get the data from topBrands/ online restaurant whatever comes first (to get rid of inconsistent data on swiggy api) **
        const restData = json?.data?.cards.find((item) => item?.card?.card?.gridElements?.infoWithStyle['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.FavouriteRestaurantInfoWithStyle");

        console.log("restCard: ", restData)

        if (json?.data?.cards[0]?.card?.card?.title === "Location Unserviceable") {
            console.log("service unserviceable");
            setLocationService(false);
        }
        else {
            setListOfRestaurants(restData?.card?.card?.gridElements?.infoWithStyle?.restaurants);

            if(restData?.card?.card?.header?.title){
                setResTitle(restData?.card?.card?.header?.title);
            }
            else{
                const resTitle = json?.data?.cards.find((item) => item?.card?.card['@type'] === "type.googleapis.com/swiggy.seo.widgets.v1.BasicContent");
                setResTitle(resTitle?.card?.card?.title);
            }
            setLocationService(true);
        };

    }

    // *** UI to display if you're offline ***
    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false) {
        return <UserOffline />
    }

    // *** Display location unserviceable content ***
    if (locationService === false) {
        return (
            <div className="pt-[12vh]">
                <div className="my-6 flex flex-col items-center justify-center w-full sm:w-[60vw] m-auto text-center">
                    <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
                        className="w-[80vw] sm:w-[30vw]"
                        alt="location_unserviceable img"
                    />
                    <p className="my-2 text-xl font-semibold text-orange-500">Location Unserviceable</p>
                    <p className="text-slate-500 ">We don’t have any services here till now. Try changing location.</p>
                </div>
                <Footer />
            </div>
        )
    }

    // using conditional rendering (? :)
    return (listOfRestaurants == undefined || listOfRestaurants.length === 0)
        ? <Shimmer />
        : (
            <div className="mt-[13vh]">

                {/* online restaurant Data show */}
                <RestaurantOnline resTitle={resTitle} resData={listOfRestaurants} />
                <Footer />
            </div>
        );
};

export default Body;