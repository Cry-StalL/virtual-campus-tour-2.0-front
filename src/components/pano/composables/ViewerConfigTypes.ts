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
  initialLongitude?: number;
  initialLatitude?: number;
}

export interface StreetViewerConfig {
  progressiveLoading: boolean;
  resolutions: string[];
  scenes: SceneConfig[];
  initialScene?: number | string; // 初始场景索引
}
