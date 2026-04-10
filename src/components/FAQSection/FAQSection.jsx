'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import AccordionCard from "../Cards/AccordionCard";

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const faqData = [
    {
      question: "What is Eevagga?",
      answer:
        "Eevagga is a premium birthday celebration platform designed to make planning birthdays simple, beautiful, and stress-free.\nFrom curated birthday decorations and full-service event planning to thoughtfully designed celebration products and gifts, Eevagga brings everything needed for a memorable birthday into one place.",
    },
    {
      question: "What types of birthday celebrations does Eevagga organize?",
      answer:
        "Eevagga specializes in a wide range of birthday celebrations, including:\n• Kids birthday parties\n• Milestone birthdays\n• Surprise birthday setups\n• Home birthday decorations\n• Venue birthday celebrations\n• Themed birthday parties\nOur team focuses on creating premium and thoughtfully designed birthday experiences tailored to your celebration.",
    },
    {
      question: "Can I book a complete birthday celebration through Eevagga?",
      answer:
        "Yes.\nWith Eevagga Birthdays, you can book end-to-end birthday planning, including:\n• décor and theme setup\n• photography and videography\n• entertainment and activities\n• stage and event setup\n• catering coordination\n• on-ground event management\nOur team ensures every detail is professionally handled so you can enjoy the celebration.",
    },
    {
      question: "Does Eevagga offer custom birthday themes?",
      answer:
        "Absolutely.\nWe offer both curated themes and custom-designed birthday setups. If you have a specific concept, color palette, or theme in mind, our team can design a celebration experience around it.",
    },
    {
      question: "What is the Eevagga Gift Studio?",
      answer:
        "The Eevagga Gift Studio offers curated birthday gifts and personalized hampers designed to make celebrations more meaningful.\nFrom thoughtful gift boxes to customized birthday keepsakes, we help customers discover unique gifting options for every celebration.",
    },
    {
      question: "What are Eevagga Celebration Products?",
      answer:
        "Eevagga Celebration Products are premium DIY birthday decoration kits and celebration products designed by event professionals.\nThese products allow anyone to create beautiful birthday setups at home with ease.\nThey are also available through our website and online marketplaces such as Amazon and Flipkart.",
    },
    {
      question: "Do you only operate in Bangalore?",
      answer:
        "Currently, most of our event services are available in Bangalore, while our celebration products can be delivered across India through online platforms.\nAs Eevagga grows, we plan to expand our celebration services to more cities.",
    },
    {
      question: "What is the Eevagga Experience Centre?",
      answer:
        "The Eevagga Experience Centre is a physical space where customers can explore birthday themes, see décor concepts in person, and plan their celebrations with expert guidance.\nIt allows customers to experience celebration ideas before booking their event.",
    },
    {
      question: "How far in advance should I book a birthday celebration?",
      answer:
        "We recommend booking your celebration at least 22 days in advance to ensure the best availability for themes, venues, and services.\nFor larger or customized birthday events, earlier booking is always beneficial.",
    },
    {
      question: "Can Eevagga help with small home birthday setups?",
      answer:
        "Yes.\nEevagga offers solutions for both intimate home celebrations and large birthday events.\nFrom simple decoration setups to complete birthday planning, we can tailor the experience to your needs.",
    },
    {
      question: "Do you offer last-minute birthday setups?",
      answer:
        "Depending on availability, our team can assist with last-minute birthday decoration setups or celebration products.\nYou can contact our team directly to explore available options.",
    },
    {
      question: "How can I book a birthday celebration with Eevagga?",
      answer:
        "You can book through:\n• the Eevagga website\n• contacting our team directly\nOur team will guide you through themes, packages, and customization options to help you plan the perfect birthday celebration.",
    },
  ];

  const handleToggle = (panelIndex) => (_, isExpanded) => {
    setExpandedIndex(isExpanded ? panelIndex : -1);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f1f8f5]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-primary text-4xl font-normal  mb-6">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {faqData.map((item, index) => (
            <AccordionCard
              key={index}
              sn={index + 1}
              title={item.question}
              summary={item.answer}
              panelId={`faq-${index}`}
              isExpanded={expandedIndex === index}
              onToggle={handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
