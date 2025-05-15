"use client";

import { FC } from "react";
import Link from "next/link";
import { FaAddressCard, FaGithub } from "react-icons/fa";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-gray-400 dark:text-gray-500 text-sm pt-8 pb-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-sm mt-auto"
      style={{ backgroundColor: "var(--footer-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <FaAddressCard className="text-blue-500 mr-2" />
            <span className="font-medium">명함 관리 앱</span>
          </div>

          <div className="flex space-x-4">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              홈
            </Link>
            <Link href="/add" className="hover:text-blue-500 transition-colors">
              새 명함
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              <FaGithub className="mr-1" /> GitHub
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-4 text-center">
          <p>&copy; {currentYear} 명함 관리 앱 - 모든 권리 보유</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
