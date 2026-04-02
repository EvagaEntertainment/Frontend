import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motion";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

// Define color constants for maintainability
const colors = {
  primary: '#6A1B9A',
  secondary: '#757575',
};

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Eevagga</title>
        <meta
          name="description"
          content="Learn how Eevagga collects, uses, and protects your personal information. Read our comprehensive Privacy Policy."
        />
        <meta name="keywords" content="privacy policy, data protection, Eevagga privacy" />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Breadcrumbs />
      <motion.main
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1, 0.2)}
        className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12"
      >
        {/* Header Section */}
        <motion.header className="mb-12">
          <motion.h1 
            variants={fadeIn('up', 'tween', 0.1, 0.6)}
            className="text-3xl md:text-4xl font-bold mb-2 font-outfit"
            style={{ color: colors.primary }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 'tween', 0.3, 0.6)}
            className="text-base md:text-lg font-inter"
            style={{ color: colors.secondary }}
          >
            Effective Date: April 8th, 2024 | Last updated: May 25th, 2025
          </motion.p>
        </motion.header>

        {/* Policy Sections */}
        <article className="space-y-12">
          {sections.map((section, index) => (
            <motion.section 
              key={section.title}
              variants={fadeIn('up', 'tween', 0.2 + index * 0.1, 0.6)}
              className="space-y-4"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <h2 className="text-xl font-semibold font-outfit" style={{ color: colors.secondary }}>
                {section.title}
              </h2>
              
              {section.content && (
                <motion.p 
                  className="leading-relaxed font-inter"
                  style={{ color: colors.secondary }}
                  variants={fadeIn('up', 'tween', 0.1, 0.4)}
                >
                  {section.content}
                </motion.p>
              )}

              {section.list && (
                <motion.ul 
                  className="list-disc pl-6 space-y-2 font-inter"
                  variants={staggerContainer(0.1, 0.2)}
                >
                  {section.list.map((item, i) => (
                    <motion.li 
                      key={i}
                      variants={fadeIn('up', 'tween', 0.1, 0.4)}
                      style={{ color: colors.secondary }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.section>
          ))}
        </article>

        {/* Contact Section */}
        <motion.section
          variants={fadeIn('up', 'tween', 0.4, 0.6)}
          className="mt-12 pt-8 border-t border-gray-200"
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold mb-6 font-outfit" style={{ color: colors.secondary }}>
            11. Contact Us
          </h2>
          <div className="space-y-3 text-base font-inter" style={{ color: colors.secondary }}>
            <p>Evaga Entertainment Pvt. Ltd.</p>
            <p>
              Email: {' '}
              <a 
                href="mailto:info@evagaentertainment.com" 
                className="hover:text-purple-800 transition-colors font-semibold"
              >
                info@evagaentertainment.com
              </a>
            </p>
            <p>
              Phone: {' '}
              <a 
                href="tel:+9198296157611" 
                className="hover:text-purple-800 transition-colors font-semibold"
              >
                +91 98296157611
              </a>
            </p>
            <p>Address: Prestige Atlanta 1A Koramangala Bangalore 560034</p>
          </div>
        </motion.section>
      </motion.main>
    </>
  );
};

const sections = [
  {
    title: "1. General",
    content: "This website, www.eevagga.com, is operated by Evaga Entertainment Pvt. Ltd. ('We/Our/Us'). We are committed to protecting and respecting your privacy. We collect and process your personal data in accordance with the Information Technology Act, 2000 (21 of 2000) and other applicable national and state laws. Please read this policy carefully to understand our views and practices regarding your personal data."
  },
  {
    title: "2. How We Collect Information",
    content: "We collect information in the following ways:",
    list: [
      "Directly from You: When you visit our website, register, place an order, or communicate with us.",
      "Through Business Interactions: During our interactions with you or your representatives.",
      "From Other Sources: We may receive information from third parties such as public databases, joint marketing partners, or social media platforms."
    ]
  },
  {
    title: "3. Information We Collect",
    content: "We collect various types of information to provide and improve our services:",
    list: [
      "Personal Information: Name, contact details, payment information, and other details you provide.",
      "Technical Information: IP address, browser type, operating system, and usage data collected through cookies and similar technologies.",
      "Transactional Information: Purchase history, preferences, and feedback."
    ]
  },
  {
    title: "4. How We Use Your Information",
    content: "We use the information we collect to:",
    list: [
      "Provide, maintain, and improve our services.",
      "Process transactions and manage your orders.",
      "Personalize your experience and recommend products or services.",
      "Communicate with you about updates, promotions, and customer service matters.",
      "Comply with legal obligations and protect our rights."
    ]
  },
  {
    title: "5. Data Sharing and Transfer",
    content: "We may share your information with:",
    list: [
      "Service Providers: Third parties who perform services on our behalf, such as payment processors, delivery partners, and marketing agencies.",
      "Affiliates and Subsidiaries: Companies within our corporate group.",
      "Legal Authorities: When required to comply with legal obligations or protect our rights."
    ],
    additionalInfo: "We ensure that third parties adhere to data protection principles and process your information in accordance with applicable laws."
  },
  {
    title: "6. Data Security",
    content: "We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
  },
  {
    title: "7. Retention of Data",
    content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy or as required by law."
  },
  {
    title: "8. Links to Third-Party Sites",
    content: "Our website may contain links to third-party websites. Please note that these sites have their own privacy policies, and we do not accept any responsibility or liability for their practices."
  },
  {
    title: "9. Your Rights and Choices",
    content: "You have the right to:",
    list: [
      "Access and correct your personal information.",
      "Request deletion of your data.",
      "Opt-out of marketing communications.",
      "Withdraw consent at any time, where applicable."
    ],
    additionalInfo: "To exercise these rights, please contact us using the details provided below."
  },
  {
    title: "10. Children's Privacy",
    content: "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected such information, we will take steps to delete it."
  },
];

export default PrivacyPolicy;