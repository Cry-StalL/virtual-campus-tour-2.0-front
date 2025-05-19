// 定义场景接口
export interface Scene {
  sceneId: string;     // 场景唯一标识符
  imagePath: string;   // 全景图片的路径
  hotspots?: HotSpot[]; // 热点数组
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
  targetSceneId?: string; // 目标场景ID（当type为"scene"时必填）
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
} 