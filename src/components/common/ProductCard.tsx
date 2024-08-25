import React from "react";
import {
  MdOutlineRemoveShoppingCart,
  MdOutlineKingBed,
  MdOutlineSquareFoot,
} from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";

interface ProductData {
  id: string;
  img: string;
  title: string;
  location: string;
  price: string;
  sqFt: string;
  bed: string;
  washroom: string;
  hallSqFt: string;
  type: string;
  className?: string;
}

interface CardProps {
  data: ProductData;
  handleAddToCart: (product: ProductData) => void;
  isInCart: boolean; // New prop to determine if the item is in the cart
}

const ProductCard: React.FC<CardProps> = ({
  data,
  handleAddToCart,
  isInCart,
}) => {
  return (
    <div className="flex flex-col md:min-h-[20rem] text-black bg-slate-100 rounded-sm shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <div className="relative">
        <img
          className={`h-[12rem] w-full ${data?.className} shadow-md`}
          src={data?.img}
          alt={data?.title}
        />
        <div className="h-full w-full">
          <h1 className="absolute top-4 right-4 text-xs rounded-sm bg-black/70 py-0.5 px-1 text-white">
            Rent
          </h1>
          <div className="absolute bottom-0 left-0 text-white bg-gradient-to-t from-black to-black/10 w-full">
            <div className="pl-4 pb-2 flex flex-col">
              <p className="text-lg font-bold">{data?.price}</p>
              <p className="">{data?.sqFt}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h1>{data?.title}</h1>
        <p>{data?.location}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <MdOutlineKingBed />
            <h1>{data?.bed}</h1>
          </div>
          <div className="flex items-center gap-1">
            <FaShower />
            <h1>{data?.washroom}</h1>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineSquareFoot />
            <h1>{data?.hallSqFt}</h1>
          </div>
        </div>
        <p>{data?.type}</p>
        <div className="flex items-center gap-2 h-10">
          <button
            className="common-transition flex items-center justify-center border border-gray-700 hover:bg-gray-700 hover:text-white rounded-sm w-1/3 h-full"
            onClick={() => handleAddToCart(data)}
          >
            {isInCart ? (
              <MdOutlineRemoveShoppingCart className="text-2xl" />
            ) : (
              <IoIosCart className="text-2xl" />
            )}
          </button>
          <button className="common-transition hover:bg-gray-700 hover:text-white border border-gray-700 rounded-sm w-full h-full">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
