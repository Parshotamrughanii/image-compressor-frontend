import React from "react";
import Head from "next/head";

const ContactUs = () => {
  return (
    <>
      <Head>
        <title>Contact Us - CompressClick</title>
        <meta
          name="description"
          content="Get in touch with CompressClick for any queries or support. We are here to help!"
        />
        <meta name="keywords" content="contact CompressClick, support, help, inquiries" />
        <meta name="author" content="CompressClick Team" />
      </Head>
      <div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-200">
        <h1 className="text-3xl font-bold mb-4 text-blue-500">Contact Us</h1>
        <p className="mb-4">
          Have questions or need support? Feel free to reach out to us.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Email Support</h2>
        <p className="mb-4">
          You can email us at:
          <a
            href="mailto:parshotamrughanii@gmail.com"
            className="text-blue-500 underline ml-1"
          >
            parshotamrughanii@gmail.com
          </a>
        </p>
        {/* <h2 className="text-2xl font-semibold mt-6 mb-2">Social Media</h2>
        <p className="mb-4">Follow us for updates and support:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <a href="https://twitter.com/compressclick" className="text-blue-500 underline">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://facebook.com/compressclick" className="text-blue-500 underline">
              Facebook
            </a>
          </li>
        </ul> */}
        <h2 className="text-2xl font-semibold mt-6 mb-2">Location</h2>
        <p className="mb-4">We are based remotely, dedicated to serving users worldwide.</p>
      </div>
    </>
  );
};

export default ContactUs;
