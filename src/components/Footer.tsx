'use client';

import { FC } from 'react';
import Link from 'next/link';
import { FaAddressCard, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-opacity-60 dark:bg-opacity-60 mt-auto border-t border-gray-200 pt-8 pb-6 text-sm text-gray-400 backdrop-blur-sm dark:border-gray-700 dark:text-gray-500 ${styles.footerBg}`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <FaAddressCard className="mr-2 text-blue-500" />
            <span className="font-medium">명함 관리 앱</span>
          </div>

          <div className="flex space-x-4">
            <Link href="/" className="transition-colors hover:text-blue-500">
              홈
            </Link>
            <Link href="/add" className="transition-colors hover:text-blue-500">
              새 명함
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-colors hover:text-blue-500"
            >
              <FaGithub className="mr-1" /> GitHub
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 text-center dark:border-gray-800">
          <p>&copy; {currentYear} 명함 관리 앱 - 모든 권리 보유</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
