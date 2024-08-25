import React from "react";
import Head from "next/head";
import PublicLayout from "@/layouts";

const TermsAndConditions = () => {
  return (
    <PublicLayout>
      <section className="main-container top-spacing bottom-spacing prose prose-sm">
        <h1>Terms and Conditions</h1>
        <p>Last updated: August 25, 2024</p>

        <p>
          Welcome to Home Quest! These Terms and Conditions ("Terms") govern
          your use of our website and services. By accessing or using Home
          Quest's website and services, you agree to comply with these Terms.
          Please read them carefully.
        </p>

        <h2>1. Definitions</h2>
        <p>
          In these Terms, "Home Quest", "we", "us", and "our" refer to Home
          Quest, and "you" and "your" refer to you as the user of our website
          and services.
        </p>

        <h2>2. Use of Our Website</h2>
        <p>
          By accessing our website, you agree to use it in accordance with these
          Terms and all applicable laws and regulations. You must not use the
          website for any unlawful or prohibited purpose.
        </p>

        <h3>2.1. Account Creation</h3>
        <p>
          If you create an account on our website, you are responsible for
          maintaining the confidentiality of your account credentials and for
          all activities that occur under your account. Notify us immediately if
          you suspect any unauthorized use of your account.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          All content on our website, including text, graphics, logos, and
          images, is the property of Home Quest or its licensors and is
          protected by intellectual property laws. You may not reproduce,
          distribute, or create derivative works from our content without our
          express permission.
        </p>

        <h2>4. User-Generated Content</h2>
        <p>
          You may have the opportunity to submit content to our website, such as
          comments or reviews. By submitting content, you grant us a
          non-exclusive, royalty-free, perpetual, and worldwide license to use,
          display, and distribute your content. You are responsible for the
          content you submit and must ensure it complies with all applicable
          laws and regulations.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Home Quest is not liable for
          any indirect, incidental, special, or consequential damages arising
          out of or related to your use of our website or services. Our total
          liability for any claim is limited to the amount paid by you for the
          use of our services.
        </p>

        <h2>6. Indemnification</h2>
        <p>
          You agree to indemnify and hold Home Quest and its affiliates harmless
          from any claims, losses, liabilities, damages, costs, or expenses
          (including reasonable attorneys' fees) arising out of or related to
          your use of our website or services, your violation of these Terms, or
          your infringement of any rights of another party.
        </p>

        <h2>7. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Any changes will be
          posted on this page with an updated effective date. Your continued use
          of our website after any changes constitutes your acceptance of the
          new Terms.
        </p>

        <h2>8. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of the jurisdiction in which Home Quest operates. Any disputes arising
          under or in connection with these Terms shall be subject to the
          exclusive jurisdiction of the courts in that jurisdiction.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:info@homequest.com">info@homequest.com</a>.
        </p>

        <h2>10. Miscellaneous</h2>
        <p>
          These Terms constitute the entire agreement between you and Home Quest
          regarding your use of our website and services. If any provision of
          these Terms is found to be invalid or unenforceable, the remaining
          provisions will continue in full force and effect.
        </p>
      </section>
    </PublicLayout>
  );
};

export default TermsAndConditions;
