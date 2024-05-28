import { CDN_URL } from "../utils/constants";
import { FaStar } from "react-icons/fa6";

const ItemList = ({ items }) => {

    return (
        <>
            {items.map((item) => (

                <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2 flex justify-between">
                    <div className="text-left w-[50%] sm:w-[70%]">
                        <p className="text-lg font-medium">{item.card.info.name}</p>
                        <p className="text-base font-medium">₹ {item.card.info.price / 100 || item.card.info.defaultPrice / 100}</p>

                        { item.card.info.ratings.aggregatedRating.rating && <>
                            <FaStar className="text-green-500 inline mb-1"/>
                            <span className="text-green-500 pl-1">{item.card.info.ratings.aggregatedRating.rating}</span>
                            <span className="text-sm text-gray-400 ml-2">({item.card.info.ratings.aggregatedRating.ratingCountV2})</span>
                        </>}
                        
                        <p className="text-sm my-2 text-gray-500">{item.card.info.description}</p>
                    </div>

                    <div className="w-[50%] sm:w-[30%] p-2 relative m-auto">
                        <button className="px-5 py-2 border-2 bg-white text-green-500 absolute bottom-0 left-1/2 transform -translate-x-1/2 font-semibold rounded-lg ">Add </button>

                        <img src={CDN_URL + item.card.info.imageId} className="rounded-lg w-full md:w-[70%] mx-auto object-cover bg-white" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default ItemList;