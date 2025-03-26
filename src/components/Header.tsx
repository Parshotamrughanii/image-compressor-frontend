'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
const router = useRouter()
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to hero section
  const scrollToHero = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-[#0f0a1a]/95 shadow-md' 
          : 'bg-white/80 dark:bg-[#0f0a1a]/90'
      } backdrop-blur-md border-b border-gray-200 dark:border-[#2a1f40] transition-all duration-300`}
      role="banner"
      aria-label="Main navigation"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-2"
              aria-label="CompressClick Home"
              itemProp="url"
            >
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                C
              </div>
              <span 
                className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent"
                itemProp="name"
              >
                CompressClick
              </span>
            </Link>
          </div>
          <nav 
            className="hidden md:flex items-center space-x-8"
            aria-label="Main navigation"
            role="navigation"
          >
            <Link 
              href="#features" 
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
              itemProp="url"
              aria-label="Features section"
            >
              <span itemProp="name">Features</span>
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
              itemProp="url"
              aria-label="How It Works section"
            >
              <span itemProp="name">How It Works</span>
            </Link>
            <Link 
              href="#faq" 
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
              itemProp="url"
              aria-label="FAQ section"
            >
              <span itemProp="name">FAQ</span>
            </Link>
            <Link 
              href="/terms-and-conditions" 
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
              itemProp="url"
              aria-label="Terms And Conditions"
            >
              <span itemProp="name">Terms And Condtions</span>
            </Link>
            <Link 
              href="/privacy-policy" 
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
              itemProp="url"
              aria-label="Privacy Policy"
            >
              <span itemProp="name">Privacy Policy</span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
              itemProp="url"
              aria-label="About"
            >
              <span itemProp="name">About Us</span>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <button 
              onClick={()=>router.push('/contact')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
              aria-label="Get Started with CompressClick"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
