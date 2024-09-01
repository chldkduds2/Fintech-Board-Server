# FINDA - [ 온보딩 Fintech Board ]

## 프로젝트 소개

Fintech Board는 사용자가 경험한 금융상품에 대해 후기를 작성하고 다른 사용자들과 공유할 수 있는 블로그 형식의 웹 애플리케이션입니다.

## 제작 과정

### 1. 블로그 레퍼런스

- 프로젝트를 시작하기 전에 유용한 블로그 글과 예제를 참고했습니다:
  - [블로그 예제 1](https://github.com/songye38/2024_make_blog_web)
  - [블로그 예제 2](https://hyunki99.tistory.com/51)
  - [블로그 예제 3](https://d5br5.dev/blog/nextjs_blog/setup)

### 2. 핵심 기능

1. 사용자 인증 시스템 (SNS auth 사용)
2. 금융상품 리뷰 CRUD (글 작성, 수정, 삭제)
3. 금융상품 리뷰 검색 및 정렬 모드 (최신순, 평점순)
4. 금융상품 리뷰 표시 및 페이지네이션
5. 사용자 프로필 페이지
6. 사용자 모드 & 전체 게시글 관리 모드 분리

### 3. 사용 기술 스택

- **프론트엔드**: TypeScript, React, Redux, Redux-Saga, styled-components
- **백엔드**: Node.js, Express (해당하는 경우)
- **도구**: VS Code, Figma, Notion, Babel, Webpack

### 4. 사용 기술 개념 및 적용 방안

- **Framework : React**: 컴포넌트 기반의 UI 라이브러리로 동적 웹 애플리케이션을 구축하였습니다.
- **Language : TypeScript**: 정적 타입 검사로 코드 안정성과 가독성을 높였습니다.
- **Support(성능향상) : Redux & Redux-Saga**: 전역 상태 관리와 비동기 작업 처리를 효과적으로 관리하였습니다.
- **Support(성능향상): Babel**: 최신 JavaScript 문법을 구형 브라우저에서도 사용할 수 있도록 변환하였습니다.
- **Support(성능향상): Webpack**: 모듈 번들러로 코드 분할과 최적화로 성능을 향상시켰습니다.
- **Server: Express**: Node.js 기반의 웹 애플리케이션 프레임워크로 서버와 클라이언트 간의 통신을 처리하였습니다.
- **Design: styled-components**: CSS-in-JS 라이브러리로 컴포넌트별로 독립적인 스타일을 작성하고 적용하였습니다.

- 이 밖의 Fintech Board 개발 과정에 대한 자세한 내용은 [포트폴리오](https://www.notion.so/157bd9cc88c548e5968a0d6c9daa55b6?pvs=21)에 정리되어 있습니다.
