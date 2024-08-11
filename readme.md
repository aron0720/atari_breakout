# Phaser, Electron, Vite 조합을 위한 템플릿

1. Phaser를 이용한 개발 및 디버그 단계

Phaser로 게임을 개발하는 동안에는 아래 명령어를 사용해 테스트 서버를 실행할 수 있습니다.

해당 명령어는 Phaser의 개발 서버를 실행하며, 개발 서버는 파일 변경을 감지하여 자동으로 새로고침합니다.

```bash
npm run dev
```

2. Vite를 이용한 빌드 단계

Phaser로 개발한 게임을 묶어주기 위해 Vite를 사용합니다.

결과물은 build 폴더에 생성됩니다.

추 후, Electron이 해당 경로를 이용해 실행됩니다.

```bash
npm run build
```

3. Electron을 이용한 실행 단계

Vite로 묶은 결과물을 Electron으로 실행할 수 있습니다.

```bash
npm start
```

4. Electron을 이용한 빌드 단계

Vite로 빌드한 결과물을 Electron으로 실행했을 때 문제가 없다고 판단하면, @Electron/packager를 이용해 응용 프로그램을 빌드할 수 있습니다.

```bash
npm run pack
```