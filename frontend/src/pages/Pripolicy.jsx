import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

const Pripolicy = () => {
      useEffect(() => {
            AOS.init({
              duration: 700, 
            });
          }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 data-aos="zoom-in" className="text-3xl font-bold text-center pt-5 pb-5 text-gray-800 mb-6">Privacy Policy</h1>
      <p data-aos="zoom-in" className="text-xl pt-4 pb-4 text-gray-700 mb-4">
        At <span className="font-semibold">French Elite</span>, we prioritize the privacy and security of our customers. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you interact with our website and services. By using our website, you agree to the terms of this Privacy Policy.
      </p>

      <div className="space-y-6">
        <div data-aos="fade-left" className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Contact Information: Name, email address, phone number, and shipping/billing address.</li>
            <li>Account Information: Username, password, and other information you provide during account creation.</li>
            <li>Payment Information: Payment details such as credit/debit card information, securely processed through third-party payment gateways.</li>
            <li>Browsing Information: IP address, browser type, device type, and browsing behavior on our website (collected via cookies and similar technologies).</li>
          </ul>
        </div>

        <div data-aos="fade-right" className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Process and fulfill your orders.</li>
            <li>Communicate with you about your orders, inquiries, or updates.</li>
            <li>Provide a personalized shopping experience.</li>
            <li>Send promotional offers, newsletters, and updates (if you opt-in).</li>
            <li>Improve our website, services, and customer support.</li>
          </ul>
        </div>

        <div data-aos="fade-left" className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing of Information</h2>
          <p className="text-gray-700">
            We respect your privacy and will not sell or share your personal information with third parties except in the following circumstances:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>To trusted service providers assisting in operations, such as payment processing, delivery, or marketing.</li>
            <li>To comply with legal obligations, enforce our terms of service, or protect our rights.</li>
          </ul>
        </div>

        <div data-aos="fade-right" className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700">
            We use cookies and similar technologies to enhance your browsing experience, analyze site performance, and deliver personalized content. You can manage your cookie preferences through your browser settings.
          </p>
        </div>

        <div data-aos="fade-left" className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Security of Your Information</h2>
          <p className="text-gray-700">
            We implement robust security measures to protect your personal information from unauthorized access, loss, or misuse. While we strive to secure your data, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div data-aos="fade-right" className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
          <p className="text-gray-700">
            You have the right to:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Access, update, or delete your personal information.</li>
            <li>Opt out of receiving promotional communications.</li>
            <li>Request clarification on how your data is being used.</li>
          </ul>
          <p className="mt-4 text-gray-700">To exercise these rights, please contact us at <span className="font-semibold">support@frenchelite.in</span>.</p>
        </div>

        <div data-aos="fade-left" className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Third-Party Links</h2>
          <p className="text-gray-700">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.
          </p>
        </div>

        <div data-aos="fade-right" className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Updates to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with the revised date.
          </p>
        </div>

        <div data-aos="fade-left" className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have questions or concerns about this Privacy Policy or your data, please contact us at:
          </p>
          <p className="text-gray-700">French Elite</p>
          <p className="text-gray-700">Email: <span className="font-semibold">frenchEliteService@gmail.com</span></p>
          <p className="text-gray-700">Phone: <span className="font-semibold">+91 123456789</span></p>
        </div>
      </div>
    </div>
  )
}

export default Pripolicy