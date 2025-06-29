export interface HotspotConfig {
  type: string;
  longitude: number;
  latitude: number;
  icon: string;
  title: string;
  description?: string;
  targetSceneId?: string; // 新增，支持跳转场景热点
}

export interface SceneConfig {
  sceneId: string;
  relativeImagePath: string;
  hotspots: HotspotConfig[];
<<<<<<< HEAD
  initialLongitude?: number;
  initialLatitude?: number;
=======
  initialLongitude?: number; // 初始经度
  initialLatitude?: number; // 初始纬度
>>>>>>> c68a6bc76804e283e1380e5ff9cba71695f19585
}

export interface StreetViewerConfig {
  progressiveLoading: boolean;
  resolutions: string[];
  scenes: SceneConfig[];
  initialScene?: number | string; // 初始场景索引
}
