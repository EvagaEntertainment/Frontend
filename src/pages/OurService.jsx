import React from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import HeroSection from "../components/HeroSection/HeroSection";
import FAQSection from "../components/FAQSection/FAQSection";
import OurWorkSection from "../components/OurWorkSection/OurWorkSection";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import ServicesSection from "../components/ServiceWeOffer/ServiceWeOffer";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import OurServiceCta from "../components/OurServiceCta/OurServiceCta";

function OurService() {
  return (
    <>
      <Helmet>
        <title>Professional Birthday Services | Eevagga</title>
        <meta
          name="description"
          content="Explore our professional birthday celebration services. From stunning decorations to expert entertainment, we bring your dream celebration to life."
        />
        <meta
          name="keywords"
          content="birthday decorations, event management, birthday themes, professional party planning, Eevagga services, party entertainment"
        />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Professional Birthday Services | Eevagga" />
        <meta
          property="og:description"
          content="Explore our professional birthday celebration services. From stunning decorations to expert entertainment, we bring your dream celebration to life."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Breadcrumbs />
      <div>
      <HeroSection />
      <ServicesSection/>
      <WhyChooseUs />
      <OurWorkSection />
       <HowItWorks/>
       <OurServiceCta/>
      <FAQSection />
    </div>
    </>
  );
}

export default OurService;
