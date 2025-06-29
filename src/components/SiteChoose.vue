<template>
  <div class="full_contain" v-show="!isMobileDevice" ref="full_contain_ref">
    <!-- 删除按钮 -->
    <div class="delete-button">
      <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click="closeSiteChooseView">
        <img style="width: 2vw; height: 2vw;" src="../../assets/icons/delete.png">
      </el-button>
    </div>


    <div class="contain_body_map" >
      <!-- 搜索框放在图片右上角 -->
      <div style="position: absolute; right: 8vw; top: 5vh; z-index: 100;">
        <el-input
          v-model="searchQuery"
          placeholder="搜索地点或学院名称"
          @input="handleSearch"
          style="width: 12vw;"
        >
          <template #prefix>
            <img src="../../assets/icons/search.png" alt="搜索图标" style="width: 1.2vh; height: 1.2vh;">
          </template>
        </el-input>
      </div>

      <!-- 背景图片 -->
      <img src="https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/background.jpg">
      
      <!-- 新增的弹出确认组 -->
      <div class="popconfirm-group" v-show="showPopconfirm">
        <el-popconfirm
          v-for="location in locations"
          :key="location.id"
          :hide-icon="true"
          width="200"
          placement="right"
          trigger="hover"
        >
          <template #reference>
            <el-button 
              style="position: absolute; 
                     background-color: rgba(0, 0, 0, 0); 
                     border: 0; 
                     padding: 0; 
                     margin: 0; 
                     width:30px; 
                     height: 30px;
                     "
              :style="{
                left: `${contain_body_map_padding_left + contain_body_map_ref_width * location.left - 15}px`, 
                top: `${contain_body_map_ref_height * location.top - 15}px`
              }"
            >
              <img src="../../assets/icons/click.gif" style="width:30px; height: 30px;">
            </el-button>
          </template>

          <template #actions="{ confirm, cancel }">
            <el-container style="height: 8px; display: flex; align-items: center; justify-content: space-between;">
              <el-text>{{ location.name }}</el-text>
              <div>
                <el-button style="width: 80px; height: 25px; font-size: 15px;" @click="confirm(); handleConfirm(location)">点击跳转</el-button>
              </div>
            </el-container>
            <el-container style="width: 100%; height: 5px;"></el-container>
          </template>
        </el-popconfirm>
      </div>

      <div class="popconfirm-group" v-show="!showPopconfirm">
        <el-popconfirm
          v-for="location in search_locations"
          :key="location.id"
          :hide-icon="true"
          width="200"
          placement="right"
          trigger="hover"
        >
          <template #reference>
            <el-button 
              style="position: absolute; 
                     background-color: rgba(0, 0, 0, 0); 
                     border: 0; 
                     padding: 0; 
                     margin: 0; 
                     width:30px; 
                     height: 30px;"
              :style="{
                left: `${contain_body_map_padding_left + contain_body_map_ref_width * location.left - 15}px`, 
                top: `${contain_body_map_ref_height * location.top - 15}px`
              }"
            >
            </el-button>
          </template>

          <template #actions="{ confirm, cancel }">
            <el-container style="height: 8px; display: flex; align-items: center; justify-content: space-between;">
              <el-text>{{ location.name }}</el-text>
              <div>
                <el-button size="small" @click="confirm(); handleConfirm(location)">点击跳转</el-button>
              </div>
            </el-container>
            <el-container style="width: 100%; height: 5px;"></el-container>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>

  <div class="full_contain" v-show="isMobileDevice" ref="full_contain_ref2">
    <!-- 删除按钮 -->
    <div class="delete-button">
      <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click="closeSiteChooseView">
        <img style="width: 2vw; height: 2vw;" src="../../assets/icons/delete.png">
      </el-button>
    </div>

    <div class="contain_body_map">
      <!-- 搜索框放在图片右上角 -->
      <div style="position: absolute; right: 1vw; bottom: 12vh; z-index: 100; transform: rotate(90deg); transform-origin: right top;">
        <el-input
          v-model="searchQuery"
          placeholder="搜索地点或学院名称"
          @input="handleSearch"
          style="width: 20vh;"
        >
          <template #prefix>
            <img src="../../assets/icons/search.png" alt="搜索图标" style="width: 1.2vh; height: 1.2vh;">
          </template>
        </el-input>
      </div>

      <!-- 背景图片 -->
      <img src="https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/background2.jpg">

      <!-- 新增的弹出确认组 -->
      <div class="popconfirm-group" v-show="showPopconfirm">
        <el-popconfirm
          v-for="location in locations"
          :key="location.id"
          :hide-icon="true"
          width="200"
          placement="right"
          trigger="hover"
        >
          <template #reference>
            <el-button 
              style="position: absolute; 
                     background-color: rgba(0, 0, 0, 0); 
                     border: 0; 
                     padding: 0; 
                     margin: 0; 
                     width: 20px; 
                     height: 20px;
                     "
              :style="{
                top: `${contain_body_map_padding_top2 + contain_body_map_ref_height2 * location.left - 10}px`, 
                right: `${contain_body_map_ref_height2 * location.top - 10}px`
              }"
            >
              <img src="../../assets/icons/click.gif" style="width:20px; height: 20px;">
            </el-button>
          </template>

          <template #actions="{ confirm, cancel }">
            <el-container style="height: 8px; display: flex; align-items: center; justify-content: space-between;">
              <el-text>{{ location.name }}</el-text>
              <div>
                <el-button style="width: 80px; height: 25px; font-size: 15px;" @click="handleConfirm(location)">点击跳转</el-button>
              </div>
            </el-container>
            <el-container style="width: 100%; height: 5px;"></el-container>
          </template>
        </el-popconfirm>
      </div>
    </div>
    

  </div>


