import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { clearCart, clearItem, decreaseItemCount, increaseItemCount } from "../utils/cartSlice";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";

const Cart = () => {
  const [itemTotalAmount, setItemTotalAmount] = useState(0);
  const [amountToPay, setAmountToPay] = useState(0);
  const cartItems = useSelector((store) => store.cart.items);
  const resNeededInfo = useSelector((store) => store.cart.restaurant);
  const dispatch = useDispatch();

  console.log("cartitems ", cartItems);
  console.log("resdata ", resNeededInfo);

  // to calculate total amount of items only
  useEffect(() => {
    function getItemTotalAmount() {
      let total = 0;

      if (cartItems.length !== 0) {
        cartItems.forEach((item) => {
          total += (item.card.info.price / 100 || item.card.info.defaultPrice / 100) * (item.quantity)
        })
      }
      total = Number(total.toFixed(2));
      setItemTotalAmount(total);
    }

    getItemTotalAmount();
  }, [cartItems]);

  // to calulate overall amountToPay after adding all extra charges
  useEffect(() => {
    function getTotalAmountToPay() {
      let total = 0;
      let deliveryFee = (resNeededInfo?.feeDetails?.totalFee / 100 || 0);
      let gst = Number((itemTotalAmount * 0.18).toFixed(2));

      total = (itemTotalAmount + deliveryFee + gst);
      setAmountToPay(total);
    }

    getTotalAmountToPay();
  }, [itemTotalAmount]);


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
                  <p>
                    ₹ {(cartItem.quantity * (cartItem.card.info.price / 100 || cartItem.card.info.defaultPrice / 100)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="w-full flex justify-between border-2 border-blue-500">
          <button
            className="py-2 px-4 bg-red-500 text-white"
            onClick={() => dispatch(clearCart())}
          >Clear Cart</button>

          <button className="py-2 px-4 bg-green-500 text-white">
            <Link to={"/restaurant/" + resNeededInfo.id}>
              Add more Items
            </Link>
          </button>
        </section>

        <section className="w-full border-2 border-pink-600">
          <p className="text-sm font-bold">Bill Details</p>

          <div className="flex justify-between text-sm">
            <p>Item Total</p>
            <p>₹{itemTotalAmount}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Delivery Fee | {resNeededInfo.sla.lastMileTravelString}</p>
            <p>₹ {(resNeededInfo.feeDetails.totalFee / 100) || 0}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>GST and Restaurant Charges</p>
            <p>₹ {(itemTotalAmount * 0.18).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-base  border-t-2 border-[#000] mt-3 pt-1 font-bold">
            <p>To Pay</p>
            <p>₹ {amountToPay}</p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="pt-[12vh]">
      Cart is empty
      <Footer />
    </div>
    
  )
}

export default Cart;