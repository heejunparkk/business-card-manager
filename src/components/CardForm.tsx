'use client';

import { BusinessCard, CardFormData } from '@/interfaces/card';
import { FC, useState, useEffect } from 'react';
import styles from './CardForm.module.css';

interface CardFormProps {
  onSubmit: (data: CardFormData) => void;
  onCancel: () => void;
  initialData?: BusinessCard;
  title: string;
}

const CardForm: FC<CardFormProps> = ({ onSubmit, onCancel, initialData, title }) => {
  const [formData, setFormData] = useState<CardFormData>({
    name: '',
    companyName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    logo: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        companyName: initialData.companyName,
        title: initialData.title,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address || '',
        website: initialData.website || '',
        logo: initialData.logo || '',
        backgroundColor: initialData.backgroundColor || '#ffffff',
        textColor: initialData.textColor || '#000000',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="mx-auto max-w-lg rounded-xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-8 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-center text-2xl font-bold text-transparent">
        {title}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            {' '}
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              title="이름 입력"
              placeholder="이름을 입력하세요"
              className="w-full rounded-lg border-none bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            {' '}
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              회사명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              title="회사명 입력"
              placeholder="회사명을 입력하세요"
              className="w-full rounded-lg border-none bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>
        <div className="mb-5">
          {' '}
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            직함 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            title="직함 입력"
            placeholder="직함을 입력하세요"
            className="w-full rounded-lg border-none bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            {' '}
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              title="이메일 입력"
              placeholder="이메일을 입력하세요"
              className="w-full rounded-lg border-none bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            {' '}
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              연락처 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border-none bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
              required
              placeholder="010-0000-0000"
            />
          </div>
        </div>
        <div className="mb-5">
          {' '}
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            주소
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            title="주소 입력"
            placeholder="주소를 입력하세요 (선택사항)"
            className="w-full rounded-lg border-none bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-5">
          {' '}
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            웹사이트
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full rounded-lg border-none bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com"
          />
        </div>
        <div className="mb-5">
          {' '}
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            로고 URL
          </label>
          <input
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full rounded-lg border-none bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            {' '}
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              배경색
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
                title="배경색 선택"
                aria-label="배경색 선택"
                className="h-12 w-12 cursor-pointer overflow-hidden rounded-lg border-none"
              />
              <input
                type="text"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
                title="배경색 코드 입력"
                placeholder="배경색 코드 (#RRGGBB)"
                className="w-full rounded-lg border-none bg-gray-50 p-3 font-mono text-sm shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            {' '}
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              글자색
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                name="textColor"
                value={formData.textColor}
                onChange={handleChange}
                title="텍스트 색상 선택"
                aria-label="텍스트 색상 선택"
                className="h-12 w-12 cursor-pointer overflow-hidden rounded-lg border-none"
              />
              <input
                type="text"
                name="textColor"
                value={formData.textColor}
                onChange={handleChange}
                title="텍스트 색상 코드 입력"
                placeholder="텍스트 색상 코드 (#RRGGBB)"
                className="w-full rounded-lg border-none bg-gray-50 p-3 font-mono text-sm shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>{' '}
        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            취소
          </button>
          <button
            type="submit"
            className={`rounded-full px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg ${styles.submitButton}`}
          >
            {initialData ? '저장' : '생성'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;
