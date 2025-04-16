# PanoramaViewer 全景图查看器组件

PanoramaViewer 是一个基于 Three.js 的全景图查看器组件，支持全景图片的展示、旋转和缩放操作，以及多场景切换功能。

## 基本用法

```vue
<template>
  <PanoramaViewer :scenes="scenes" />
</template>

<script setup lang="ts">
import PanoramaViewer from '@/components/PanoramaViewer.vue'

const scenes = [
  {
    sceneId: 'main_entrance',
    imagePath: "/images/panorama1.jpg",
    hotspots: [
      {
        id: '1',
        longitude: 120,
        latitude: 30,
        title: '图书馆',
        description: '这是图书馆的位置'
      }
    ]
  }
]
</script>
```

## 使用示例

### 基础用法
```vue
<PanoramaViewer :scenes="scenes" />
```

### 自定义参数
```vue
<PanoramaViewer 
  :scenes="scenes"
  :initialFov="60"
  :minFov="45"
  :maxFov="120"
  :rotateSpeed="-0.2"
  :zoomSpeed="1.5"
  :dampingFactor="0.15"
  :fovDampingFactor="0.15"
/>
```

## Props 参数说明

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| scenes | Scene[] | 是 | - | 场景数组 |
| initialFov | number | 否 | 75 | 初始视场角（Field of View） |
| minFov | number | 否 | 30 | 最小视场角，限制最大缩放程度 |
| maxFov | number | 否 | 90 | 最大视场角，限制最小缩放程度 |
| rotateSpeed | number | 否 | -0.15 | 旋转速度，负值表示反向旋转 |
| zoomSpeed | number | 否 | 2.0 | 缩放速度 |
| dampingFactor | number | 否 | 0.1 | 旋转阻尼系数，值越大阻尼效果越强 |
| fovDampingFactor | number | 否 | 0.1 | 缩放阻尼系数，值越大阻尼效果越强 |
| debug | boolean | 否 | false | 是否启用调试模式 |

## Events 事件说明

| 事件名 | 参数 | 说明 |
|--------|------|------|
| sceneChange | (index: number) => void | 场景切换时触发，参数为场景索引 |
| error | (message: string) => void | 发生错误时触发，参数为错误信息 |

## Methods 方法说明

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| switchScene | index: number \| string | void | 切换场景，参数可以是场景索引或场景ID |
| showError | message: string | void | 显示错误信息 |
| hideError | - | void | 隐藏错误信息 |
| getCurrentSceneId | - | string | 获取当前场景的ID |

### Scene 接口说明

场景（Scene）是全景图查看器中的基本单位，每个场景包含一个唯一标识符、一张全景图和对应的热点信息。

#### Scene 接口定义

```typescript
interface Scene {
  sceneId: string;     // 场景唯一标识符
  imagePath: string;   // 全景图片的路径
  hotspots?: HotSpot[]; // 热点数组
}
```

### HotSpot 接口说明

热点（HotSpot）是全景图中的可交互标记点，用于标识特定位置或提供额外信息。

#### HotSpot 接口定义

```typescript
interface HotSpot {
  id: string;          // 热点唯一标识符
  type: string;        // 热点类型，目前支持 "scene"
  longitude: number;   // 经度坐标 (-180 到 180)
  latitude: number;    // 纬度坐标 (-90 到 90)
  icon?: string;       // 图标路径（可选）
  title?: string;      // 热点标题（可选）
  description?: string; // 热点描述（可选）
  targetSceneId?: string; // 目标场景ID（当type为"scene"时必填）
  onClick?: (params?: any) => void; // 点击处理函数（可选）
  onClickParams?: any; // 传递给点击处理函数的参数（可选）
}
```

#### 热点类型说明

目前支持的热点类型：
- `"scene"`: 场景切换热点，点击后切换到指定场景
  - 必须提供 `targetSceneId` 参数，指定要切换到的场景ID
  - 如果未提供 `targetSceneId` 或目标场景不存在，会显示错误信息
