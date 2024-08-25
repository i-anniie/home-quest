import { offerCardSchema } from "@/locals";
import { motion } from "framer-motion";

const OfferSection = () => {
  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true, amount: 0.2 },
  });

  return (
    <section className="main-container container-top container-bottom">
      <div className="grid grid-cols-4 gap-2 md:gap-8">
        {offerCardSchema.map((curCard, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-4"
            {...fadeInUp(i * 0.2)}
          >
            {curCard.icons}
            <p className="text-xs md:text-base text-center">{curCard.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OfferSection;
