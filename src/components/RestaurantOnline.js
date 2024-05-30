import RestaurantCard, { withTopRatedLabel } from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RestaurantOnline = ({ resTitle, resData }) => {

    const [filteredRestaurants, setFilteredRestaurants] = useState(resData);
    const [searchText, setSearchText] = useState("");

    // Higherorder component taking a component & returning updated component
    const RestaurantCardTopRated = withTopRatedLabel(RestaurantCard);

    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold p-2">{resTitle}</h2>
            </div>

            <div className="m-4">
                
            </div>

            {/* Displaying data based on filter */}
            <div className="flex flex-wrap justify-center">
                {
                    filteredRestaurants.map((restaurant) => (
                        <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}>

                            {(restaurant.info.avgRating >= 4.5)
                                ? <RestaurantCardTopRated resData={restaurant} />
                                : <RestaurantCard resData={restaurant} />
                            }
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default RestaurantOnline;
