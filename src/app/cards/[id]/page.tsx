"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BusinessCard, CardFormData } from "@/interfaces/card";
import { getCardById, deleteCard, updateCard } from "@/lib/cardData";
import CardForm from "@/components/CardForm";
import { FaEdit, FaTrash, FaArrowLeft, FaAddressCard } from "react-icons/fa";

interface Props {
  params: {
    id: string;
  };
}

export default function CardDetail({ params }: Props) {
  // params의 직접 접근은 마이그레이션 기간 동안에는 허용됨
  // 향후 버전에서는 React.use()로 언래핑 필요
  const { id } = params;
  const router = useRouter();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCard = () => {
      try {
        const fetchedCard = getCardById(id);
        if (fetchedCard) {
          setCard(fetchedCard);
        } else {
          // 카드를 찾을 수 없는 경우
          router.push("/");
        }
      } catch (error) {
        console.error("명함을 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard();
  }, [id, router]);

  const handleDelete = () => {
    if (window.confirm("정말로 이 명함을 삭제하시겠습니까?")) {
      const success = deleteCard(id);
      if (success) {
        router.push("/");
      }
    }
  };
  const handleUpdate = (formData: CardFormData) => {
    if (card) {
      const updatedCard = updateCard(id, formData);
      if (updatedCard) {
        setCard(updatedCard);
      }
    }
    setIsEditing(false);
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            명함을 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md">
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-full inline-flex items-center justify-center mb-4">
            <FaAddressCard
              className="text-red-400 dark:text-red-300"
              size={32}
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            명함을 찾을 수 없습니다
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            요청하신 명함이 존재하지 않거나 삭제되었을 수 있습니다.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              background: "var(--button-primary)",
              boxShadow: "0 4px 6px -1px var(--shadow-color)",
            }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }
  const cardStyle = {
    backgroundColor: card.backgroundColor || "#ffffff",
    color: card.textColor || "#000000",
    boxShadow: document.documentElement.classList.contains("dark")
      ? "0 10px 15px -3px var(--shadow-color), 0 4px 6px -4px var(--shadow-color)"
      : "",
  };
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="mb-6 inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow transition-all duration-300 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <FaArrowLeft className="mr-2" /> 목록으로 돌아가기
        </button>

        {isEditing ? (
          <div className="mb-8">
            <CardForm
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              initialData={card}
              title="명함 편집"
            />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-8" style={cardStyle}>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-4xl font-bold mb-1">{card.name}</h1>
                  <p className="text-xl opacity-90">{card.title}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors"
                    aria-label="명함 편집"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/40 transition-colors"
                    aria-label="명함 삭제"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
              {card.logo && (
                <div className="mb-8 flex justify-center">
                  <div className="relative h-32 w-full">
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
              )}{" "}
              <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-2">{card.companyName}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-opacity-5 bg-black dark:bg-opacity-10 dark:bg-white p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      이메일
                    </p>
                    <p className="text-lg flex items-center">
                      <span className="inline-block w-5 mr-2 opacity-70">
                        ✉️
                      </span>
                      {card.email}
                    </p>
                  </div>
                  <div className="bg-opacity-5 bg-black dark:bg-opacity-10 dark:bg-white p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      연락처
                    </p>
                    <p className="text-lg flex items-center">
                      <span className="inline-block w-5 mr-2 opacity-70">
                        📱
                      </span>
                      {card.phone}
                    </p>
                  </div>
                </div>{" "}
                <div className="space-y-6">
                  {card.address && (
                    <div className="bg-opacity-5 bg-black dark:bg-opacity-10 dark:bg-white p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        주소
                      </p>
                      <p className="text-lg flex items-center">
                        <span className="inline-block w-5 mr-2 opacity-70">
                          🏢
                        </span>
                        {card.address}
                      </p>
                    </div>
                  )}
                  {card.website && (
                    <div className="bg-opacity-5 bg-black dark:bg-opacity-10 dark:bg-white p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        웹사이트
                      </p>
                      <p className="text-lg flex items-center">
                        <span className="inline-block w-5 mr-2 opacity-70">
                          🌐
                        </span>
                        <a
                          href={card.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                        >
                          {card.website.replace(/(^\w+:|^)\/\//, "")}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>{" "}
            <div className="bg-opacity-10 bg-black dark:bg-opacity-30 backdrop-blur-sm p-5 text-sm text-gray-600 dark:text-gray-400 flex justify-between">
              <div>
                <p className="mb-1">
                  생성일:{" "}
                  {new Date(card.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
                <p>
                  마지막 수정:{" "}
                  {new Date(card.updatedAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="mb-1">
                  배경색:{" "}
                  <span className="font-mono">
                    {card.backgroundColor || "#ffffff"}
                  </span>
                </p>
                <p>
                  글자색:{" "}
                  <span className="font-mono">
                    {card.textColor || "#000000"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
