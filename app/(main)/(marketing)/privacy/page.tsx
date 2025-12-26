import { FiShield, FiUser, FiCreditCard, FiServer, FiMail } from "react-icons/fi";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4  sm:px-6 lg:px-8 pb-16 pt-32">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <FiShield className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-blue prose-lg mx-auto">
        <section className="mb-12">
          <p className="text-gray-600">
            At OK Taxis, we are committed to protecting your personal data and respecting your privacy. 
            This policy outlines how we collect, use, and safeguard your information in accordance with 
            the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiUser className="mr-2 text-blue-600" />
            Information We Collect
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span><strong>Personal Details:</strong> Name, contact information, pickup and drop-off addresses, payment details.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span><strong>Booking Information:</strong> Journey dates, times, and preferences.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span><strong>Technical Data:</strong> IP address, browser type, and device information collected via cookies.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiCreditCard className="mr-2 text-blue-600" />
            How We Use Your Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Service Delivery</h3>
              <p>To process bookings and provide transportation services.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Communication</h3>
              <p>To send confirmations, updates, and respond to inquiries.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Improvement</h3>
              <p>To enhance our services and user experience.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Legal Compliance</h3>
              <p>To fulfill legal obligations and protect our rights.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiServer className="mr-2 text-blue-600" />
            Data Sharing
          </h2>
          <p className="text-gray-600 mb-4">
            We do not sell your personal data. We may share information with:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">•</span>
              <span><strong>Licensed Drivers:</strong> To facilitate your journey.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">•</span>
              <span><strong>Payment Processors:</strong> To handle transactions securely.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-600">•</span>
              <span><strong>Legal Authorities:</strong> When required by law.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to protect your data against 
            unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
          <p className="text-gray-600 mb-4">
            You have the right to:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Access the personal data we hold about you.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Request correction or deletion of your data.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Object to or restrict certain data processing activities.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Withdraw consent at any time.</span>
            </li>
          </ul>
        </section>

        {/* <section className="bg-blue-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <FiMail className="mr-2 text-blue-600" />
            Contact Us
          </h2>
          <p className="text-gray-600">
            For any privacy-related inquiries, please contact us at +44 7342 193341.
          </p>
        </section> */}
      </div>
    </div>
  );
}