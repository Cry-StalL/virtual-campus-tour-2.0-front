// 工具：将对象保存为本地文件（仅限浏览器环境，使用a标签下载）
// 注意：浏览器只能下载到用户本地的下载目录，不能直接保存到项目的 /src/assets/data/ 目录
export function saveJsonToFile(obj: any, prefix: string) {
  const timestamp = getTimestampString();
  const filename = `${prefix}-${timestamp}.json`;
  const jsonStr = JSON.stringify(obj, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename; // 只指定文件名，不带路径
  a.click();
  URL.revokeObjectURL(url);
}

// 获取时间戳字符串，格式与读取逻辑一致（如 20240626153000）
export function getTimestampString() {
  const now = new Date();
  // 精确到秒，格式：yyyyMMddHHmmss
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}
