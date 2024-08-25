import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { navigationData } from "@/locals";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsCart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store"; // Adjust the import path as necessary
import { ProfileInfo } from "@/components/common";

const Navbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const { push } = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items from Redux store
  const cartCount = cartItems.length; // Number of items in cart

  const handleLinkSession = (path: string) => {
    push(path);
    setShowDrawer(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      setHeaderVisible(currentScrollTop <= lastScrollTop);
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
    document.body.style.overflow = showDrawer ? "auto" : "hidden";
  };

  const handleLogOut = () => {
    push("/");
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: headerVisible ? 0 : -100,
          opacity: headerVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-[999] ${
          showDrawer ? "bg-dark-slate" : "bg-dark-blue/10"
        }`}
      >
        <section className="bg-white text-black shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-3 px-4 md:px-0">
          <div className="main-container flex justify-between items-center">
            <div
              className="flex group items-center gap-2 text-2xl font-semibold cursor-pointer hover:gap-5 common-transition hover:text-light-yellow"
              onClick={() => push("/")}
            >
              <motion.p
                initial={{ x: 20 }}
                animate={!showDrawer ? { x: 0 } : { x: 10 }}
                transition={{ duration: 0.3 }}
              >
                H
              </motion.p>
              <motion.p
                initial={{ x: 40 }}
                animate={!showDrawer ? { x: 0 } : { x: 20 }}
                transition={{ duration: 0.4 }}
              >
                Q
              </motion.p>
              <motion.p
                initial={{ x: 60 }}
                animate={!showDrawer ? { x: 0 } : { x: 30 }}
                transition={{ duration: 0.5 }}
              >
                .
              </motion.p>
            </div>
            <div className="hidden md:flex gap-8">
              {navigationData.map((curLabel) => (
                <div
                  onClick={() => handleLinkSession(curLabel.link)}
                  key={curLabel.label}
                  className="tracking-wider cursor-pointer common-transition"
                >
                  <h1>{curLabel.label}</h1>
                </div>
              ))}
            </div>
            <div className="md:hidden flex items-center gap-4">
              <Link href="/cart">
                <button className="relative common-transition rounded-full flex items-center">
                  <BsCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-500 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
              <button
                className="text-2xl focus:outline-none"
                onClick={toggleDrawer}
              >
                {showDrawer ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
            <div className="hidden md:flex justify-end gap-6 items-center">
              <Link href="/cart">
                <button className="relative common-transition rounded-full">
                  <BsCart className="text-xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-500 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
              <ProfileInfo fullName="John Doe" handleLogOut={handleLogOut} />
              {/* <button className="common-transition nav-btn uppercase" onClick={() => push("/")}>
                login
              </button> */}
            </div>
          </div>
        </section>
      </motion.header>

      <AnimatePresence>
        {showDrawer && (
          <motion.div
            initial={{ translateY: "40vh", opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: "40vh", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 h-screen overflow-hidden left-0 right-0 z-[300] bg-dark-slate bg-opacity-90 backdrop-blur-md text-black"
          >
            <div className="w-full h-full flex items-center justify-center">
              <ul className="flex flex-col gap-6 w-full pl-10 pb-28 h-full justify-end">
                {navigationData.map((curLabel, i) => (
                  <motion.li
                    key={curLabel.label}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.2 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="w-fit flex justify-center flex-col"
                  >
                    <span
                      onClick={() => handleLinkSession(curLabel.link)}
                      className="w-fit text-4xl text-milk/60 common-transition cursor-pointer"
                    >
                      {curLabel.label}
                    </span>
                  </motion.li>
                ))}
                <motion.li
                  key="login"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: navigationData.length * 0.2,
                  }}
                  exit={{ opacity: 0, y: 100 }}
                  className="w-fit flex justify-center flex-col"
                >
                  <button className="nav-btn uppercase w-fit">Log Out</button>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
