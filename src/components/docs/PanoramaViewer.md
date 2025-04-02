# PanoramaViewer 全景图查看器组件

PanoramaViewer 是一个基于 Three.js 的全景图查看器组件，支持全景图片的展示、旋转和缩放操作。

## 基本用法

```vue
<template>
  <PanoramaViewer imagePath="/images/panorama.jpg" />
</template>

<script setup lang="ts">
import PanoramaViewer from '@/components/PanoramaViewer.vue'
</script>
```

## 使用示例

### 基础用法
```vue
<PanoramaViewer imagePath="/images/panorama.jpg" />
```

### 自定义参数
```vue
<PanoramaViewer 
  imagePath="/images/panorama.jpg"
  :initialFov="60"
  :minFov="45"
  :maxFov="120"
  :rotateSpeed="-0.2"
  :zoomSpeed="1.5"
  :dampingFactor="0.15"
  :fovDampingFactor="0.15"
/>
```
#### hotSpots示例
```typescript
const hotspots = [
  {
    id: '1',
    longitude: 120,
    latitude: 30,
    title: '图书馆',
    description: '这是图书馆的位置'
  },
  {
    id: '2',
    longitude: -90,
    latitude: 15,
    title: '教学楼',
    description: '这是教学楼的位置'
  }
];
```

```vue
<PanoramaViewer 
  imagePath="/images/panorama.jpg"
  :hotspots="hotspots"
/>
```

## Props 参数说明

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| imagePath | string | 是 | - | 全景图片的路径 |
| initialFov | number | 否 | 75 | 初始视场角（Field of View） |
| minFov | number | 否 | 30 | 最小视场角，限制最大缩放程度 |
| maxFov | number | 否 | 90 | 最大视场角，限制最小缩放程度 |
| rotateSpeed | number | 否 | -0.15 | 旋转速度，负值表示反向旋转 |
| zoomSpeed | number | 否 | 2.0 | 缩放速度 |
| dampingFactor | number | 否 | 0.1 | 旋转阻尼系数，值越大阻尼效果越强 |
| fovDampingFactor | number | 否 | 0.1 | 缩放阻尼系数，值越大阻尼效果越强 |
| hotspots | HotSpot[] | 否 | [] | 热点数组 |

### HotSpot 接口说明

热点（HotSpot）是全景图中的可交互标记点，用于标识特定位置或提供额外信息。

#### HotSpot 接口定义

```typescript
interface HotSpot {
  id: string;          // 热点唯一标识符
  longitude: number;   // 经度坐标 (-180 到 180)
  latitude: number;    // 纬度坐标 (-90 到 90)
  icon?: string;       // 图标路径（可选）
  title?: string;      // 热点标题（可选）
  description?: string; // 热点描述（可选）
}
```

### 坐标系统说明

- **经度（longitude）**：
  - 范围：-180° 到 180°
  - 0° 表示正前方
  - 正值表示向右偏移
  - 负值表示向左偏移

- **纬度（latitude）**：
  - 范围：-90° 到 90°
  - 0° 表示水平视线
  - 正值表示向上偏移
  - 负值表示向下偏移


## 交互说明

- **旋转**：按住鼠标左键拖动可以旋转视角
- **缩放**：使用鼠标滚轮可以缩放视角
- **惯性**：所有操作都带有平滑的惯性效果
- **热点交互**：点击热点可以触发相应的交互事件

## 注意事项

1. 确保提供的全景图片是等距圆柱投影（Equirectangular）格式
2. 图片路径应该是相对于 public 目录的路径
3. 组件会自动适应容器大小，建议在固定尺寸的容器中使用
4. 组件会自动处理窗口大小变化，保持正确的宽高比

## 性能优化

- 组件使用了 Three.js 的 WebGL 渲染器
- 实现了资源的自动清理，防止内存泄漏
- 使用 requestAnimationFrame 进行动画循环
- 支持窗口大小变化的响应式调整

## 浏览器兼容性

- 支持所有现代浏览器
- 需要支持 WebGL
- 建议使用 Chrome、Firefox、Safari 等主流浏览器的最新版本 