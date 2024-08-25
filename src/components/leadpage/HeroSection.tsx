import { heroSliderImgSchema, heroSliderSchema, heroStatsData } from "@/locals";
import { useRef, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { BiPlus } from "react-icons/bi";

const heroSliderData = heroSliderImgSchema.map((imgData, index) => ({
  ...imgData,
  ...heroSliderSchema[index],
}));

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  return (
    <section className="relative">
      <Slider ref={sliderRef} {...settings}>
        {heroSliderData.map((curData, i) => (
          <section className="lg:h-screen md:h-[500px] h-[350px]" key={i}>
            <div className="flex w-full h-full items-center justify-center">
              <img
                src={curData.img}
                alt={curData.title}
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        ))}
      </Slider>
      <TextArea curData={heroSliderData[currentIndex]} />
    </section>
  );
};

const TextArea = ({ curData }: any) => {
  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay },
  });

  return (
    <div className="absolute top-0 left-0 lg:h-screen md:h-[500px] h-[350px] w-full flex justify-center items-center bg-black/50 pt-14 md:pt-16">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="main-container flex flex-col items-center gap-4 md:gap-6 lg:gap-8 text-white w-full">
          <div className="flex flex-col items-center gap-2">
            <motion.h1
              {...fadeInUp(0)}
              className="text-2xl md:text-4xl lg:text-5xl font-bold"
            >
              {curData.title}
            </motion.h1>
            <motion.p
              {...fadeInUp(0.2)}
              className="text-sm md:text-base lg:text-lg w-full lg:w-2/3 md:w-3/4 text-center"
            >
              {curData.description}
            </motion.p>
          </div>
          <motion.button
            {...fadeInUp(0.4)}
            className="py-2 px-4 text-sm md:text-base bg-white text-black capitalize rounded-md"
          >
            Get in touch
          </motion.button>
          <motion.div
            {...fadeInUp(0.6)}
            className="flex items-center gap-2 md:gap-6 lg:gap-8 px-4 py-2 md:px-8 md:py-6 rounded-md backdrop-blur-md"
          >
            {heroStatsData.map((curStat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-2 ${
                  i < heroStatsData.length - 1
                    ? "border-r  pr-2 md:pr-6 lg:pr-8"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <CountUp
                    start={curStat.start}
                    end={curStat.end}
                    duration={curStat.duration}
                    className="text-xl md:text-3xl lg:text-5xl"
                  />
                  <BiPlus className="text-xl md:text-4xl text-yellow-600" />
                </div>
                <h1 className="text-xs md:text-base">{curStat.label}</h1>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
