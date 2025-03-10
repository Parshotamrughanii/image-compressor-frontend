'use client';

import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: "Is CompressX free to use?",
      answer: "Yes, CompressX offers a free tier that allows you to compress up to 20 images per day with a file size limit of 5MB each. For higher limits and additional features, we offer premium plans."
    },
    {
      question: "How much can images be compressed?",
      answer: "Our compression algorithm typically reduces file sizes by 50-90% while maintaining visual quality. The exact compression ratio depends on the image type, content, and your selected compression settings."
    },
    {
      question: "What image formats are supported?",
      answer: "CompressX supports all popular image formats including JPG, PNG, WebP, GIF, BMP, and TIFF. You can also convert between formats during compression."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All image processing happens directly in your browser. Your images are never uploaded to our servers, ensuring complete privacy and security of your data."
    },
    {
      question: "Can I compress multiple images at once?",
      answer: "Yes, our batch processing feature allows you to compress multiple images simultaneously, saving you time and effort."
    },
    {
      question: "Will compression affect image quality?",
      answer: "Our intelligent compression algorithms are designed to minimize quality loss while maximizing file size reduction. You can also adjust compression levels to find the perfect balance between quality and file size."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently, CompressX is available as a web application that works on all devices including mobile phones and tablets. A dedicated mobile app is in development and will be released soon."
    },
    {
      question: "How do I get support if I have issues?",
      answer: "We offer support through email and live chat for all users. Premium users get priority support with faster response times."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-white dark:bg-[#0f0a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our image compression service
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 dark:border-[#2a1f40] rounded-lg overflow-hidden transition-all hover:shadow-md"
            >
              <button
                className="w-full flex justify-between items-center p-5 bg-white dark:bg-[#1a1530] hover:bg-gray-50 dark:hover:bg-[#231c40] transition-colors text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-purple-600 dark:text-purple-400 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="p-5 bg-gray-50 dark:bg-[#0f0a1a] border-t border-gray-200 dark:border-[#2a1f40]">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
