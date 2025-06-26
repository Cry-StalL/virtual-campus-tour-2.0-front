import { ref, nextTick } from 'vue';

export function useSceneEditor(configRef: any) {
  const showSceneListModal = ref(false);
  const sceneList = ref<any[]>([]);
  const panoramaViewerRef = ref();
  const fileInputRef = ref<HTMLInputElement | null>(null);
  const fileMode = ref<'file' | 'dir'>('dir');
  const fileTargetIdx = ref<number>(-1);
  const currentSceneIdx = ref(0);

  const openSceneList = () => {
    if (!configRef.value || !Array.isArray(configRef.value.scenes)) return;
    sceneList.value = configRef.value.scenes;
    showSceneListModal.value = true;
  };
  const closeSceneList = () => {
    showSceneListModal.value = false;
  };
  const deleteScene = (idx: number) => {
    if (!configRef.value || !Array.isArray(configRef.value.scenes)) return;
    const scene = configRef.value.scenes[idx];
    if (!scene) return;
    const ok = window.confirm(`确定要删除场景“${scene.sceneId || '(未设置sceneId)'}”吗？`);
    if (ok) {
      configRef.value.scenes.splice(idx, 1);
      sceneList.value = configRef.value.scenes;
    }
  };
  const addScene = async (jumpToScene: (idx: number) => void) => {
    if (!configRef.value || !Array.isArray(configRef.value.scenes)) return;
    const scenes = configRef.value.scenes;
    let newSceneId = '';
    let autoSuggest = false;
    if (scenes.length > 0) {
      const lastId = scenes[scenes.length - 1].sceneId;
      const match = lastId.match(/^(.*)-(\d+)-(\d+)$/);
      if (match) {
        const prefix = match[1];
        const num1 = match[2];
        const num2 = match[3];
        const nextNum2 = String(Number(num2) + 1);
        newSceneId = `${prefix}-${num1}-${nextNum2}`;
        autoSuggest = true;
        const res = window.confirm(`自动设置sceneId为“${newSceneId}”？\n选择“确定”自动设置，选择“取消”手动输入。`);
        if (res) {
          scenes.push({
            sceneId: newSceneId,
            relativeImagePath: '',
            hotspots: []
          });
          jumpToScene(scenes.length - 1);
          return;
        }
      }
    }
    let manualId = window.prompt('请输入新场景的sceneId：', '');
    if (manualId && manualId.trim()) {
      scenes.push({
        sceneId: manualId.trim(),
        relativeImagePath: '',
        hotspots: []
      });
      jumpToScene(scenes.length - 1);
    }
  };
  const selectPanoramaCurrent = async () => {
    if (!configRef.value || !Array.isArray(configRef.value.scenes)) return;
    let idx = currentSceneIdx.value;
    if (idx < 0 || idx >= configRef.value.scenes.length) idx = 0;
    const inputPath = window.prompt('请输入当前场景的 relativeImagePath：', configRef.value.scenes[idx]?.relativeImagePath || '');
    if (inputPath && configRef.value.scenes[idx]) {
      configRef.value.scenes[idx].relativeImagePath = inputPath.trim();
    }
  };
  const onFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (!input || !input.files || fileTargetIdx.value < 0) return;
    let relPath = '';
    // 只保留 assets/panos/ 及其后所有多级目录
    const PANOS_PREFIX = 'assets/panos/';
    if (fileMode.value === 'dir') {
      const file = input.files[0];
      if (file && (file as any).webkitRelativePath) {
        const fullPath = (file as any).webkitRelativePath;
        console.log('Full path:', fullPath);
        const idx = fullPath.indexOf(PANOS_PREFIX);
        if (idx >= 0) {
          // 保留 assets/panos/ 后的所有目录
          const dir = fullPath.slice(idx, fullPath.lastIndexOf('/'));
          relPath = dir;
        } else {
          relPath = PANOS_PREFIX + fullPath.split('/').slice(0, -1).join('/');
        }
      }
    } else {
      const file = input.files[0];
      if (file) {
        // 保证 assets/panos/ 作为前缀
        relPath = file.webkitRelativePath
          ? file.webkitRelativePath.substring(file.webkitRelativePath.indexOf(PANOS_PREFIX))
          : PANOS_PREFIX + file.name;
      }
    }
    if (relPath && configRef.value?.scenes[fileTargetIdx.value]) {
      configRef.value.scenes[fileTargetIdx.value].relativeImagePath = relPath;
    }
    fileTargetIdx.value = -1;
  };

  return {
    showSceneListModal,
    sceneList,
    panoramaViewerRef,
    fileInputRef,
    fileMode,
    fileTargetIdx,
    currentSceneIdx,
    openSceneList,
    closeSceneList,
    deleteScene,
    addScene,
    selectPanoramaCurrent,
    onFileChange
  };
}
