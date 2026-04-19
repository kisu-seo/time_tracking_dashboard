import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // [Why] GitHub Pages는 프로젝트를 루트가 아닌 서브 디렉토리
  // (https://{user}.github.io/{repo-name}/)에서 서빙한다.
  // base를 지정하지 않으면 빌드된 에셋 경로가 '/'로 생성되어 404가 발생한다.
  base: '/time_tracking_dashboard/',
});
