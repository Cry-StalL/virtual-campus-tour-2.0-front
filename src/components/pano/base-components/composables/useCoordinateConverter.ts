import * as THREE from 'three';
import type { Ref } from 'vue';

export function useCoordinateConverter(
  camera: Ref<THREE.PerspectiveCamera | null>,
  renderer: Ref<THREE.WebGLRenderer | null>,
  scene: Ref<THREE.Scene | null>
) {
  /**
   * 将经纬度转换为Three.js球面坐标（顺时针为正方向）
   *
   * 说明：
   * - Three.js的球面坐标theta=0指向z轴正方向，phi=0指向y轴正方向。
   * - 地理经纬度通常经度为东正西负，纬度为北正南负。
   * - 为了让“经度增加为顺时针”，theta = (-lon + 180) * Math.PI / 180。
   *
   * 【视角原理说明】
   * - Three.js相机是“站在球面上看球心”，你设置相机在球面(lon, lat)点，看到的是球心方向。
   * - 如果你希望“初始视角”参数表示“用户一进来看到的方向”，
   *   实际上要让相机站在与(lon, lat)对称的球面点（即-lat, lon+180），并lookAt球心。
   * - 这样，用户看到的正是(lon, lat)方向。
   *
   * 这不是经验修正，而是三维球面坐标和相机lookAt原理决定的。
   */
  const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (-lon + 180) * Math.PI / 180;
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
  };

  /**
   * 将Three.js球面坐标转换为经纬度（顺时针为正方向）
   *
   * 说明：
   * - 反变换时，经度取负，保证与latLonToVector3一致。
   */
  const vector3ToLatLon = (point: THREE.Vector3): { longitude: number; latitude: number } => {
    const normalized = point.clone().normalize();
    const latitude = 90 - (Math.acos(normalized.y) * 180) / Math.PI;
    const longitude = -((Math.atan2(normalized.z, -normalized.x) * 180) / Math.PI);
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