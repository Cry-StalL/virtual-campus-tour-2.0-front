import { createApp } from 'vue';
import EditorPanorama from './components/EditorPanorama.vue';
import { setViewerConfigMode } from './config/config';

// 设置默认模式（'fixed_file' or 'newest_file'）
setViewerConfigMode('newest_file');

createApp(EditorPanorama).mount('#app');
