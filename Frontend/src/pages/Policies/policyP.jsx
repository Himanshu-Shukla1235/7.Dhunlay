import React from "react";
import "./policyP.css";

const PolicyPage = () => {
  return (
    <div className="policy-container">
      <h1>DhunLay Policies</h1>

      <section>
        <h2>Privacy Policy</h2>
        <p>
          At Dhunlay, we are committed to safeguarding your privacy. We collect minimal personal information such as your name, email address, and payment details solely to provide our services, enhance user experience, and communicate with our users.
        </p>
        <p>
          Your data is stored securely and never shared with third-party services without your explicit consent, except for essential services like payment gateways (e.g., Razorpay, PhonePe) and analytics tools. You have full control over your personal data, including the ability to access, correct, or delete it by contacting us at support@dhunlay.com.
        </p>
        <p>
          Cookies and tracking technologies are used to personalize content and ads, provide social media features, and analyze traffic. You can manage your cookie preferences through your browser settings.
        </p>
      </section>

      <section>
        <h2>Terms of Service</h2>
        <p>
          By accessing and using Dhunlay, you agree to comply with our terms and policies. Users must be at least 13 years old. Your account and subscription should only be used for personal or authorized professional use.
        </p>
        <p>
          Subscription features are tied to your plan, and misuse such as content redistribution or account sharing may result in suspension. Dhunlay reserves the right to update these terms without prior notice. Continued usage after changes indicates your acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2>Refund Policy</h2>
        <p>
          We value our users and strive to ensure satisfaction. Refunds are only applicable in cases of technical malfunction, duplicate charges, or failed service delivery. Any content consumed or downloaded will not be eligible for a refund.
        </p>
        <p>
          To request a refund, contact our support team within 7 days of the transaction, providing payment details and the reason for the request. Refunds are processed within 7–10 business days if approved.
        </p>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>
          Your data's safety is our priority. Dhunlay implements industry-standard security measures including SSL encryption, regular audits, and secure APIs. All payment transactions are handled through certified and secure payment gateways.
        </p>
        <p>
          We continuously monitor our systems for vulnerabilities and threats. In the event of a data breach, we will notify affected users promptly and take immediate corrective actions.
        </p>
      </section>

      <section>
        <h2>Subscription and Billing</h2>
        <p>
          Dhunlay offers multiple subscription tiers with varying access to features. Users can upgrade, downgrade, or cancel subscriptions at any time through their account dashboard.
        </p>
        <p>
          Billing occurs monthly or annually depending on the plan selected. Invoices and payment confirmations are sent via email. For any billing discrepancies, users must contact support within 3 business days of the charge.
        </p>
      </section>

      {/* <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions regarding these policies or require assistance, you can reach us at:
        </p>
        <ul>
          <li>Email: support@dhunlay.com</li>
          <li>Phone: +91-XXXXXXXXXX</li>
          <li>Address: Dhunlay HQ, Bhopal, Madhya Pradesh, India</li>
        </ul>
      </section> */}
    </div>
  );
};

export default PolicyPage;
