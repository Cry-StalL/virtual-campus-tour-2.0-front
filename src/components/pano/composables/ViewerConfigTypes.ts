export interface HotspotConfig {
  type: string;
  longitude: number;
  latitude: number;
  icon: string;
  title: string;
  description?: string;
}

export interface SceneConfig {
  sceneId: string;
  relativeImagePath: string;
  hotspots: HotspotConfig[];
  initialLongitude?: number; // 场景默认朝向经度（相对于绝对方向的偏移）
  initialLatitude?: number; // 场景默认朝向纬度（相对于绝对方向的偏移）
}

export interface StreetViewerConfig {
  progressiveLoading: boolean;
  resolutions: string[];
  scenes: SceneConfig[];
  initialScene?: number | string; // 初始场景索引
}
