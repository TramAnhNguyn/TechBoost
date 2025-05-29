import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Send } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo/logo.svg";

export default function Footer() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hover: { scale: 1.2, color: "#2563eb", transition: { duration: 0.3 } },
  };

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            className="flex flex-col space-y-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <img src={logo} alt="TeachBoost Logo" className="h-12 w-auto" />
              <span className="text-2xl font-bold text-blue-400">TeachBoost</span>
            </div>
            <p className="text-gray-300 text-sm">
              Empowering education through innovative courses and resources.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "#facebook" },
                { Icon: Twitter, href: "#twitter" },
                { Icon: Instagram, href: "#instagram" },
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-gray-300"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-blue-300">Quick Links</h3>
            {["About", "Contact", "Courses", "Blog"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-blue-300">Contact Us</h3>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <p className="text-gray-300 text-sm">
                12 Nguyễn Văn Bảo, Phường 1, TP. Hồ Chí Minh
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-400" />
              <p className="textGRA-gray-300 text-sm">+84 123 456 789</p>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-400" />
              <p className="text-gray-300 text-sm">support@teachboost.com</p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-blue-300">Newsletter</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to get the latest updates and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-full bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
              <button className="px-4 py-2 bg-blue-600 rounded-r-full hover:bg-blue-700 transition-colors duration-300">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>
            &copy; {new Date().getFullYear()} TeachBoost. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}