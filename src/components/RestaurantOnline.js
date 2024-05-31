import RestaurantCard, { withTopRatedLabel } from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const RestaurantOnline = ({ resTitle, resData }) => {
    const listOfRestaurants = resData; // updated with resData(actual data) on each reRender

    const [filteredRestaurants, setFilteredRestaurants] = useState(resData);
    const [activeFilter, setActiveFilter] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        searchRestaurant();
        setActiveFilter(null);
    }, [searchText]);

    // update to clear(inputbox & errordata) when error message displayed due to search & filter option also used
    useEffect(() => {
        setSearchError("");
        setSearchText("");
    }, [activeFilter != null]);


    // Higherorder component taking a component & returning updated component
    const RestaurantCardTopRated = withTopRatedLabel(RestaurantCard);

    const filterRatingGreaterThan4 = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => res?.info?.avgRating > 4.5
        );

        setActiveFilter("ratingGreaterThan4");
        setFilteredRestaurants(filteredResList);
    }

    const filterPriceLessThan300 = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => parseInt(res?.info?.costForTwo.match(/\d+/)[0], 10) < 300
        )

        setActiveFilter("priceLessThan300");
        setFilteredRestaurants(filteredResList);
    }

    const filterPriceBetween300To600 = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => {
                const price = parseInt(res?.info?.costForTwo.match(/\d+/)[0], 10);

                return ((price >= 300) && (price <= 600));
            }
        );

        setActiveFilter("priceBetween300To600");
        setFilteredRestaurants(filteredResList);
    }

    const filterFastDelivery = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => res?.info?.sla?.deliveryTime <= 30
        )

        setActiveFilter("fastDelivery");
        setFilteredRestaurants(filteredResList);
    }

    const filterPureVeg = () => {
        const filteredResList = listOfRestaurants.filter(
            (res) => res?.info?.veg === true
        )

        setActiveFilter("pureVeg");
        setFilteredRestaurants(filteredResList);
    }

    const searchRestaurant = () => {
        if (searchText !== "") {
            const filteredResList = listOfRestaurants.filter(
                (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
            )

            setSearchError("");
            if (filteredResList.length === 0) {
                setSearchError(
                    `Sorry, we couldn't find any results for "${searchText}"`
                );
            }

            setFilteredRestaurants(filteredResList);
        }
        else {
            setSearchError("");
            if(activeFilter == null) {
                setFilteredRestaurants(listOfRestaurants);
            }
        }

    }

    const removeFilter = () => {
        setActiveFilter(null);
        setFilteredRestaurants(resData);
    }

    
    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold m-4">{resTitle}</h2>
            </div>

            <div className="m-4">
                <input
                    type="text"
                    className=" p-2 border border-solid border-black"
                    placeholder="Search Restaurant here..."
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                />

                <button
                    className=" text-slate-200 m-1 p-2 border-2 border-green-500 bg-green-500 rounded font-medium hover:bg-orange-400 hover:border-orange-400"
                    onClick={() => {
                        searchRestaurant();
                    }}
                >
                    Search
                </button>
            </div>

            <div className="m-4 flex flex-wrap">
                {/* rating greater than 4.5 */}
                <div className={`border-slate-300 border-[1px] py-2 px-3 rounded-2xl mb-2 hover:bg-orange-400 ${activeFilter == "ratingGreaterThan4"
                    ? "bg-orange-400"
                    : "bg-slate-200"}`}
                >
                    <button onClick={filterRatingGreaterThan4}
                    >
                        Rating 4.5+
                    </button>

                    {activeFilter == "ratingGreaterThan4" &&
                        <button className="pl-2 text-slate-700" onClick={removeFilter}>
                            <RxCross2 />
                        </button>
                    }
                </div>

                {/* price less than 300 */}
                <div className={`border-slate-300 border-[1px] p-2 px-3 rounded-2xl mb-2 ml-2 hover:bg-orange-400 ${activeFilter == "priceLessThan300"
                    ? "bg-orange-400"
                    : "bg-slate-200"}`}
                >
                    <button onClick={filterPriceLessThan300}>
                        Less than Rs. 300
                    </button>

                    {activeFilter == "priceLessThan300" &&
                        <button className="pl-2 text-slate-700" onClick={removeFilter}>
                            <RxCross2 />
                        </button>
                    }
                </div>

                {/* price between 300-600 */}
                <div className={`border-slate-300 border-[1px] p-2 px-3 rounded-2xl mb-2 ml-2 hover:bg-orange-400 ${activeFilter == "priceBetween300To600"
                    ? "bg-orange-400"
                    : "bg-slate-200"}`}
                >
                    <button onClick={filterPriceBetween300To600}>
                        Rs. 300 - Rs. 600
                    </button>

                    {activeFilter == "priceBetween300To600" &&
                        <button className="pl-2 text-slate-700" onClick={removeFilter}>
                            <RxCross2 />
                        </button>
                    }
                </div>

                {/* fast delivery button */}
                <div className={`border-slate-300 border-[1px] p-2 px-3 rounded-2xl mb-2 ml-2 hover:bg-orange-400 ${activeFilter == "fastDelivery"
                    ? "bg-orange-400"
                    : "bg-slate-200"}`}
                >
                    <button onClick={filterFastDelivery}>
                        Fast Delivery
                    </button>

                    {activeFilter == "fastDelivery" &&
                        <button className="pl-2 text-slate-700" onClick={removeFilter}>
                            <RxCross2 />
                        </button>
                    }
                </div>

                {/* Pure veg button */}
                <div className={`border-slate-300 border-[1px] p-2 px-3 rounded-2xl mb-2 ml-2 hover:bg-orange-400 ${activeFilter == "pureVeg"
                    ? "bg-orange-400"
                    : "bg-slate-200"}`}
                >
                    <button onClick={filterPureVeg}>
                        Pure Veg
                    </button>

                    {activeFilter == "pureVeg" &&
                        <button className="pl-2 text-slate-700" onClick={removeFilter}>
                            <RxCross2 />
                        </button>
                    }
                </div>
            </div>

            {searchError && <div className="text-center m-4 font-bold text-3xl text-slate-600">{searchError}</div>}

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
