import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">Privacy Policy</h1>
      <p className="mb-4">
        At <span className="font-semibold">CompressClick</span>, we value your privacy and are committed to protecting your
        personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We may collect the following types of information:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal information (such as name and email) when you contact us.</li>
        <li>Uploaded files for compression (processed temporarily and deleted automatically).</li>
        <li>Usage data and analytics to improve our services.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <p className="mb-4">
        We use your data to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Enhance and personalize your experience.</li>
        <li>Ensure secure and efficient file processing.</li>
        <li>Improve our platform based on usage insights.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Data Security</h2>
      <p className="mb-4">
        We prioritize security and implement industry-standard measures to protect your data. Files uploaded for compression are automatically deleted after processing.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party analytics and advertising services to improve our platform. These services may collect anonymous data to optimize performance and user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to request access to, update, or delete your personal data. If you have any privacy-related concerns, please contact us at
        <a href="mailto:parshotamrughanii@gmail.com" className="text-blue-500 underline"> parshotamrughanii@gmail.com</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy periodically. Any changes will be reflected on this page with an updated revision date.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
