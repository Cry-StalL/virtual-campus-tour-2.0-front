// 定义场景接口
export interface Scene {
  sceneId: string;     // 场景唯一标识符
  relativeImagePath: string;   // 全景图片的相对路径
  hotspots?: HotSpot[]; // 热点数组
  initialLongitude?: number; // 场景默认朝向经度（可选，相对于绝对方向的偏移）
  initialLatitude?: number;  // 场景默认朝向纬度（可选，相对于绝对方向的偏移）
}

// 定义热点接口
export interface HotSpot {
  id?: string;
  type: string;        // 热点类型
  longitude: number;   // 经度 (-180 到 180)
  latitude: number;    // 纬度 (-90 到 90)
  icon?: string;       // 图标路径
  title?: string;      // 标题
  description?: string; // 描述
  targetSceneId?: string; // 目标场景ID（当type为"switchScene"时必填）
  targetSceneViewerSceneId?: string;
  targetStreetSceneId?: string; // 目标街景场景ID（当type为"aerial"时使用）
  onClick?: (params?: any) => void; // 点击处理函数
  onClickParams?: any; // 传递给点击处理函数的参数
}

// 定义组件的props接口
export interface PanoramaViewerProps {
  scenes: Scene[]; // 场景数组
  initialFov?: number; // 初始视场角
  minFov?: number; // 最小视场角
  maxFov?: number; // 最大视场角
  rotateSpeed?: number; // 旋转速度
  zoomSpeed?: number; // 缩放速度
  dampingFactor?: number; // 阻尼系数
  fovDampingFactor?: number; // FOV阻尼系数
  debug?: boolean; // debug模式
  progressiveLoading?: boolean; // 渐进加载模式
  resolutions?: string[]; // 渐进加载的分辨率列表，如 ["1920x960", "3840x1920", "7680x3840"]
  switchViewer?: (name: string) => void; // 切换视图方法
  initialScene?: number | string; // 初始场景索引
  // 视角限制属性
  minLongitude?: number; // 最小经度 (-180 到 180)
  maxLongitude?: number; // 最大经度 (-180 到 180)
  minLatitude?: number; // 最小纬度 (-90 到 90)
  maxLatitude?: number; // 最大纬度 (-90 到 90)
}