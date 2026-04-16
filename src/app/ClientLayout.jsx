'use client';
import { usePathname } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";

import { useAuth } from '../context/AuthContext';
import { fetchUserWishlist } from '../context/redux/slices/wishlistSlice';
import { internalRoutes } from '../utils/internalRoutes';

import DynamicNav from '../components/navbar/DynamicNav';
import Navbar from '../components/navbar/Navbar';
import GlobalEventHandlers from '../utils/GlobalEventHandlers';
import WhatsAppButton from '../utils/WhatsAppButton';
import StickyAd from '../utils/StickyAd';
import GoToTop from '../GoToTop';
import Footer from '../components/Footer/Footer';
import UTMTracker from './UTMTracker';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const { allWishlist } = useSelector((state) => state.wishlist);

  const noNavbarPaths = [
    internalRoutes.vendorDashboard,
    internalRoutes.vendorProfile,
    internalRoutes.vendorServices,
    internalRoutes.vendorOrders,
    internalRoutes.vendorOrderDeatil,
    internalRoutes.vendorSupport,
    internalRoutes.vendorCommunity,
    internalRoutes.vendorCreateservice,
    internalRoutes.vendorEditservice,
  ];

  const noFooterPaths = [
    internalRoutes.vendorDashboard,
    internalRoutes.vendorProfile,
    internalRoutes.vendorServices,
    internalRoutes.vendorOrders,
    internalRoutes.vendorOrderDeatil,
    internalRoutes.vendorSupport,
    internalRoutes.vendorCommunity,
    internalRoutes.vendorCreateservice,
    internalRoutes.vendorEditservice,
    internalRoutes.adminSignup,
    internalRoutes.adminLogin,
    internalRoutes.adminForgotPassword,
    internalRoutes.adminDashboard,
    internalRoutes.vendorForgotPassword,
    internalRoutes.vendorLogin,
    internalRoutes.vendorSignup,
  ];

  const noNewNavbarPaths = [
    internalRoutes.vendorOrders,
    internalRoutes.userLogin,
    internalRoutes.adminSignup,
    internalRoutes.adminLogin,
    internalRoutes.vendorLogin,
    internalRoutes.vendorSignup,
    internalRoutes.vendorForgotPassword,
    internalRoutes.userForgotPassword,
    internalRoutes.adminForgotPassword,
    internalRoutes.adminDashboard,
    internalRoutes.interest,
    internalRoutes.vendorDashboard,
    internalRoutes.vendorProfile,
    internalRoutes.vendorServices,
    internalRoutes.vendorOrders,
    internalRoutes.vendorOrderDeatil,
    internalRoutes.vendorSupport,
    internalRoutes.vendorCommunity,
    internalRoutes.vendorCreateservice,
    internalRoutes.vendorEditservice,
  ];

  const noWhatsappPaths = [
    internalRoutes.adminSignup,
    internalRoutes.adminLogin,
    internalRoutes.adminForgotPassword,
    internalRoutes.adminDashboard,
    internalRoutes.interest,
  ];

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_Server === "production") {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    if (
      auth?.isAuthenticated &&
      auth?.role === "user" &&
      allWishlist?.length === 0
    ) {
      dispatch(fetchUserWishlist(userId));
    }
  }, [auth, allWishlist, userId, dispatch]);

  useEffect(() => {
    const preventDefault = (e) => {
      if (!e.target || typeof e.target.closest !== "function") return;
      const isInsideQuill = e.target.closest(".ql-editor") || e.target.closest(".ql-toolbar");
      if (isInsideQuill) return;
      e.preventDefault();
    };

    const events = ["selectstart", "contextmenu", "copy", "cut", "dragstart"];
    events.forEach((event) => document.addEventListener(event, preventDefault, { capture: true }));
    return () => events.forEach((event) => document.removeEventListener(event, preventDefault, { capture: true }));
  }, []);

  return (
    <>
      <Suspense fallback={null}><UTMTracker /></Suspense>
      {noNavbarPaths.includes(pathname) && <DynamicNav />}
      {!noNewNavbarPaths.includes(pathname) && <Navbar />}

      <GlobalEventHandlers>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {!noWhatsappPaths.includes(pathname) && <WhatsAppButton />}
        {!noWhatsappPaths.includes(pathname) && <StickyAd />}
        <GoToTop />
        {children}
        {!noFooterPaths.includes(pathname) && <Footer />}
      </GlobalEventHandlers>
    </>
  );
}