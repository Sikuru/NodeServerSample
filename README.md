# NodeServerSample

* node.js 관련 샘플 소스입니다.

1. 주요 모듈은 express + mongoose + async + node_rsa 입니다.
2. json 기반으로 동작하는 REST API 서버의 기본 구조이며,
3. 간단히 OTP식 토큰을 발급하는 형식의 기본 인증 구성을 넣었습니다.
4. node.js 코드 구성상 발생하는 비동기 코드의 중첩 문제 때문에 async를 적용했습니다.
5. 몽고 디비는 개인 애저 서버에 설치된 우분투 서버에 연동되어 있습니다.

감사합니다.