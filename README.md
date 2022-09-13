# socket-chat-pratice

 **SPA(Single Page Application)** 을 바닐라 자바스크립트로 직접 구현해보려하였다. SPA 란 서버로부터 `html` 파일을 받아오는 것이 아니라, 하나의 `html` 에서 자바스크립트를 통해 동적으로 화면을 바꿔가면서 표시하도록 하는 것이다. 추가적으로 `SPA` 프로젝트 구현 후 `socket.io` 를 통한 채팅 프로그램을 만들어보려 한다.

<p align="center">
<img src="https://user-images.githubusercontent.com/51353146/189850546-2f653b30-0b1f-46c5-8322-f0ce47577753.png" width="500"/>
</p>

**프로젝트 구조**

- `IComponent.ts` : 페이지 혹은 컴포넌트를 위한 Component 클래스
- `Router.ts` : view 들의 routing 을 지원하는 모듈
- `App.ts` : 최종 view 를 확정짓는 모듈
- `main.ts` : `App.ts` 의 뷰를 특정 돔에 추가하는 모듈


## Monorepo 설정

### 배경

- `client` 와 `server` 를 한 레포 안에서 관리하고 싶었음
- 공통적으로 쓰이는 `eslint`, `tsconfig` 등의 설정을 공유하고 싶었음
- 각각의 패키지들간의 의존성만 관리하고 싶었음

> **`yarn workspace` 를 이용해서 각 패키지들간의 관리 + `tsconfig` 의 `extends` 기능을 사용하기로 함**
> 

### yarn workspace

- `root` 의 `package.json` 에 아래와 같이 `workspaces` 에 `server` 와  `client` 를 추가시켜줌

```json
// package.json
"main": "index.js",
"type": "commonjs",
"workspaces": [
  "client",
  "server"
],
```

- 공통적으로 사용할 `gts` 관련 패키지들을 `root` 의 `package.json` 에 추가시켜줌

```json
// package.json
"devDependencies": {
    "@types/node": "^14.11.2",
    "gts": "^3.1.0",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.2"
  },
```

### tsconfig 설정

- `root` 의 `tsconfig` 에 공통적으로 사용할 옵션들을 추가해주고, `client`, `server` 의 `tsconfig` 에서 `extends` 옵션으로 불러와서 사용함
- `client` , `server` 의  `tsconfig` 에 세부적으로 사용할 옵션들을 추가 및 수정해줌

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["ESNext", "DOM"],
    "allowJs": true,
    "composite": true,
    "module": "ESNext", // set module system for the program.
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "../build/js"
  },
  "include": ["./src"]
}
```

## esbuild

### 배경

- esmodule 시스템을 이용하여 프로젝트 구축을 하려함
- import 를 할 때 모든 파일 뒤에 .js 를 붙여주어야 하는 번거로움
- nodemodules 의 패키지를 import 해올 때의 번거로움 -> 사용할 패키지들을 정적파일로 분류해야했음

### 특징

- `esbuild` 를 사용하여 모듈간의 의존성에 따라 번들파일을 생성해줌
- `GO` 언어의 병렬처리 기능을 사용하여 빠른 번들링이 가능함
- 코드 파싱, 코드 출력, 소스맵 생성을 모두 병렬로 처리
- ES5 이하의 문법은 100% 지원하지 않아 IE 대응이 어려움 -> 현 프로젝트에서는 상관없는 문제

> **`esbuild` 의 코드 번들링 및 소스맵 생성이라는 이점을 활용하여 개발하기로 함**
> 

### 사용방법

- `esbuild` 명령어로 `entrypoint` 및 추가적인 옵션을 넣어 `CLI` 로 간단하게 사용가능
- `package.json` 에 `script` 로 사용하도록 함

```json
"scripts": {
    "build": "esbuild src/main.ts --bundle --minify --sourcemap --outdir=../dist",
    "test": "yarn build && nodemon -r esm"
  },
```

### 후기

- `esbuild` 를 사용해서 번거로웠던 의존성 고려를 할 필요가 없어짐
- `sourceMap` 을 생성해주는 기능을 사용하여 브라우저에서 디버깅할때 편리함
- 병렬처리로 빠르게 코드들간의 의존성을 파악하고 번들링해주어 개발시간이 단축됨
- `.js` 등의 확장자를 붙어주지 않아도 알아서 해결해주기때문에 편리함
- `.css` 도 자동으로 번들링해주어 적용하기 편리함 -> 다른 로더 설정을 안해주어도 되어서 좋았음
