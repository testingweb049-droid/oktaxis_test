import { CookieIcon } from "lucide-react";
import { FiSettings, FiPieChart, FiTarget } from "react-icons/fi";

export default function Cookies() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <CookieIcon className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Cookies Policy
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-blue prose-lg mx-auto">
        <section className="mb-12">
          <p className="text-gray-600">
            Our website uses cookies to enhance user experience, analyze site usage, and assist in our marketing efforts.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What Are Cookies?
          </h2>
          <p className="text-gray-600">
            Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and understand how you interact with our site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Types of Cookies We Use
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <FiSettings className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Essential Cookies</h3>
              </div>
              <p className="text-gray-600">
                Necessary for website functionality.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <FiPieChart className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Analytical Cookies</h3>
              </div>
              <p className="text-gray-600">
                Help us understand website usage and improve performance.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <FiTarget className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Marketing Cookies</h3>
              </div>
              <p className="text-gray-600">
                Used to deliver relevant advertisements and track campaign effectiveness.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Managing Cookies
          </h2>
          <p className="text-gray-600 mb-4">
            You can control and manage cookies through your browser settings. Please note that disabling cookies may affect website functionality.
          </p>
     
        </section>

        <div className="bg-blue-50 rounded-xl p-6 mt-12">
          <p className="text-gray-600">
            For any questions about our use of cookies, please contact us at +44 7342 193341.
          </p>
        </div>
      </div>
    </div>
  );
}