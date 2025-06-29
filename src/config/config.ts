// 应用相关配置
export const APP_CONFIG = {
  // 调试模式
  debug: {
    enabled: false, // 是否启用调试模式
  },
  // 其他配置项可以在这里添加
};

// API服务器(后端服务器)配置
export const API_CONFIG = {
  // 后端服务器URL，根据环境变量设置，默认为本地开发环境
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  // API版本
  API_VERSION: 'v1',
};

// 获取完整的API URL
export const getApiUrl = (path: string): string => {
  return `${API_CONFIG.BASE_URL}/api/${API_CONFIG.API_VERSION}/${path}`;
};

// 读取模式配置，fixed_file 或 newest_file
export const VIEWER_CONFIG_MODE_KEY = 'viewer_config_mode';
export type ViewerConfigMode = 'fixed_file' | 'newest_file';

export const getViewerConfigMode = (): ViewerConfigMode => {
  return (localStorage.getItem(VIEWER_CONFIG_MODE_KEY) as ViewerConfigMode) || 'fixed_file';
};

export const setViewerConfigMode = (mode: ViewerConfigMode) => {
  localStorage.setItem(VIEWER_CONFIG_MODE_KEY, mode);
};