- `"custom"`: 自定义热点，没有预设逻辑，完全依赖用户自定义的点击处理函数
  - 可以提供 `onClick` 处理函数，用于处理点击事件
  - 可以提供 `onClickParams` 参数，在点击时传递给处理函数
  - 点击时会触发 `hotspotClick` 事件，并传递整个热点对象

#### 使用示例

```typescript
const hotspots = [
  // 场景切换热点
  {
    id: '1',
    type: 'scene',
    longitude: 120,
    latitude: 30,
    title: '图书馆',
    description: '这是图书馆的位置',
    targetSceneId: 'library', // 切换到ID为library的场景
    icon: '/icons/arrow_hotspot.png'
  },
  // 自定义热点
  {
    id: '2',
    type: 'custom',
    longitude: 80,
    latitude: 20,
    title: '信息点',
    description: '这是一个信息点',
    icon: '/icons/info_hotspot.png',
    onClick: (hotspot) => {
      console.log('点击了自定义热点:', hotspot);
      // 在这里添加自定义逻辑
    }
  }
];
```

## 错误处理

PanoramaViewer 组件提供了内置的错误处理机制，当发生错误时，错误信息会完全替代全景图显示。错误会在以下情况下显示：

1. 场景ID重复
2. 图片加载失败
3. 场景切换失败
4. 其他运行时错误

错误信息会以全屏提示的形式显示，直到错误被解决或手动清除。可以通过 `showError` 和 `hideError` 方法手动控制错误信息的显示和隐藏。

## 使用示例

### 错误处理
```vue
<template>
  <PanoramaViewer 
    :scenes="scenes"
    @error="handleError"
    ref="panoramaViewer"
  />
</template>

<script setup lang="ts">
const panoramaViewer = ref();

// 处理错误
const handleError = (message: string) => {
  console.error('PanoramaViewer Error:', message);
  // 可以在这里添加自定义的错误处理逻辑
};

// 手动显示错误
const showCustomError = () => {
  panoramaViewer.value?.showError('自定义错误信息');
};

// 手动清除错误
const clearError = () => {
  panoramaViewer.value?.hideError();
};

// 获取当前场景ID
const getSceneId = () => {
  const currentSceneId = panoramaViewer.value?.getCurrentSceneId();
  console.log('当前场景ID:', currentSceneId);
  return currentSceneId;
};
</script>
```

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

## Debug 模式

在开发过程中，为了方便设置热点的位置，组件提供了debug模式。

### 启用 Debug 模式

```vue
<template>
  <PanoramaViewer 
    imagePath="/images/panorama.jpg"
    :debug="true"
  />
</template>
```

### Debug 模式功能

当debug模式启用时：

1. **获取坐标**
   - 点击全景图任意位置，会自动获取该位置的经纬度坐标
   - 坐标会自动复制到剪贴板
   - 会显示提示消息"坐标已复制到剪贴板"

2. **坐标格式**
   ```typescript
   longitude: number, latitude: number
   ```
   - longitude: 经度 (-180 到 180)
   - latitude: 纬度 (-90 到 90)

3. **使用示例**
   ```vue
   <template>
     <PanoramaViewer 
       imagePath="/images/panorama.jpg"
       :debug="true"
       :hotspots="hotspots"
     />
   </template>

   <script setup lang="ts">
   const hotspots = [
     {
       id: '1',
       // 从debug模式复制的坐标
       longitude: 120,
       latitude: 30,
       title: '图书馆'
     }
   ];
   </script>
   ```

### 最佳实践

1. **开发流程**
   - 在开发环境中启用debug模式
   - 点击需要添加热点的位置
   - 复制获取的坐标
   - 将坐标添加到热点数据中

2. **注意事项**
   - debug模式仅用于开发环境
   - 在生产环境中应禁用debug模式
   - 点击已有热点时不会触发坐标获取
