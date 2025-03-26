import React from "react";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">Terms and Conditions</h1>
      <p className="mb-4">Last Updated: March 26, 2025</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">By accessing or using CompressClick, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Use of Our Service</h2>
      <p className="mb-4">CompressClick allows users to compress images and PDFs online. You agree not to misuse our service or use it for any illegal activities.</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">3. User Responsibilities</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Do not upload copyrighted or illegal content.</li>
        <li>Ensure you have the right to modify and process the files you upload.</li>
        <li>We are not responsible for any data loss or corruption.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Privacy Policy</h2>
      <p className="mb-4">We do not store your files permanently. Uploaded files are processed and automatically deleted after compression.</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
      <p className="mb-4">CompressClick is provided "as is" without any warranties. We are not liable for any damages arising from your use of our services.</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
      <p className="mb-4">We reserve the right to modify these Terms and Conditions at any time. Continued use of our service constitutes acceptance of the new terms.</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p className="mb-4">If you have any questions regarding these terms, please contact us at <a href="mailto:parshotamrughanii@gmail.com" className="text-blue-500 underline">parshotamrughanii@gmail.com</a>.</p>
    </div>
  );
};

export default Page;
