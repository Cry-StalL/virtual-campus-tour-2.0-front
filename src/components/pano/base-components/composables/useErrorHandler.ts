import { ref } from 'vue';

export function useErrorHandler(emit: (...args: any[]) => void) {
  const errorMessage = ref<string>('');
  let errorTimeout: number | null = null;

  // 显示错误信息
  const showError = (message: string) => {
    errorMessage.value = message;
    emit('error', message);
  };

  // 隐藏错误信息
  const hideError = () => {
    errorMessage.value = '';
  };

  // 显示临时错误信息，在指定时间后自动消失
  const showTemporaryError = (message: string, duration: number = 3000) => {
    showError(message);
    
    // 清除之前的计时器
    if (errorTimeout) {
      clearTimeout(errorTimeout);
    }
    
    // 设置新的计时器
    errorTimeout = window.setTimeout(() => {
      hideError();
    }, duration);
  };

  return {
    errorMessage,
    showError,
    hideError,
    showTemporaryError
  };
} 