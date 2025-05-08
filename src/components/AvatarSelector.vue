<template>
  <el-dialog 
    title="选择头像" 
    v-model="dialogVisible" 
    width="800px"
    center
    custom-class="avatar-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="true"
  >
    <div class="avatar-gallery">
      <div 
        v-for="(avatar, index) in avatarOptions" 
        :key="index" 
        class="avatar-option"
        :class="{ 'selected': selectedAvatar === avatar }"
        @click="selectAvatar(avatar)"
      >
        <div class="avatar-wrapper">
          <el-avatar :src="avatar" :size="90"></el-avatar>
          <div class="avatar-overlay">
            <el-icon><Check /></el-icon>
          </div>
        </div>
      </div>
    </div>
    
    <div class="dialog-footer-center">
      <el-button @click="cancel" round>
        <el-icon><Close /></el-icon> 取消
      </el-button>
      <el-button type="primary" @click="confirm" round :disabled="!selectedAvatar">
        <el-icon><Check /></el-icon> 确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Check, Close } from '@element-plus/icons-vue'

export default {
  name: 'AvatarSelector',
  components: {
    Check, Close
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    avatarOptions: {
      type: Array,
      default: () => [
        '/images/avatar/avatar1.jpg',
        '/images/avatar/avatar2.jpg',
        '/images/avatar/avatar3.jpg',
        '/images/avatar/avatar4.jpg'
      ]
    },
    currentAvatar: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectedAvatar: ''
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      }
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.selectedAvatar = this.currentAvatar;
      }
    }
  },
  methods: {
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
    },
    confirm() {
      if (this.selectedAvatar) {
        this.$emit('confirm', this.selectedAvatar);
      }
      this.dialogVisible = false;
    },
    cancel() {
      this.dialogVisible = false;
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
.avatar-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 30px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 12px;
}

.avatar-option {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.avatar-wrapper {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s ease;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 50%;
}

.avatar-overlay .el-icon {
  color: #409EFF;
  font-size: 24px;
  transform: scale(0.5);
  transition: transform 0.3s ease;
}

.avatar-option:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.avatar-option:hover .avatar-overlay {
  opacity: 1;
}

.avatar-option:hover .avatar-overlay .el-icon {
  transform: scale(1);
}

.avatar-option.selected {
  background: #f5f7fa;
  border: 2px solid #409EFF;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.15);
}

.avatar-option.selected .avatar-overlay {
  opacity: 1;
  background: rgba(255, 255, 255, 0.8);
}

.avatar-option.selected .avatar-overlay .el-icon {
  transform: scale(1);
}

.dialog-footer-center {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 20px;
}

.dialog-footer-center .el-button {
  padding: 12px 30px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.dialog-footer-center .el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 自定义对话框样式 */
:deep(.avatar-dialog) {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

:deep(.avatar-dialog .el-dialog__header) {
  background: linear-gradient(135deg, #409EFF 0%, #53a8ff 100%);
  color: white;
  padding: 20px;
  margin: 0;
}

:deep(.avatar-dialog .el-dialog__title) {
  color: white;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.5px;
}

:deep(.avatar-dialog .el-dialog__body) {
  padding: 30px;
  background: #fff;
}

:deep(.avatar-dialog .el-dialog__headerbtn) {
  top: 20px;
  right: 20px;
}

:deep(.avatar-dialog .el-dialog__headerbtn .el-dialog__close) {
  color: white;
  font-size: 20px;
}

:deep(.avatar-dialog .el-dialog__headerbtn:hover .el-dialog__close) {
  color: #f0f9ff;
  transform: rotate(90deg);
}

/* 添加动画效果 */
:deep(.el-dialog) {
  animation: dialogFadeIn 0.3s ease-out;
}

@keyframes dialogFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式布局 */
@media (max-width: 768px) {
  .avatar-gallery {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
  }

  :deep(.avatar-dialog) {
    width: 90% !important;
    margin: 0 auto;
  }
}
</style> 