import { motion } from "framer-motion";
import CategoryNewCard from "../Cards/categoryNewCard";
import { internalRoutes } from "../../utils/internalRoutes";

import DecorImage from "../../assets/Decor.jpeg";
import ExperienceCentreImage from "../../assets/Eevagga Experience centre.jpeg";
import FeastStudioImage from "../../assets/Eevagga Feast Studio.jpeg";
import GiftStudioImage from "../../assets/Eevagga Gift Studio.jpeg";

function NewCatgeories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const data = [
    {
      image: DecorImage,
      title: "Eevagga Decor",
      text: "Stunning setups that transform your moments into memories.",
      link: `${internalRoutes?.bookingForm}?category=decor`,
    },
    {
      image: GiftStudioImage,
      title: "Eevagga Gift Studio",
      text: "Thoughtful gifts that leave smiles long after the celebration ends.",
      link: `#`,
      disabled: true,
    },
    {
      image: ExperienceCentreImage,
      title: "Eevagga Experience Studio",
      text: "Engaging activities that spark joy and create unforgettable experiences.",
      link: `#`,
      disabled: true,
    },
    {
      image: FeastStudioImage,
      title: "Eevagga Feast Studio",
      text: "Delicious food that brings people together and makes every bite count.",
      link: `#`,
      disabled: true,
    },
  ];

  return (
    <motion.div
      className="flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }} // Changed margin to 0px
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col items-center justify-center max-w-4xl w-full mb-12 space-y-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Main Title */}
        <motion.h2
          className="text-primary text-4xl font-normal text-center"
          variants={itemVariants}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        >
          How it Works?
        </motion.h2>

        {/* Decorative divider */}
        <motion.div
          className="w-24 h-1 bg-accent rounded-full"
          variants={itemVariants}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        />

        {/* Subheading */}
        <motion.h3
          className="text-textGray text-xl md:text-xl font-normal text-center"
          variants={itemVariants}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          Choose Your Celebration
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-textGray text-normal text-center max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          Pick an event type and find the perfect package in seconds
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
      >
        {data.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
            className="col-span-1"
          >
            <CategoryNewCard
              imageUrl={item.image}
              title={item.title}
              text={item.text}
              link={item.link}
              disabled={item.disabled}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default NewCatgeories;
