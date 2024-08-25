import PublicLayout from "@/layouts";
import React, { useState, useMemo } from "react";
import data from "@/locals/data.json";
import { CommonBanner, FilterProduct, ProductCard } from "@/components/common";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import Swal from "sweetalert2";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";

export interface CartItem {
  id: string;
  img: string;
  title: string;
  location: string;
  price: number;
  quantity: number; 
}

const Properties = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const allProductsData = data.allProductsData;

  const [filteredData, setFilteredData] = useState(allProductsData);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filterParams, setFilterParams] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bed: ""
  });

  // Calculate unique options for filters
  const locations = useMemo(
    () =>
      Array.from(new Set(allProductsData.map((product) => product.location))),
    [allProductsData]
  );

  const types = useMemo(
    () => Array.from(new Set(allProductsData.map((product) => product.type))),
    [allProductsData]
  );

  const beds = useMemo(
    () =>
      Array.from(
        new Set(allProductsData.map((product) => parseInt(product.bed)))
      ),
    [allProductsData]
  );

  // Calculate price range options
  const prices = useMemo(() => {
    const priceNumbers = allProductsData.map((product) =>
      parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
    );
    const minPrice = Math.min(...priceNumbers);
    const maxPrice = Math.max(...priceNumbers);
    const priceOptions = Array.from(
      new Set([
        minPrice,
        maxPrice,
        minPrice + (maxPrice - minPrice) / 3,
        minPrice + (2 * (maxPrice - minPrice)) / 3,
        maxPrice - (maxPrice - minPrice) / 3,
        maxPrice - (2 * (maxPrice - minPrice)) / 3,
      ])
    ).sort((a, b) => a - b);
    return { min: minPrice, max: maxPrice, options: priceOptions };
  }, [allProductsData]);

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

  const handleFilter = () => {
    const { location, type, minPrice, maxPrice, bed } = filterParams;

    const filtered = allProductsData.filter((product) => {
      const productPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      return (
        (!location || product.location === location) &&
        (!type || product.type === type) &&
        (!minPrice || productPrice >= parseFloat(minPrice)) &&
        (!maxPrice || productPrice <= parseFloat(maxPrice)) &&
        (!bed || parseInt(product.bed) === parseInt(bed))
      );
    });

    setFilteredData(filtered);
    setFiltersApplied(true);
  };

  const handleRemoveFilters = () => {
    setFilteredData(allProductsData);
    setFiltersApplied(false);
    setFilterParams({
      location: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      bed: ""
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
        delayChildren: 0.2, // Delay before the animation starts
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    whileInView: { opacity: 1, y: 0 },
  };

  return (
    <PublicLayout>
      <section className="pt-16">
        <CommonBanner title="Properties" image="/leadpage/heroSlider1.jpg" />
      </section>
      <section className="main-container container-top container-bottom space-y-6 text-black">
        <FilterProduct
          locations={locations}
          types={types}
          beds={beds}
          prices={prices}
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          onFilter={handleFilter}
          onRemoveFilters={handleRemoveFilters}
          filtersApplied={filtersApplied}
        />
        <div className="flex items-center justify-between">
          <div>Sorting field</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleFilter}
              className="common-transition btn-primary h-fit w-fit"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleRemoveFilters}
              className={`h-fit w-fit common-transition p-2 bg-red-500 text-white  hover:text-white border rounded-sm border-red-500 py-2 px-4 ${
                !filtersApplied
                  ? "cursor-not-allowed bg-red-500/70"
                  : "hover:bg-red-600"
              }`}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <motion.div
          className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {filteredData.length ? (
            filteredData.map((curData, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                transition={{ duration: 0.5, delay: i * 0.4 }} // Apply delay of 0.4s
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ProductCard
                  data={curData}
                  handleAddToCart={handleAddToCart}
                  isInCart={isInCart(curData.id)}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 flex items-center justify-center h-[calc(100vh-26rem)] md:h-[calc(100vh-20rem)]">
              No properties found.
            </div>
          )}
        </motion.div>
      </section>
    </PublicLayout>
  );
};

export default Properties;
