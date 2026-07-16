import { internalRoutes } from "./internalRoutes";
export const footerMenuItems = {
  leftMenu: [
    { label: "About Eevagga", path: internalRoutes.aboutUs },
    // { label: "Careers", path: internalRoutes.careers },
    { label: "Press Releases", path: internalRoutes.pressReleases },
    { label: "Blog", path: internalRoutes.blog },
    { label: "Customer Service", path: internalRoutes.customerService },
    // { label: "Wishlist", path: internalRoutes.wishlist },
    // { label: "Advertise with Us", path: internalRoutes.advertiseWithUs },
    // { label: "Grievance Officer", path: internalRoutes.grievanceOfficer },
    // { label: "Popular Searches", path: internalRoutes.popularSearches },
  ],
  midMenu: [
    // { label: "Eevagga Community", path: internalRoutes.evagaCommunity },
    // { label: "Become a Vendor", path: internalRoutes.vendorSignup },
    // { label: "Vendor Login", path: internalRoutes.vendorLogin },
    { label: "Cancellation Policy", path: internalRoutes.cancellationPolicy },
    { label: "Feedback Form", path: internalRoutes.feedbackForm },
    { label: "Terms and Condition", path: internalRoutes.TermsAndConditions },
    { label: "Privacy Policy", path: internalRoutes.privacyAndPolicy },
  ],
  rightMenu: [
    { label: "All Celebrations", path: internalRoutes.viewAllPage },
    { label: "Birthday Planner Bangalore", path: "/birthday-planner-bangalore" },
    { label: "Birthday Decoration", path: "/birthday-decoration-bangalore" },
    { label: "Kids Birthday Planner", path: "/kids-birthday-planner-bangalore" },
    { label: "Luxury Birthday Planner", path: "/luxury-birthday-planner-bangalore" },
    { label: "Premium Birthday Planner", path: "/premium-birthday-planner" },
    { label: "Premium House Warming", path: "/premium-house-warming-planner" },
    { label: "Premium Baby Shower", path: "/premium-baby-shower-planner" },
  ],
};
