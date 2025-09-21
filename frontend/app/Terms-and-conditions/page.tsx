"use client";

import React, { useEffect } from 'react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';

const TermsAndConditionsPage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <Header transparent={true} isLoggedIn={false} onLoginClick={handleLoginClick} />

      {/* Main Content */}
      <div className="pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Terms & Conditions
            </h1>
          </div>

          {/* Content Block */}
          <div className="bg-gray-800 rounded-2xl p-12 border border-gray-700">
            <div className="space-y-8 text-white">
              {/* A LEGAL DISCLAIMER Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">A LEGAL DISCLAIMER</h2>
                <p className="text-gray-300 leading-relaxed">
                  The information provided here is general guidance for writing Terms & Conditions and is not legal advice. 
                  You should not rely on this information as legal advice. We recommend seeking professional legal counsel 
                  for creating your own Terms & Conditions that are appropriate for your specific business and jurisdiction.
                </p>
              </div>

              {/* TERMS & CONDITIONS - THE BASICS Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">TERMS & CONDITIONS - THE BASICS</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Terms and Conditions (T&C) are legally binding terms that are set by the website owner. 
                    These terms establish the legal relationship between website visitors/customers and the website owner.
                  </p>
                  <p>
                    The specific terms and conditions should be tailored to the needs and nature of each website. 
                    For example, an e-commerce website will have different terms and conditions compared to an 
                    informational website (such as a blog or landing page).
                  </p>
                  <p>
                    Terms and conditions protect the website owner from potential legal exposure, but it's important 
                    to seek local legal advice as regulations may vary by jurisdiction.
                  </p>
                </div>
              </div>

              {/* WHAT TO INCLUDE IN THE T&C DOCUMENT Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">WHAT TO INCLUDE IN THE T&C DOCUMENT</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Common issues addressed in T&C documents include user eligibility, payment methods, declarations 
                    about future offering changes, warranties, intellectual property/copyrights, and the website owner's 
                    right to suspend or cancel accounts.
                  </p>
                  <p>
                    To learn more about this, check out our article "Creating a Terms and Conditions Policy".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
