import { ResMenuShimmer } from "./Shimmer";
import { useParams } from "react-router-dom";  // hook to catch path parameter
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";


const RestaurantMenu = () => {

    const {resId} = useParams(); // resId is comming from path provided "/restaurant/:resId" (ex: "/restaurant/452" or "/restaurant/674"  diffrent for diffrent restaurant to load dynamic page)

    const resInfo = useRestaurantMenu(resId); // Custom Hook returning API Data matching resId

    const [showIndex, setShowIndex] = useState(0);

    // *** till data not fetched show this ***
    if(resInfo === null) return <ResMenuShimmer />;

    // Destructuring resInfo
    const { 
        name, 
        cuisines, 
        cloudinaryImageId,
        costForTwoMessage, 
        avgRating 
    } = resInfo.cards[2].card.card.info;

    // *** select only ItemCategory_card data from all cards data ***
    const categories = 
        resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter( 
            (c) => 
                c.card.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" 
        );

    return (
        <div className="text-center mt-[15vh]">
            <h1 className="font-bold my-4 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} - {costForTwoMessage} 
            </p>

            {/* categories accordian (dropdown menu) */}

            { categories.map( (category, index) => (
                <RestaurantCategory 
                    key={index} 
                    data={category.card.card}
                    resInfo={resInfo}
                    showItems = {index === showIndex}
                    itemIndex = {index}
                    setShowIndex= {setShowIndex}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;