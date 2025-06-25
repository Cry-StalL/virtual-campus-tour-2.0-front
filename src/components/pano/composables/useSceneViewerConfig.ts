import { ref, onMounted } from 'vue';
import type { StreetViewerConfig } from './ViewerConfigTypes';

export function useSceneViewerConfig() {
  const viewerconfig = ref<StreetViewerConfig | null>(null);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      const res = await fetch('/src/assets/data/scene-viewer-config.json');
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

  return { viewerconfig, error };
}
