import { ref, onMounted } from 'vue';
import type { StreetViewerConfig } from './ViewerConfigTypes';
import { getViewerConfigMode } from '@/config/config';

async function fetchNewestConfigFile(prefix: string): Promise<any> {
  const base = '/src/assets/data/';
  const res = await fetch(base);
  const text = await res.text();
  // 匹配带时间戳的和无时间戳的
  const regex = new RegExp(`${prefix}(-\\d+)?\\.json`, 'g');
  const matches = Array.from(text.matchAll(regex)).map(m => m[0]);
  if (matches.length === 0) throw new Error('未找到任何配置文件');
  // 优先找最新时间戳，没有则用无后缀
  const sorted = matches.sort((a, b) => {
    const getTs = (f: string) => {
      const m = f.match(/-(\\d+)\\.json$/);
      return m ? parseInt(m[1]) : 0;
    };
    return getTs(b) - getTs(a);
  });
  const newest = sorted[0];
  const configRes = await fetch(base + newest);
  if (!configRes.ok) throw new Error('最新配置文件加载失败');
  return await configRes.json();
}

export function useSceneViewerConfig() {
  const viewerconfig = ref<StreetViewerConfig | null>(null);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      const mode = getViewerConfigMode();
      let data;
      if (mode === 'fixed_file') {
        const res = await fetch('/src/assets/data/scene-viewer-config.json');
        if (!res.ok) throw new Error('配置文件加载失败');
        data = await res.json();
      } else {
        data = await fetchNewestConfigFile('scene-viewer-config');
      }

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
