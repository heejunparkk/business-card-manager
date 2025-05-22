'use client';

import { FC } from 'react';
import Link from 'next/link';
import { FaAddressCard, FaGithub, FaEnvelope, FaQuestion } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} ${styles.footerBg}`}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumns}>
          {/* 로고 및 간단한 설명 */}
          <div className={styles.footerColumn}>
            <div className="mb-3 flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm">
                <FaAddressCard className="text-white" size={16} />
              </div>
              <span className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-lg font-bold text-transparent">
                명함 관리 앱
              </span>
            </div>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              비즈니스 명함을 쉽게 관리하세요
            </p>
          </div>

          {/* 링크 섹션 */}
          <div className={styles.footerColumn}>
            <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">메뉴</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className={`${styles.footerLink} text-sm text-gray-500 dark:text-gray-400`}
              >
                홈
              </Link>
              <Link
                href="/add"
                className={`${styles.footerLink} text-sm text-gray-500 dark:text-gray-400`}
              >
                새 명함
              </Link>
            </div>
          </div>

          {/* 링크 섹션 2 */}
          <div className={styles.footerColumn}>
            <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">도움말</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/help"
                className={`${styles.footerLink} text-sm text-gray-500 dark:text-gray-400`}
              >
                <FaQuestion className="mr-1 inline" size={12} /> FAQ
              </Link>
              <a
                href="mailto:contact@example.com"
                className={`${styles.footerLink} text-sm text-gray-500 dark:text-gray-400`}
              >
                <FaEnvelope className="mr-1 inline" size={12} /> 문의하기
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.footerLink} text-sm text-gray-500 dark:text-gray-400`}
              >
                <FaGithub className="mr-1 inline" size={12} /> GitHub
              </a>
            </div>
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className={styles.copyright}>
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {currentYear} 명함 관리 앱 - 모든 권리 보유
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
