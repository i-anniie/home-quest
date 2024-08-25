import React, { useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Slider from "react-slick";
import { ProductCard } from "../common";
import data from "@/locals/data.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/cartSlice";
import { motion } from "framer-motion";

export interface CartItem {
  id: string;
  img: string;
  title: string;
  location: string;
  price: number;
  quantity: number;
}

const FeaturedProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const featuredProductData = data.featuredProductData;
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 834,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd =
    currentIndex === featuredProductData.length - settings.slidesToShow;

  const leftArrow = () => !isAtStart && sliderRef.current?.slickPrev();
  const rightArrow = () => !isAtEnd && sliderRef.current?.slickNext();

  const isInCart = (productId: string): boolean =>
    cartItems.some((item: CartItem) => item.id === productId);

  const handleAddToCart = (product: any) => {
    if (isInCart(product.id)) {
      dispatch(removeFromCart(product.id));
      // Swal.fire({
      //   title: `${product.title} removed from cart!`,
      //   text: "The product has been removed from your cart.",
      //   icon: "info",
      //   confirmButtonText: "OK",
      // });
    } else {
      dispatch(
        addToCart({
          id: product.id,
          img: product.img,
          title: product.title,
          location: product.location,
          price: parseFloat(product.price.replace(/[^0-9.-]+/g, "")),
          quantity: 1,
        })
      );
      // Swal.fire({
      //   title: `${product.title} added to cart!`,
      //   text: "The product has been successfully added to your cart.",
      //   icon: "success",
      //   confirmButtonText: "OK",
      // });
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <section className="bg-gray-100">
      <aside className="main-container top-spacing bottom-spacing">
        <motion.h2
          className="font-semibold text-center text-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          transition={{ delay: 0, duration: 1 }} // Delay is 0 here to start when in view
        >
          Featured Properties
        </motion.h2>
        <motion.p
          className="text-center text-3xl pb-6 py-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          transition={{ delay: 4, duration: 1 }} // Delay is adjusted for this line
        >
          Discover our exclusive properties
        </motion.p>

        <aside className="main-container pt-10 relative">
          <Slider ref={sliderRef} {...settings}>
            {featuredProductData.map((curData, i) => (
              <div className="px-3 py-3" key={i}>
                <ProductCard
                  data={curData}
                  handleAddToCart={handleAddToCart}
                  isInCart={isInCart(curData.id)}
                />
              </div>
            ))}
          </Slider>
          <button
            onClick={leftArrow}
            disabled={isAtStart}
            className={`hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full ${
              isAtStart ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <MdKeyboardArrowLeft className="text-3xl text-white" />
          </button>
          <button
            onClick={rightArrow}
            disabled={isAtEnd}
            className={`hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full ${
              isAtEnd ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <MdKeyboardArrowRight className="text-3xl text-white" />
          </button>
        </aside>
      </aside>
    </section>
  );
};

export default FeaturedProduct;
