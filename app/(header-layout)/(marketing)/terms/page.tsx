import { FiCalendar, FiCreditCard, FiClock, FiAlertTriangle, FiUser } from "react-icons/fi";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Terms & Conditions
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-blue prose-lg mx-auto">
        <section className="mb-12">
          <p className="text-gray-600">
            These Terms & Conditions govern your use of OK Taxis' services. By booking with us, you agree to these terms.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiCalendar className="mr-2 text-blue-600" />
            Bookings
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>All bookings are subject to availability and confirmation.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Accurate information must be provided at the time of booking.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Changes or cancellations should be communicated promptly.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiCreditCard className="mr-2 text-blue-600" />
            Payments
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Payments can be made via credit/debit card or cash.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Prices are quoted at the time of booking and are subject to change based on journey specifics.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiClock className="mr-2 text-blue-600" />
            Cancellations & Refunds
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Cancellations made [Insert Timeframe] before the scheduled pickup time may be eligible for a refund.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Late cancellations may incur charges.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiAlertTriangle className="mr-2 text-blue-600" />
            Liability
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>OK Taxis is not liable for delays caused by unforeseen circumstances.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>We are not responsible for lost or damaged personal belongings.</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FiUser className="mr-2 text-blue-600" />
            Conduct
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>Passengers are expected to behave respectfully towards drivers and vehicles.</span>
            </li>
            <li className="flex">
              <span className="mr-2 text-blue-600">•</span>
              <span>We reserve the right to refuse service to individuals violating conduct standards.</span>
            </li>
          </ul>
        </section>

        <div className="bg-blue-50 rounded-xl p-6 mt-12">
          <p className="text-gray-600">
            For any disputes or concerns, please contact us at{' '}
            <a href="mailto:[Insert Contact Information]" className="text-blue-600 hover:underline">
              +44 7342 193341
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}