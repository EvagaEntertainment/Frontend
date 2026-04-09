'use client';
import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

function TermsAndConditions() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <>
      <Breadcrumbs />
      <motion.div
        className="lg:max-w-[70%] mx-auto p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="lg:text-3xl text-2xl font-semibold mb-4 text-primary">
          TERMS AND CONDITIONS
        </h1>
        <p className="text-textGray font-semibold mb-2">Effective Date: 8th April 2024</p>
        <p className="text-textGray font-semibold mb-6">Website Covered: www.eevagga.com</p>
        <p className="text-textGray mb-6">
          Welcome to Eevagga by Evaga Entertainment Pvt. Ltd. (“Eevagga,” “we,” “us,” or “our"). These Terms and Conditions (“Terms") govern your use of our website https://www.eevagga.com and the services offered through it (collectively, the “Service"). By accessing or using our Service, you agree to be bound by these Terms. If you do not agree, please do not use our Service.
        </p>

        <div className="space-y-8 text-textGray">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Definitions</h2>
            <ul className="list-disc pl-8">
              <li>“User” means any individual or entity using the Service.</li>
              <li>“Content” refers to all information, data, text, graphics, images, audio, video, software, or other materials provided on the Service.</li>
              <li>“Service” means the platform, website, and any services provided by Eevagga.</li>
              <li>“Vendor” means any third party registered with Eevagga to provide event-related services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
            <p>You confirm that you are at least 18 years old or have reached the age of majority in your jurisdiction, whichever is higher, and have full legal capacity to enter into these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Use of Service</h2>
            <p>3.1 You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else’s use and enjoyment of the Service.</p>
            <p>3.2 You shall not:</p>
            <ul className="list-disc pl-8">
              <li>Use the Service in any way that causes, or may cause, damage to the Service or impairment of availability or accessibility.</li>
              <li>Use automated scripts to collect data or content from the Service without permission.</li>
              <li>Upload or transmit viruses, malware, or any code intended to disrupt or damage the Service.</li>
              <li>Attempt to gain unauthorized access to any part of the Service or related systems.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Account Registration and Security</h2>
            <p>4.1 Some parts of the Service may require you to register and create an account. You agree to provide accurate, current, and complete information.</p>
            <p>4.2 You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
            <p>4.3 You must notify Eevagga immediately of any unauthorized use or security breach.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Intellectual Property Rights</h2>
            <p>5.1 All Content and materials on the Service, including text, graphics, logos, images, audio clips, video clips, data compilations, and software, are the property of Eevagga or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
            <p>5.2 You agree not to copy, reproduce, distribute, modify, create derivative works from, publicly display, or exploit any Content without prior written permission from Eevagga.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. User Content</h2>
            <p>6.1 Users may post, upload, or submit content (“User Content”) on the Service, including reviews, feedback, and event details.</p>
            <p>6.2 By submitting User Content, you grant Eevagga a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform such content in connection with the Service.</p>
            <p>6.3 You represent and warrant that you own or have all necessary rights to submit the User Content and that it does not infringe or violate any third party rights.</p>
            <p>6.4 Eevagga reserves the right to remove or refuse to publish any User Content that it deems inappropriate, offensive, or violates these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Vendor Services and Transactions</h2>
            <p>7.1 Eevagga acts as a platform connecting users with vendors providing event-related services.</p>
            <p>7.2 All contracts and transactions for services provided by vendors are solely between the user and the vendor.</p>
            <p>7.3 Eevagga is not responsible for the quality, legality, or delivery of vendor services.</p>
            <p>7.4 Payments made via Eevagga may be subject to terms provided by payment processors.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Prohibited Activities</h2>
            <ul className="list-disc pl-8">
              <li>Engage in fraudulent, misleading, or deceptive conduct.</li>
              <li>Violate any applicable laws or regulations.</li>
              <li>Transmit unsolicited or unauthorized advertising or promotional materials (“spam”).</li>
              <li>Harvest or collect personal data of other users without their consent.</li>
              <li>Interfere with or disrupt the security or integrity of the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Privacy</h2>
            <p>Your use of the Service is also governed by our Privacy Policy, which is incorporated herein by reference. Please review it carefully to understand how we collect, use, and protect your information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Third-Party Links and Content</h2>
            <p>The Service may contain links to third-party websites, advertisements, or services. Eevagga does not endorse and is not responsible for such third-party content, products, or services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">11. Disclaimers and Limitation of Liability</h2>
            <p>11.1 The Service is provided “as is” and “as available” without warranties of any kind, express or implied.</p>
            <p>11.2 Eevagga disclaims all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.</p>
            <p>11.3 To the maximum extent permitted by law, Eevagga’s total liability for any claim arising from your use of the Service shall not exceed INR 1,000 or the amount paid by you in the past six months, whichever is lower.</p>
            <p>11.4 Eevagga shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">12. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless Eevagga and its officers, directors, employees, and agents from and against all claims, liabilities, damages, losses, and expenses arising from:</p>
            <ul className="list-disc pl-8">
              <li>Your violation of these Terms.</li>
              <li>Your infringement of any intellectual property or other rights.</li>
              <li>Your negligent or wrongful conduct.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">13. Termination</h2>
            <p>13.1 Eevagga may suspend or terminate your access to the Service at any time without prior notice if you violate these Terms or engage in conduct detrimental to Eevagga or other users.</p>
            <p>13.2 Upon termination, all rights granted to you under these Terms will immediately cease.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">14. Force Majeure</h2>
            <p>Eevagga shall not be liable for any delay or failure in performance due to events beyond its reasonable control, including but not limited to natural disasters, acts of government, war, terrorism, or technical failures.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">15. Governing Law and Jurisdiction</h2>
            <p>These Terms shall be governed by and construed under the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts located in Bangalore, Karnataka.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">16. Changes to Terms</h2>
            <p>We reserve the right to modify or update these Terms at any time without prior notice. Your continued use of the Service after such changes constitutes acceptance of the updated Terms. Please review these Terms periodically.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">17. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <p>Eevagga by Evaga Entertainment Pvt. Ltd.</p>
            <p>Email: info@evagaentertainment.com</p>
            <p>Phone: +91 8296157611</p>
            <p>Address: Prestige Atlanta, 1A Koramangala, Bangalore, Karnataka - 560038, India</p>
          </section>
        </div>
      </motion.div>
    </>
  );
}

export default TermsAndConditions;
