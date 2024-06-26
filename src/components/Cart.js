import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { clearCart, clearItem, decreaseItemCount, increaseItemCount } from "../utils/cartSlice";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const resNeededInfo = useSelector((store) => store.cart.restaurant);
  const dispatch = useDispatch();

  console.log("cartitems ", cartItems);
  console.log("resdata ", resNeededInfo);


  return cartItems.length !== 0 ? (
    <div className="pt-[12vh]">
      <h1 className="text-3xl text-center">Cart page</h1>
      <div className="w-1/2 m-auto border-2 border-black">
        <div className="w-full flex justify-between border-2 border-red-400 ">
          <div>
            <h3>{resNeededInfo.name}</h3>
            <h4>{resNeededInfo.cuisines.join(", ")}</h4>
            <h4>{resNeededInfo.avgRating}</h4>
            <h4>{resNeededInfo.sla.slaString}</h4>
          </div>

          <img
            src={CDN_URL + resNeededInfo.cloudinaryImageId}
            alt="resImage"
            className="w-[30%]"
          />
        </div>

        {/* **** cartItem items list **** */}
        <div className="border-2 border-green-300 w-full">

          {cartItems.map((cartItem) => (

            <div key={cartItem.card.info.id} className="flex m-2 p-2 border-b-2">
              <img
                src={CDN_URL + cartItem.card.info.imageId}
                alt="item-image"
                className="w-[100px] h-[100px]"
              />

              <div className="w-full pl-2 ">
                <div className="flex justify-between">
                  <h2>{cartItem.card.info.name}</h2>
                  <MdDeleteForever
                    className="text-xl cursor-pointer"
                    onClick={() => dispatch(clearItem(cartItem.card.info.id))}
                  />
                </div>
                <div className="flex justify-between">
                  <div className="border-red-500 flex justify-evenly p-2 border-2 bg-white text-green-500  font-semibold rounded-lg ">
                    <div
                      className="mr-3 cursor-pointer"
                      onClick={() => dispatch(decreaseItemCount(cartItem.card.info.id))}
                    >
                      -
                    </div>
                    <span>{cartItem.quantity}</span>
                    <div
                      className="ml-3 cursor-pointer"
                      onClick={() => dispatch(increaseItemCount(cartItem.card.info.id))}
                    >
                      +
                    </div>
                  </div>
                  <p>₹ {cartItem.quantity * (cartItem.card.info.price / 100 || cartItem.card.info.defaultPrice / 100)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-between border-2 border-blue-500">
          <button
            className="py-2 px-4 bg-red-500 text-white"
            onClick={() => dispatch(clearCart())}
          >Clear Cart</button>

          <button className="py-2 px-4 bg-green-500 text-white">
            <Link to={"/restaurant/" + resNeededInfo.id}>
              Add more Items
            </Link>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="pt-[12vh]">Cart is empty</div>
  )
}

export default Cart;