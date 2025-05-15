"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CardForm from "@/components/CardForm";
import { CardFormData } from "@/interfaces/card";
import { addCard } from "@/lib/cardData";
import { FaArrowLeft } from "react-icons/fa";

export default function AddCardPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: CardFormData) => {
    setIsSubmitting(true);
    try {
      addCard(data);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("카드를 추가하는 중 오류가 발생했습니다:", error);
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {" "}
        <button
          onClick={() => router.push("/")}
          className="mb-6 inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow transition-all duration-300 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <FaArrowLeft className="mr-2" /> 목록으로 돌아가기
        </button>
        <div className="relative">
          <CardForm
            onSubmit={handleSubmit}
            onCancel={() => router.push("/")}
            title="새 명함 추가"
          />
        </div>{" "}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl text-center">
              <div className="mb-4">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                명함을 추가하는 중입니다...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
