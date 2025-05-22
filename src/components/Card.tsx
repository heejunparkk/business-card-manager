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
      className={`transform overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:ring-1 dark:ring-gray-700 ${
        styles.cardContainer
      } ${document.documentElement.classList.contains('dark') ? styles.cardDarkShadow : ''}`}
    >
      <div
        className={styles.cardContent}
        onClick={() => (window.location.href = `/cards/${card.id}`)}
      >
        {card.logo && (
          <div className="mb-4 flex justify-center">
            <div className="relative h-16 w-full">
              <Image
                src={card.logo}
                alt={`${card.companyName} 로고`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
                className={`drop-shadow-sm ${styles.cardImage}`}
              />
            </div>
          </div>
        )}

        <div className="mb-5 border-b border-gray-200 pb-3 dark:border-gray-700">
          <h2 className="text-xl font-bold">{card.name}</h2>
          <p className="text-sm opacity-90">{card.title}</p>
          <p className="mt-1 text-sm font-medium">{card.companyName}</p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="flex items-center">
            <span className="mr-2 inline-block w-4 opacity-70">📱</span>
            {card.phone}
          </p>
          <p className="flex items-center overflow-hidden text-ellipsis">
            <span className="mr-2 inline-block w-4 opacity-70">✉️</span>
            {card.email}
          </p>
          {card.address && (
            <p className="flex items-center">
              <span className="mr-2 inline-block w-4 opacity-70">🏢</span>
              {card.address}
            </p>
          )}
          {card.website && (
            <p className="flex items-center overflow-hidden text-ellipsis">
              <span className="mr-2 inline-block w-4 opacity-70">🌐</span>{' '}
              <span
                className="cursor-pointer truncate text-blue-600 hover:underline dark:text-blue-400"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(card.website, '_blank', 'noopener,noreferrer');
                }}
              >
                {card.website.replace(/(^\w+:|^)\/\//, '')}
              </span>
            </p>
          )}
        </div>
      </div>
      <div className={styles.actionBar}>
        <Link
          href={`/cards/${card.id}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600 transition-colors hover:bg-green-100 dark:bg-green-900 dark:text-green-400 dark:hover:bg-green-800"
          aria-label="명함 상세보기"
        >
          <FaEye />
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(card.id);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
          aria-label="명함 편집"
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
          aria-label="명함 삭제"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Card;
