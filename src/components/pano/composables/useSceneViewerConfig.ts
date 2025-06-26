import { ref, onMounted } from 'vue';
import type { StreetViewerConfig } from './ViewerConfigTypes';
import { getViewerConfigMode } from '@/config/config';

// 使用 Vite 的 import.meta.glob 获取本地所有配置文件
const configFiles = import.meta.glob('/src/assets/data/scene-viewer-config*.json', { eager: true, import: 'default' });

function getNewestConfigData(prefix: string): { data: any, fileName: string } {
  // 匹配 scene-viewer-config.json 和 scene-viewer-config-时间戳.json
  const regex = new RegExp(`${prefix}(-\\d+)?\\.json$`);
  const matched = Object.keys(configFiles).filter(f => regex.test(f));
  if (matched.length === 0) throw new Error('未找到任何配置文件');
  // 优先找最新时间戳，没有则用无后缀
  const sorted = matched.sort((a, b) => {
    const getTs = (f: string) => {
      const m = f.match(/-(\\d+)\\.json$/);
      return m ? parseInt(m[1]) : 0;
    };
    return getTs(b) - getTs(a);
  });
  const newest = sorted[0];
  return { data: configFiles[newest], fileName: newest.replace('/src/assets/data/', '') };
}

export function useSceneViewerConfig() {
  const viewerconfig = ref<StreetViewerConfig | null>(null);
  const error = ref<string | null>(null);
  const configFileName = ref<string | null>(null);

  onMounted(async () => {
    try {
      const mode = getViewerConfigMode();
      let data, fileName;
      if (mode === 'fixed_file') {
        data = configFiles['/src/assets/data/scene-viewer-config.json'];
        fileName = 'scene-viewer-config.json';
        if (!data) throw new Error('配置文件加载失败');
      } else {
        const result = getNewestConfigData('scene-viewer-config');
        data = result.data;
        fileName = result.fileName;
      }
      // 简单类型检查
      if (
        typeof data.progressiveLoading === 'boolean' &&
        Array.isArray(data.resolutions) &&
        Array.isArray(data.scenes)
      ) {
        viewerconfig.value = data;
        configFileName.value = fileName;
      } else {
        throw new Error('配置文件格式不正确');
      }
    } catch (e: any) {
      error.value = e.message;
    }
  });

  return { viewerconfig, error, configFileName };
}
