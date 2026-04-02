import React from 'react'
import FeedbackForm from '../components/Forms/FeedbackForm'
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

function FeedBack() {
  return (
    <>
      <Helmet>
        <title>Feedback Form | Your Voice Matters at Eevagga</title>
        <meta
          name="description"
          content="Share your experience with Eevagga. Your feedback helps us create better birthday celebrations for everyone."
        />
        <meta name="keywords" content="feedback, review, Eevagga feedback, customer voice" />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Breadcrumbs />
      <div>
          <FeedbackForm/>
      </div>
    </>
  )
}

export default FeedBack