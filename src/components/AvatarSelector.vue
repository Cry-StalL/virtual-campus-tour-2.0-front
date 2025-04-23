<template>
  <el-dialog 
    title="选择头像" 
    v-model="dialogVisible" 
    width="800px"
    center
    custom-class="avatar-dialog"
  >
    <div class="avatar-gallery">
      <div 
        v-for="(avatar, index) in avatarOptions" 
        :key="index" 
        class="avatar-option"
        :class="{ 'selected': selectedAvatar === avatar }"
        @click="selectAvatar(avatar)"
      >
        <el-avatar :src="avatar" :size="90"></el-avatar>
      </div>
    </div>
    
    <div class="dialog-footer-center">
      <el-button @click="cancel" round>
        <el-icon><Close /></el-icon> 取消
      </el-button>
      <el-button type="primary" @click="confirm" round>
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
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
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
  gap: 25px;
  margin-bottom: 25px;
  padding: 20px;
}

.avatar-option {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  border-radius: 12px;
  transition: all 0.3s;
}

.avatar-option:hover {
  background-color: #f0f9ff;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.avatar-option.selected {
  background-color: #e1f3d8;
  border: 2px solid #67c23a;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.dialog-footer-center {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}

/* 自定义对话框样式 */
:deep(.avatar-dialog) {
  border-radius: 15px;
  overflow: hidden;
}

:deep(.avatar-dialog .el-dialog__header) {
  background-color: #409EFF;
  color: white;
  padding: 15px 20px;
}

:deep(.avatar-dialog .el-dialog__title) {
  color: white;
  font-weight: 600;
}

:deep(.avatar-dialog .el-dialog__body) {
  padding: 30px;
}
</style> 