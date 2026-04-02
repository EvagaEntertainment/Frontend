import { Helmet } from 'react-helmet-async'
import SliderNew from '../components/Slider/SliderNew'
import NewCatgeories from '../components/NewCatgeories/HowItWorks'
import HowItWorks from '../components/HowItWorks/HowItWorks'
import WhyPeopleTrustEvaga from '../components/WhyPeopleTrustEvaga/WhyPeopleTrustEvaga'
import RealStories from '../components/RealStories/RealStories'
import ExpertSection from '../components/ExpertSection/ExpertSection'
import FAQSection from '../components/FAQSection/FAQSection'
import BookingSection from '../components/BookingSection/BookingSection'


function HomepageNew() {
  return (
    <>
      <Helmet>
        <title>Eevagga | India's Premium Birthday Celebration Platform</title>
        <meta
          name="description"
          content="Discover India's first premium birthday celebration platform. We offer curated birthday experiences, products, and services to make your birthday special."
        />
        <meta
          name="keywords"
          content="birthday party planning, birthday decorators, birthday gifts, premium birthday experiences, Eevagga, birthday packages"
        />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Eevagga | India's Premium Birthday Celebration Platform" />
        <meta
          property="og:description"
          content="Discover India's first premium birthday celebration platform. We offer curated birthday experiences, products, and services to make your birthday special."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col ">
        <SliderNew/>
        <NewCatgeories/>
        <WhyPeopleTrustEvaga/>
        <RealStories/>
        <HowItWorks/>
        <BookingSection/>
        <ExpertSection/>
        {/* <WhyChooseUs/> */}
        {/* <OurWorkSection/> */}
        <FAQSection/>
    </div>
    </>
  )
}

export default HomepageNew