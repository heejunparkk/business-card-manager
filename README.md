# 명함 관리 웹앱

Next.js와 TypeScript를 사용한 명함 생성 및 관리를 위한 웹 애플리케이션입니다.

## 주요 기능

- 명함 생성, 조회, 수정, 삭제 기능
- 명함 디자인 커스터마이징 (배경색, 글자색)
- 상세 페이지에서 명함 정보 확인
- 로컬 스토리지를 사용한 데이터 저장
- 반응형 디자인

## 사용된 기술

- **Frontend**: Next.js, React, TypeScript
- **스타일링**: Tailwind CSS
- **아이콘**: React Icons
- **데이터 관리**: 로컬 스토리지
- **라우팅**: Next.js App Router

## 시작하기

먼저 필요한 의존성을 설치한 후, 개발 서버를 실행하세요:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 프로젝트 구조

- `/src/app`: 페이지 및 라우팅
- `/src/components`: 재사용 가능한 컴포넌트
- `/src/interfaces`: TypeScript 타입 정의
- `/src/lib`: 데이터 관리 로직

## 명함 데이터 구조

```typescript
{
  id: string;           // 고유 식별자
  name: string;         // 이름
  companyName: string;  // 회사명
  title: string;        // 직함
  email: string;        // 이메일
  phone: string;        // 연락처
  address?: string;     // 주소 (선택)
  website?: string;     // 웹사이트 (선택)
  logo?: string;        // 로고 이미지 URL (선택)
  backgroundColor?: string;  // 배경색 (선택)
  textColor?: string;   // 글자색 (선택)
  createdAt: Date;      // 생성일
  updatedAt: Date;      // 수정일
}
```

## 추가 정보

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
