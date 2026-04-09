'use client';
import React from 'react'
import FeedbackForm from '../components/Forms/FeedbackForm'
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

function FeedBack() {
  return (
    <>
      <Breadcrumbs />
      <div>
          <FeedbackForm/>
      </div>
    </>
  )
}

export default FeedBack