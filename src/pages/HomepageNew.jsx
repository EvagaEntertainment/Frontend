import SliderNew from '../components/Slider/SliderNew'
import NewCatgeories from '../components/NewCatgeories/HowItWorks'
import HowItWorks from '../components/HowItWorks/HowItWorks'
import WhyPeopleTrustEvaga from '../components/WhyPeopleTrustEvaga/WhyPeopleTrustEvaga'
import RealStories from '../components/RealStories/RealStories'
import ExpertSection from '../components/ExpertSection/ExpertSection'
import FAQSection from '../components/FAQSection/FAQSection'
import BookingSection from '../components/BookingSection/BookingSection'
import FloatingVideoWidget from '../utils/FloatingVideoWidget'

function HomepageNew() {
  return (
    <div className='flex flex-col '>
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
        <FloatingVideoWidget/>
    </div>
  )
}

export default HomepageNew