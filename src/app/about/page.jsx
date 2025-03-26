import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-blue-500">About Us</h1>
      <p className="mb-4">
        Welcome to <span className="font-semibold">CompressClick</span>, your go-to platform for fast and efficient
        file compression. Our mission is to provide a simple, secure, and
        reliable way to reduce file sizes without compromising quality.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">Why Choose Us?</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Fast and high-quality compression for images and PDFs.</li>
        <li>100% free and easy to use with no software installation required.</li>
        <li>Secure processing with automatic file deletion after compression.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Vision</h2>
      <p className="mb-4">
        We believe in making digital file management seamless. Our goal is to
        empower users with tools that optimize storage, speed up sharing, and
        enhance productivity.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Commitment</h2>
      <p className="mb-4">
        At CompressClick, we prioritize user experience, security, and
        efficiency. We continuously strive to improve our platform to meet
        the evolving needs of our users.
      </p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-4">
        Have any questions or feedback? Reach out to us at
        <a href="mailto:parshotamrughanii@gmail.com" className="text-blue-500 underline"> parshotamrughanii@gmail.com</a>.
      </p>
    </div>
  );
};

export default AboutUs;