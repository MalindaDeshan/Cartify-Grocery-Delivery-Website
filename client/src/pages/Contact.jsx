import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-indigo-600 mb-2">
            Contact Danthanarayana Solutions Pvt. Ltd.
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            We're always happy to hear from you — get in touch for any business
            inquiries, support, or feedback.
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Address:</strong> 123 Danthanarayana Street, Colombo 07,
            Sri Lanka
          </p>
          <p>
            <strong>Phone:</strong> +94 77 123 4567
          </p>
          <p>
            <strong>Email:</strong> malindadeshan5678@gmail.com
          </p>
        </div>

        {/* Message Form */}
        <form
          className="mt-10 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Your message has been sent!");
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-700">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-gray-700">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Write your message here..."
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-8 text-center">
        © {new Date().getFullYear()} Danthanarayana Digital Innovations. All
        rights reserved.
      </p>
    </div>
  );
};

export default Contact;
