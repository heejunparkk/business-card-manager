'use client';

import { BusinessCard } from '@/interfaces/card';
import { FC, useEffect, useRef } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';

interface CardProps {
  card: BusinessCard;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Card: FC<CardProps> = ({ card, onEdit, onDelete }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      // 카드 배경색과 텍스트 색상을 직접 요소에 설정
      cardRef.current.style.setProperty('--card-bg-color', card.backgroundColor || '#ffffff');
      cardRef.current.style.setProperty('--card-text-color', card.textColor || '#000000');
    }
  }, [card.backgroundColor, card.textColor]);

  return (
    <div
      ref={cardRef}
      className={`${styles.cardContainer} ${
        document.documentElement.classList.contains('dark') ? styles.cardDarkShadow : ''
      } shadow-lg`}
    >
      <div
        className={styles.cardContent}
        onClick={() => (window.location.href = `/cards/${card.id}`)}
      >
        {card.logo && (
          <div className="mb-5 flex justify-center">
            <div className="relative h-16 w-full">
              <Image
                src={card.logo}
                alt={`${card.companyName} 로고`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
                className={`drop-shadow-md ${styles.cardImage}`}
              />
            </div>
          </div>
        )}

        <div className={`${styles.cardHeader}`}>
          <h2 className="text-xl font-bold tracking-tight">{card.name}</h2>
          <p className="text-sm opacity-80">{card.title}</p>
          <p className="mt-1 text-sm font-medium">{card.companyName}</p>
        </div>

        <div className={`${styles.cardInfo} mt-3`}>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </span>
            <span className="text-sm">{card.phone}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </span>
            <span className="overflow-hidden text-sm text-ellipsis">{card.email}</span>
          </div>

          {card.address && (
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </span>
              <span className="text-sm">{card.address}</span>
            </div>
          )}

          {card.website && (
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </span>
              <span
                className={styles.website}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(card.website, '_blank', 'noopener,noreferrer');
                }}
              >
                {card.website.replace(/(^\w+:|^)\/\//, '')}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actionBar}>
        <Link
          href={`/cards/${card.id}`}
          className={`${styles.actionButton} flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-600 transition-all hover:bg-green-100 dark:bg-green-900/50 dark:text-green-400 dark:hover:bg-green-800`}
          aria-label="명함 상세보기"
        >
          <FaEye />
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(card.id);
          }}
          className={`${styles.actionButton} flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-800`}
          aria-label="명함 편집"
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          className={`${styles.actionButton} flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition-all hover:bg-red-100 dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-800`}
          aria-label="명함 삭제"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Card;
