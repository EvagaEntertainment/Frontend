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
    </div>
  )
}

export default HomepageNew