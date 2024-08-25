import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import PublicLayout from "@/layouts";
import { CommonBanner } from "@/components/common";
import { MdDeleteForever } from "react-icons/md";
import { PriceBreakdown } from "@/components/cart";
import { useRouter } from "next/router";

const TAX_RATE = 0.08; // 8% tax rate
const SERVICE_FEE = 200; // Fixed service fee
const DISCOUNT = 0; // Discount amount (if any)

const Cart = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const calculateTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTax = () => calculateTotalPrice() * TAX_RATE;

  const calculateFinalPrice = () =>
    calculateTotalPrice() + calculateTax() + SERVICE_FEE - DISCOUNT;

  const handleRemove = (id: string) => dispatch(removeFromCart(id));
  const handleCheckout = () => alert("Proceeding to checkout!");
  const handleQuantityChange = (id: string, change: number) =>
    dispatch(updateQuantity({ id, change }));

  return (
    <PublicLayout>
      <section className="pt-16">
        <CommonBanner title="Cart" image="/leadpage/heroSlider2.jpg" />
      </section>
      <section className="main-container container-top container-bottom">
        {cartItems.length === 0 ? (
          <div className="w-full flex items-center justify-center text-lg">
            Cart is empty.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:flex gap-6">
            <div className="col-span-2 flex flex-col gap-4 w-full lg:w-2/3">
              {cartItems.map(
                ({ id, img, title, location, price, quantity }) => (
                  <div
                    key={id}
                    className="grid grid-cols-4 md:grid-cols-5 shadow-md p-4"
                  >
                    <div className="col-span-2 md:col-span-2 flex items-center gap-2">
                      <img
                        src={img}
                        alt={title}
                        className="hidden md:block w-28 h-20 md:w-32 md:h-24 object-cover"
                      />
                      <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <p>{location}</p>
                        <p className="font-bold">${price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleQuantityChange(id, -1)}
                        className="py-1 px-3 bg-gray-300 text-black font-bold rounded-md hover:bg-gray-400"
                        disabled={quantity === 1}
                      >
                        -
                      </button>
                      <p className="text-lg font-bold">{quantity}</p>
                      <button
                        onClick={() => handleQuantityChange(id, 1)}
                        className="py-1 px-3 bg-gray-300 text-black font-bold rounded-md hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                    <div className="hidden md:flex items-center justify-end">
                      <p className="text-lg font-bold">
                        ${(price * quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleRemove(id)}
                        className="text-red-600"
                      >
                        <MdDeleteForever className="text-2xl" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="col-span-2 lg:col-span-1 lg:sticky lg:top-0 h-full flex flex-col gap-4 w-full lg:w-1/3">
              <PriceBreakdown
                cartItems={cartItems}
                calculateTotalPrice={calculateTotalPrice}
                calculateTax={calculateTax}
                calculateFinalPrice={calculateFinalPrice}
                SERVICE_FEE={SERVICE_FEE}
                DISCOUNT={DISCOUNT}
              />
              <button
                onClick={() => {
                  push("/checkout");
                }}
                className="common-transition btn-secondary hover:bg-gray-600 hover:text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </PublicLayout>
  );
};

export default Cart;