</template>


<script setup lang="ts">
    
    import { onMounted, onBeforeUnmount, ref, computed } from 'vue';

    // 定义地点类型
    interface Location {
        name: string;
        text: string;
        id: number;
        left: number;
        top: number;
    }

    // 声明window上的streetViewer属性
    declare global {
        interface Window {
            streetViewer?: {
                switchScene: (name: string) => void;
            };
        }
    }


    // 搜索相关
    const searchQuery = ref('');
    const searchResults = ref<Location[]>([]);
    const showPopconfirm = computed(() => searchQuery.value.trim() === '');
    const handleSearch = () => {
        if (!searchQuery.value.trim()) {
            searchResults.value = [];
            search_locations.value = []; // 清空搜索结果
            
            return;
        }

        // 模糊匹配搜索
        const results = locations.filter(location => 
            location.text.includes(searchQuery.value.trim())
        );
        searchResults.value = results;
        search_locations.value = results; // 将匹配结果赋值给 search_locations
    };

    // 地点相关
    const locations = [
        { name: '南门', streetSceneId: 'rh-1-36', text: '南门', id: 1, left: 0.325, top: 0.7 },
        { name: '彩虹门', streetSceneId: 'rh-1-33', text: '彩虹门', id: 2, left: 0.345, top: 0.66 },
        { name: '图书馆', streetSceneId: 'rh-1-31',text: '图书馆', id: 3, left: 0.385, top: 0.58 },

        { name: '若海', streetSceneId: 'rh-6-1',text: '若海', id: 4, left: 0.535, top: 0.56 },
        { name: '海琴一号', streetSceneId: 'hq-1-6',text: '海琴一号，土木工程学院', id: 5, left: 0.745, top: 0.44 },
        { name: '海琴二号',streetSceneId: 'hq-1-2', text: '海琴二号，大气科学学院，数学学院（珠海），珠数，数珠', id: 6, left: 0.71, top: 0.47 },
        { name: '海琴三号',streetSceneId: 'hq-2-23', text: '海琴三号，海洋科学学院，海洋工程与技术学院，海科，海工', id: 7, left: 0.66, top: 0.535 },
        { name: '海琴四号', streetSceneId: 'hq-2-16',text: '海琴四号，地球科学与工程，地科，南方海洋实验室', id: 8, left: 0.62, top: 0.60 },
        { name: '海琴五号', streetSceneId: 'hq-2-9',text: '海琴五号，化学工程与技术学院，化工', id: 9, left: 0.58, top: 0.68 },
        { name: '若海食堂',streetSceneId: 'rh-3-3', text: '若海食堂，小肥羊，黄记煌', id: 10, left: 0.485, top: 0.685 },
        { name: '海琴六号', streetSceneId: 'rh-2-9',text: '海琴六号，国际翻译学院，国翻，历史学系（珠海），珠历，历珠，国际金融学院，国金，旅游学院，旅院，中国语言文学系（珠海），文珠，珠文，国际关系学院，国关，哲学系（珠海），哲珠，珠哲，“一带一路”研究院，一带一路研究院', id: 11, left: 0.435, top: 0.75 },
        { name: '音乐厅', streetSceneId: 'hl-1-1',text: '音乐厅', id: 12, left: 0.38, top: 0.44 },
        { name: '教学楼', streetSceneId: 'yxdd-1-59',streetSceneId: 'yxdd-1-59',text: '教学楼，网络信息服务中心，岐关车乘车点，岐关车，瑞幸咖啡，瑞幸，满忆糖水，满忆，实验室', id: 13, left: 0.49, top: 0.38 },
        { name: '中山像', streetSceneId: 'jy-1-7',text: '中山像', id: 14, left: 0.56, top: 0.38 },
        { name: '槿园一二号',streetSceneId: 'jy-2-2', text: '槿园一二号，打印，文印中心', id: 15, left: 0.62, top: 0.33 },
        { name: '槿园食堂', streetSceneId: 'jy-2-4',text: '槿园食堂，古茗', id: 16, left: 0.64, top: 0.36 },
        { name: '槿园三四号', streetSceneId: 'jy-2-10',text: '槿园三四号，711，满忆糖水，满忆，便利店', id: 17, left: 0.67, top: 0.37 },
        { name: '体育场', streetSceneId: 'jy-1-1',text: '体育场', id: 18, left: 0.565, top: 0.33 },
        { name: '体育馆', streetSceneId: 'tyg-2-1',text: '体育馆', id: 19, left: 0.62, top: 0.395 },

        { name: '天琴中心', streetSceneId: 'tq-1-17',text: '天琴中心', id: 20, left: 0.165, top: 0.175 },
        { name: '天琴湖（沕水）', streetSceneId: 'yxdd-1-1',text: '天琴湖（沕水）', id: 21, left: 0.215, top: 0.185 },
        { name: '风雨球场', streetSceneId: 'hl-2-15',text: '风雨球场', id: 22, left: 0.225, top: 0.24 },
        { name: '翰林三号', streetSceneId: 'yxdd-3-22',text: '翰林三号，物理与天文学院，物天，中法核工程与技术学院，中法核，测绘科学与技术学院，测绘', id: 23, left: 0.29, top: 0.25 },
        { name: '翰林二号', streetSceneId: 'yxdd-3-17',text: '翰林二号，微电子科学与技术学院，微电子，软件工程学院，软工，人工智能学院，人智', id: 24, left: 0.335, top: 0.285 },
        { name: '岁月湖', streetSceneId: 'yxdd-3-15',text: '岁月湖', id: 25, left: 0.37, top: 0.305 },
        { name: '翰林一号', streetSceneId: 'yxdd-3-7',text: '翰林一号，珠海校区管委会，基建处，总务处，财务处，教务处，保卫处', id: 26, left: 0.39, top: 0.345 },
        { name: '隐湖', streetSceneId: 'yxdd-3-3',text: '隐湖', id: 27, left: 0.44, top: 0.39 },

        { name: '博雅苑', streetSceneId: 'byy-1-17',text: '博雅苑', id: 28, left: 0.50, top: 0.1 },
        { name: '校医院', streetSceneId: 'byy-1-13',text: '校医院', id: 29, left: 0.445, top: 0.115 },
        { name: '榕园宿舍', streetSceneId: 'ry-1-9',text: '榕园宿舍', id: 30, left: 0.36, top: 0.17 },
        { name: '榕园广场', streetSceneId: 'rh-1-1',text: '榕园广场', id: 31, left: 0.315, top: 0.215 },
        { name: '榕园食堂', streetSceneId: 'rh-1-1',text: '榕园食堂', id: 32, left: 0.34, top: 0.22 },
        { name: '得一超市', streetSceneId: 'yxdd-1-35',text: '得一超市，瑞幸咖啡，瑞幸，罗森，便利店，中国邮政，打印，文印中心，面包店，维修店，美发店', id: 33, left: 0.40, top: 0.26 },
        { name: '荔园宿舍', streetSceneId: 'ly-3-12',text: '荔园宿舍', id: 34, left: 0.45, top: 0.25 },
        { name: '荔园食堂', streetSceneId: 'ly-2-13',text: '荔园食堂，快递站', id: 35, left: 0.495, top: 0.265 },
        { name: '篮球场', streetSceneId: 'ly-2-9',text: '篮球场', id: 36, left: 0.48, top: 0.29 },

        { name: '北门', streetSceneId: 'jy-2-23',text: '北门', id: 37, left: 0.65, top: 0.35 },
        { name: '东北门', streetSceneId: 'hq-1-7',text: '东北门', id: 38, left: 0.785, top: 0.47 },
        { name: '华夏门', streetSceneId: 'byy-2-6',text: '华夏门', id: 39, left: 0.55, top: 0.09 },
        { name: '东南门', streetSceneId: 'hq-2-1',text: '东南门', id: 40, left: 0.535, top: 0.755 }
    ];
    const search_locations = ref<Location[]>([]);


    const isMobileDevice = ref(false)
    onMounted(() => {
        get_images_from_back();
        const ua = navigator.userAgent
        isMobileDevice.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
        window.addEventListener('load', () => {
          if (full_contain_ref2.value) {
              console.log("full_contain_ref2.value.clientHeight after load:", full_contain_ref2.value.clientHeight);
          }
        });
    });

    // 计算闪烁点相关
    const full_contain_ref = ref<HTMLDivElement | null>(null)
    var full_contain_ref_width = ref(0);
    var full_contain_ref_height = ref(0);
    var contain_body_map_ref_width = ref(0);    
    var contain_body_map_ref_height = ref(0);
    var contain_body_map_padding_left = ref(0);

    const full_contain_ref2 = ref<HTMLDivElement | null>(null)
    var full_contain_ref_width2 = ref(0);
    var full_contain_ref_height2 = ref(0);
    var contain_body_map_ref_width2 = ref(0);    
    var contain_body_map_ref_height2 = ref(0);
    var contain_body_map_padding_top2 = ref(0);
    const get_images_from_back = () => { 
        // 动态调整背景图片的宽度和高度
        if (full_contain_ref.value){
            full_contain_ref_height.value = full_contain_ref.value.clientHeight;
            full_contain_ref_width.value = full_contain_ref.value.clientWidth;
            contain_body_map_ref_height.value = full_contain_ref_height.value;
            contain_body_map_ref_width.value = contain_body_map_ref_height.value / 5.0 * 7;
            contain_body_map_padding_left.value = (full_contain_ref_width.value - contain_body_map_ref_width.value) / 2;
            // console.log("contain_body_map_padding_left.value:", contain_body_map_padding_left.value)
          }
        if (full_contain_ref2.value){
            // console.log("full_contain_ref2.value.clientHeight:", full_contain_ref2.value.clientHeight)
            full_contain_ref_height2.value = full_contain_ref2.value.clientHeight;
            // console.log("full_contain_ref_height2.value:", full_contain_ref_height2.value)
            full_contain_ref_width2.value = full_contain_ref2.value.clientWidth;
            // console.log("full_contain_ref_width2.value:", full_contain_ref_width2.value)
            contain_body_map_ref_width2.value = full_contain_ref_width2.value;
            contain_body_map_ref_height2.value = contain_body_map_ref_width2.value / 5.0 * 7;
            contain_body_map_padding_top2.value = (full_contain_ref_height2.value - contain_body_map_ref_height2.value) / 2;
            // console.log("contain_body_map_padding_top2.value:", contain_body_map_padding_top2.value)
           
        }
    };  

    // 跳转相关
    const handleConfirm = (location: Location) => {
        console.log('正在跳转到:', location.name, location.streetSceneId);
        
        // 先关闭sidebar和地图
        emit('closeSiteChooseView');
        
        // 延迟后开始跳转逻辑
        setTimeout(() => {
            // 获取当前的viewer组件
            const viewerGroup = (window as any).viewerGroup;
            if (!viewerGroup) {
                console.error('无法获取viewerGroup');
                return;
            }
            
            // 检查当前是否在street viewer中
            const currentViewer = viewerGroup.currentViewer;
            console.log('当前viewer:', currentViewer);
            
            if (currentViewer !== 'street') {
                // 如果不在street viewer中，先切换到street viewer
                console.log('当前不在street viewer，先切换到street viewer');
                viewerGroup.switchViewer('street');
                
                // 等待切换完成后再跳转场景
                setTimeout(() => {
                    if ((window as any).streetViewer && location.streetSceneId) {
                        console.log('切换到street viewer完成，跳转场景:', location.streetSceneId);
                        (window as any).streetViewer.switchScene(location.streetSceneId);
                    }
                }, 500); // 给一点时间让viewer切换完成
            } else {
                // 如果已经在street viewer中，直接跳转场景
                if ((window as any).streetViewer && location.streetSceneId) {
                    console.log('已在street viewer中，直接跳转场景:', location.streetSceneId);
                    (window as any).streetViewer.switchScene(location.streetSceneId);
                }
            }
        }, 300); // 先等待页面关闭动画完成，再开始跳转
    }

    // 删除
    const emit = defineEmits([
      'closeSiteChooseView',
    ]);
    const closeSiteChooseView = () => {
        emit('closeSiteChooseView');
    };



