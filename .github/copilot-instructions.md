<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# 명함 관리 앱

이 프로젝트는 Next.js와 TypeScript를 사용한 명함 생성 및 관리 웹앱입니다.

## 주요 기능

- 명함 생성, 조회, 수정, 삭제 (CRUD)
- 명함 디자인 커스터마이징 (배경색, 글자색)
- 반응형 디자인

## 주요 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- React Icons

## 데이터 구조

### BusinessCard

```typescript
{
  id: string;
  name: string;
  companyName: string;
  title: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  logo?: string;
  backgroundColor?: string;
  textColor?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 아키텍처

- `/src/interfaces`: 타입 정의
- `/src/components`: 재사용 가능한 UI 컴포넌트
- `/src/lib`: 데이터 관리 로직
- `/src/app`: 라우팅 및 페이지 컴포넌트
