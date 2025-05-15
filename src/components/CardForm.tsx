"use client";

import { BusinessCard, CardFormData } from "@/interfaces/card";
import { FC, useState, useEffect } from "react";

interface CardFormProps {
  onSubmit: (data: CardFormData) => void;
  onCancel: () => void;
  initialData?: BusinessCard;
  title: string;
}

const CardForm: FC<CardFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  title,
}) => {
  const [formData, setFormData] = useState<CardFormData>({
    name: "",
    companyName: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    logo: "",
    backgroundColor: "#ffffff",
    textColor: "#000000",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        companyName: initialData.companyName,
        title: initialData.title,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address || "",
        website: initialData.website || "",
        logo: initialData.logo || "",
        backgroundColor: initialData.backgroundColor || "#ffffff",
        textColor: initialData.textColor || "#000000",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-lg mx-auto border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
        {title}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            {" "}
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 dark:text-white"
              required
            />
          </div>

          <div>
            {" "}
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              회사명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="mb-5">
          {" "}
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            직함 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 dark:text-white"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            {" "}
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 dark:text-white"
              required
            />
          </div>

          <div>
            {" "}
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 dark:text-white"
              required
              placeholder="010-0000-0000"
            />
          </div>
        </div>
        <div className="mb-5">
          {" "}
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            주소
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 dark:text-white"
          />
        </div>
        <div className="mb-5">
          {" "}
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            웹사이트
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 dark:text-white"
            placeholder="https://example.com"
          />
        </div>
        <div className="mb-5">
          {" "}
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            로고 URL
          </label>
          <input
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 dark:text-white"
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            {" "}
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              배경색
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
                className="w-12 h-12 border-none rounded-lg cursor-pointer overflow-hidden"
              />
              <input
                type="text"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
                className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 font-mono text-sm dark:text-white"
              />
            </div>
          </div>

          <div>
            {" "}
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              글자색
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                name="textColor"
                value={formData.textColor}
                onChange={handleChange}
                className="w-12 h-12 border-none rounded-lg cursor-pointer overflow-hidden"
              />
              <input
                type="text"
                name="textColor"
                value={formData.textColor}
                onChange={handleChange}
                className="w-full p-3 border-none bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 font-mono text-sm dark:text-white"
              />
            </div>
          </div>
        </div>{" "}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              background: "var(--button-primary)",
              boxShadow: "0 4px 6px -1px var(--shadow-color)",
            }}
          >
            {initialData ? "저장" : "생성"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
