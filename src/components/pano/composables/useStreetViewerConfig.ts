import { ref, onMounted } from 'vue';
import type { StreetViewerConfig } from './ViewerConfigTypes';

export function useStreetViewerConfig() {
  const viewerconfig = ref<StreetViewerConfig | null>(null);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      const res = await fetch('/assets/street-viewer-config.json');
      // const res = await fetch('./street-viewer-config.json');
      console.log('完整响应:', res);
      console.log('状态码:', res.status); // 立即打印 status
      if (!res.ok) throw new Error('配置文件加载失败');
      const data = await res.json();
      // 简单类型检查
      if (
        typeof data.progressiveLoading === 'boolean' &&
        Array.isArray(data.resolutions) &&
        Array.isArray(data.scenes)
      ) {
        viewerconfig.value = data;
      } else {
        throw new Error('配置文件格式不正确');
      }
    } catch (e: any) {
      error.value = e.message;
    }
  });
  // console.log(viewerconfig.value)
  return { viewerconfig, error };
}