</script>


<style >
.full_contain{
    /* background-color: rgb(242, 245, 252); */
    background-image: url('../../assets/background.png');
    border-radius: 0;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}


.contain_body_map{
    /* background-color: rgb(242, 245, 252); */
    border-radius: 0;
    overflow-y: auto;
    height: 100%;
    width: 100%;
}

.contain_body_map img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保图片完整显示不裁剪 */
  display: block;      /* 去除底部空白间隙 */
}

.el-input__wrapper:focus {
  border-color: #F1F0EB !important;
}

.contain_body_site{
    margin-top: 2vh;
    width: 64vw; 
    height: 100vh;
}

/* 移动端样式 */
@media screen and (max-width: 768px) and (orientation: portrait) {
  .delete-button {
    position: absolute;
  }
  .delete-button img {
    width: 20px !important;
    height: 20px !important;
  }

  .contain_body_map{
    /* background-color: rgb(242, 245, 252); */
    border-radius: 0;
    overflow-y: auto;
    height: 100%;
    width: 100%;
  }

  .contain_body_map img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* 确保图片完整显示不裁剪 */
    display: block;      /* 去除底部空白间隙 */
  }
}

/* 加速悬浮框关闭动画 */
:deep(.el-popper) {
  transition: all 0.1s ease !important;
}

:deep(.el-popconfirm) {
  transition: all 0.1s ease !important;
}

/* 针对淡入淡出动画 */
:deep(.el-popper.is-pure) {
  transition: opacity 0.1s ease !important;
}

/* 针对Vue的transition动画 */
:deep(.fade-in-linear-enter-active),
:deep(.fade-in-linear-leave-active) {
  transition: opacity 0.1s ease !important;
}

</style>




