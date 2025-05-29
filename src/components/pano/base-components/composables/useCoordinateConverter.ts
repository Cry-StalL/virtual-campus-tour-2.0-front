import * as THREE from 'three';
import type { Ref } from 'vue';

export function useCoordinateConverter(
  camera: Ref<THREE.PerspectiveCamera | null>,
  renderer: Ref<THREE.WebGLRenderer | null>,
  scene: Ref<THREE.Scene | null>
) {
  // 将经纬度转换为3D坐标
  const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    
    return new THREE.Vector3(x, y, z);
  };

  // 将3D坐标转换为经纬度
  const vector3ToLatLon = (point: THREE.Vector3): { longitude: number; latitude: number } => {
    // 标准化向量
    const normalized = point.clone().normalize();
    
    // 计算经纬度
    const latitude = 90 - (Math.acos(normalized.y) * 180) / Math.PI;
    const longitude = ((Math.atan2(normalized.z, -normalized.x) * 180) / Math.PI);
    
    return {
      latitude: parseFloat(latitude.toFixed(2)),
      longitude: parseFloat(longitude.toFixed(2))
    };
  };

  // 将二维屏幕坐标转换为三维经纬度坐标
  const convertScreenToSphericalCoordinates = (screenX: number, screenY: number): { longitude: number; latitude: number } | null => {
    if (!camera.value || !renderer.value || !scene.value) return null;

    // 计算归一化的设备坐标
    const mouse = new THREE.Vector2();
    const rect = renderer.value.domElement.getBoundingClientRect();
    mouse.x = ((screenX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((screenY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera.value);

    // 直接使用射线方向计算经纬度坐标
    const direction = new THREE.Vector3();
    raycaster.ray.direction.normalize();
    direction.copy(raycaster.ray.direction);
    
    const coordinates = vector3ToLatLon(direction);
    
    // 修正经度值
    const correctedLongitude = coordinates.longitude - 180;
    // 规范化经度到 -180 到 180 范围内
    const normalizedLongitude = ((correctedLongitude + 540) % 360) - 180;
    
    return {
      longitude: parseFloat(normalizedLongitude.toFixed(2)),
      latitude: coordinates.latitude
    };
  };

  return {
    latLonToVector3,
    vector3ToLatLon,
    convertScreenToSphericalCoordinates
  };
} 