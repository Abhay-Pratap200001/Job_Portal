import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Job Hunt</h2>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              Job Hunt is a modern job search platform helping job seekers
              connect with top companies and find their dream careers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-gray-800 cursor-pointer">Home</li>
              <li className="hover:text-gray-800 cursor-pointer">Jobs</li>
              <li className="hover:text-gray-800 cursor-pointer">Browse Companies</li>
              <li className="hover:text-gray-800 cursor-pointer">Post a Job</li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Job Categories</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-gray-800 cursor-pointer">Frontend Developer</li>
              <li className="hover:text-gray-800 cursor-pointer">Backend Developer</li>
              <li className="hover:text-gray-800 cursor-pointer">Full Stack Developer</li>
              <li className="hover:text-gray-800 cursor-pointer">UI/UX Designer</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Email: support@jobhunt.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Location: India</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2024 Job Hunt. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6 text-gray-600">
            <a href="https://facebook.com" className="hover:text-gray-800">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="hover:text-gray-800">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" className="hover:text-gray-800">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
