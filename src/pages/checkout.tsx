import { AddressForm } from "@/components/cart";
import PublicLayout from "@/layouts";
import { selectFinalPrice } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const finalPrice = useSelector((state: RootState) => selectFinalPrice(state));

  return (
    <PublicLayout>
      <section className="main-container pt-16">
        <div className="container-top flex flex-col gap-2">
          <div className="p-4 shadow-md">
            <h1 className="">
              <span className="font-bold text-lg">Total Price: {""}</span>$
              {finalPrice.toFixed(2)}
            </h1>
          </div>
          <AddressForm />
        </div>
      </section>
    </PublicLayout>
  );
};

export default Checkout;
