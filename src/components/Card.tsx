"use client";

import { BusinessCard } from "@/interfaces/card";
import { FC } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface CardProps {
  card: BusinessCard;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Card: FC<CardProps> = ({ card, onEdit, onDelete }) => {
  const cardStyle = {
    backgroundColor: card.backgroundColor || "#ffffff",
    color: card.textColor || "#000000",
    boxShadow: document.documentElement.classList.contains("dark")
      ? "0 10px 15px -3px var(--shadow-color), 0 4px 6px -4px var(--shadow-color)"
      : "",
  };
  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 dark:ring-1 dark:ring-gray-700"
      style={cardStyle}
    >
      {" "}
      <div
        className="p-6 cursor-pointer"
        onClick={() => (window.location.href = `/cards/${card.id}`)}
      >
        {card.logo && (
          <div className="mb-4 flex justify-center">
            <div className="relative h-16 w-full">
              <Image
                src={card.logo}
                alt={`${card.companyName} 로고`}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
                className="drop-shadow-sm"
              />
            </div>
          </div>
        )}

        <div className="mb-5 border-b border-gray-200 dark:border-gray-700 pb-3">
          <h2 className="text-xl font-bold">{card.name}</h2>
          <p className="text-sm opacity-90">{card.title}</p>
          <p className="text-sm font-medium mt-1">{card.companyName}</p>
        </div>

        <div className="text-sm space-y-2">
          <p className="flex items-center">
            <span className="inline-block w-4 mr-2 opacity-70">📱</span>
            {card.phone}
          </p>
          <p className="flex items-center overflow-hidden text-ellipsis">
            <span className="inline-block w-4 mr-2 opacity-70">✉️</span>
            {card.email}
          </p>
          {card.address && (
            <p className="flex items-center">
              <span className="inline-block w-4 mr-2 opacity-70">🏢</span>
              {card.address}
            </p>
          )}
          {card.website && (
            <p className="flex items-center overflow-hidden text-ellipsis">
              <span className="inline-block w-4 mr-2 opacity-70">🌐</span>{" "}
              <span
                className="text-blue-600 dark:text-blue-400 hover:underline truncate cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(card.website, "_blank", "noopener,noreferrer");
                }}
              >
                {card.website.replace(/(^\w+:|^)\/\//, "")}
              </span>
            </p>
          )}
        </div>
      </div>
      <div className="bg-opacity-10 bg-black dark:bg-opacity-30 backdrop-blur-sm p-3 flex justify-end space-x-3">
        <Link
          href={`/cards/${card.id}`}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
          aria-label="명함 상세보기"
        >
          <FaEye />
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(card.id);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
          aria-label="명함 편집"
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 transition-colors"
          aria-label="명함 삭제"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Card;
