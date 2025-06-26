<template>
  <div class="full_contain" ref="full_contain_ref">
    <div class="contain_body_map">
      <!-- 搜索框放在图片右上角 -->
      <div style="position: absolute; right: 8vw; top: 5vh; z-index: 100;">
        <el-input
          v-model="searchQuery"
          placeholder="搜索地点或学院名称"
          @input="handleSearch"
          style="width: 200px;"
        />
      </div>

        <!-- 背景图片 -->
      <img src="../../assets/background.jpg">
      
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
                     height: 30px;"
              :style="{
                left: `${contain_body_map_padding_left + contain_body_map_ref_width * location.left - 15}px`, 
                top: `${contain_body_map_ref_height * location.top - 15}px`
              }"
            >
              <img v-show="location.id % 4 === 0"
                src="../../assets/icons/click-0.gif" 
                style="width:30px; height: 30px;"
              >
              <img v-show="location.id % 4 === 1"
                src="../../assets/icons/click-0.gif" 
                style="width:30px; height: 30px;"
              >
              <img v-show="location.id % 4 === 2"
                src="../../assets/icons/click-0.gif" 
                style="width:30px; height: 30px;"
              >
              <img v-show="location.id % 4 === 3"
                src="../../assets/icons/click-0.gif" 
                style="width:30px; height: 30px;"
              >
            </el-button>
          </template>

          <template #actions="{ confirm, cancel }">
            <el-container style="height: 8px; display: flex; align-items: center; justify-content: space-between;">
              <el-text>{{ location.name }}</el-text>
              <div>
                <el-button size="small" @click="handleConfirm(location)">点击跳转</el-button>
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
              <img v-show="location.id % 4 === 0"
                src="../../assets/icons/click-0.gif" 
                style="width:30px; height: 30px;"
              >
              <img v-show="location.id % 4 === 1"
                src="../../assets/icons/click-0.gif" 
                style="width:30px; height: 30px;"
              >
              <img v-show="location.id % 4 === 2"
                src="../../assets/icons/click-0.gif" 
                style="width:30px; height: 30px;"
              >
              <img v-show="location.id % 4 === 3"
                src="../../assets/icons/click-0.gif" 
                style="width:30px; height: 30px;"
              >
            </el-button>
          </template>

          <template #actions="{ confirm, cancel }">
            <el-container style="height: 8px; display: flex; align-items: center; justify-content: space-between;">
              <el-text>{{ location.name }}</el-text>
              <div>
                <el-button size="small" @click="handleConfirm(location)">点击跳转</el-button>
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
    
    import { onMounted, ref, computed } from 'vue';

    // 搜索相关
    const searchQuery = ref('');
    const searchResults = ref<Array<{name: string; text: string; id: number; left: number; top: number}>>([]);
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
        { name: '南门', text: '南门', id: 1, left: 0.325, top: 0.7 },
        { name: '彩虹门', text: '彩虹门', id: 2, left: 0.345, top: 0.66 },
        { name: '图书馆', text: '图书馆', id: 3, left: 0.385, top: 0.58 },

        { name: '若海', text: '若海', id: 4, left: 0.535, top: 0.56 },
        { name: '海琴一号', text: '海琴一号，土木工程学院', id: 5, left: 0.745, top: 0.44 },
        { name: '海琴二号', text: '海琴二号，大气科学学院，数学学院（珠海），珠数，数珠', id: 6, left: 0.71, top: 0.47 },
        { name: '海琴三号', text: '海琴三号，海洋科学学院，海洋工程与技术学院，海科，海工', id: 7, left: 0.66, top: 0.535 },
        { name: '海琴四号', text: '海琴四号，地球科学与工程，地科，南方海洋实验室', id: 8, left: 0.62, top: 0.60 },
        { name: '海琴五号', text: '海琴五号，化学工程与技术学院，化工', id: 9, left: 0.58, top: 0.68 },
        { name: '若海食堂', text: '若海食堂，小肥羊，黄记煌', id: 10, left: 0.485, top: 0.685 },
        { name: '海琴六号', text: '海琴六号，国际翻译学院，国翻，历史学系（珠海），珠历，历珠，国际金融学院，国金，旅游学院，旅院，中国语言文学系（珠海），文珠，珠文，国际关系学院，国关，哲学系（珠海），哲珠，珠哲，“一带一路”研究院，一带一路研究院', id: 11, left: 0.435, top: 0.75 },

        { name: '音乐厅', text: '音乐厅', id: 12, left: 0.38, top: 0.44 },
        { name: '教学楼', text: '教学楼，网络信息服务中心，岐关车乘车点，岐关车，瑞幸咖啡，瑞幸，满忆糖水，满忆，实验室', id: 13, left: 0.49, top: 0.38 },
        { name: '中山像', text: '中山像', id: 14, left: 0.56, top: 0.38 },
        { name: '槿园一二号', text: '槿园一二号，打印，文印中心', id: 15, left: 0.62, top: 0.33 },
        { name: '槿园食堂', text: '槿园食堂，古茗', id: 16, left: 0.64, top: 0.36 },
        { name: '槿园三四号', text: '槿园三四号，711，满忆糖水，满忆，便利店', id: 17, left: 0.67, top: 0.37 },
        { name: '体育场', text: '体育场', id: 18, left: 0.565, top: 0.33 },
        { name: '体育馆', text: '体育馆', id: 19, left: 0.62, top: 0.395 },

        { name: '天琴中心', text: '天琴中心', id: 20, left: 0.165, top: 0.175 },
        { name: '天琴湖（沕水）', text: '天琴湖（沕水）', id: 21, left: 0.215, top: 0.185 },
        { name: '风雨球场', text: '风雨球场', id: 22, left: 0.225, top: 0.24 },
        { name: '翰林三号', text: '翰林三号，物理与天文学院，物天，中法核工程与技术学院，中法核，测绘科学与技术学院，测绘', id: 23, left: 0.29, top: 0.25 },
        { name: '翰林二号', text: '翰林二号，微电子科学与技术学院，微电子，软件工程学院，软工，人工智能学院，人智', id: 24, left: 0.335, top: 0.285 },
        { name: '岁月湖', text: '岁月湖', id: 25, left: 0.37, top: 0.305 },
        { name: '翰林一号', text: '翰林一号，珠海校区管委会，基建处，总务处，财务处，教务处，保卫处', id: 26, left: 0.39, top: 0.345 },
        { name: '隐湖', text: '隐湖', id: 27, left: 0.44, top: 0.39 },

        { name: '博雅苑', text: '博雅苑', id: 28, left: 0.50, top: 0.1 },
        { name: '校医院', text: '校医院', id: 29, left: 0.445, top: 0.115 },
        { name: '榕园宿舍', text: '榕园宿舍', id: 30, left: 0.36, top: 0.17 },
        { name: '榕园广场', text: '榕园广场', id: 31, left: 0.315, top: 0.215 },
        { name: '榕园食堂', text: '榕园食堂', id: 32, left: 0.34, top: 0.22 },
        { name: '得一超市', text: '得一超市，瑞幸咖啡，瑞幸，罗森，便利店，中国邮政，打印，文印中心，面包店，维修店，美发店', id: 33, left: 0.40, top: 0.26 },
        { name: '荔园宿舍', text: '荔园宿舍', id: 34, left: 0.45, top: 0.25 },
        { name: '荔园食堂', text: '荔园食堂，快递站', id: 35, left: 0.495, top: 0.265 },
        { name: '篮球场', text: '篮球场', id: 36, left: 0.48, top: 0.29 },

        { name: '北门', text: '北门', id: 37, left: 0.65, top: 0.35 },
        { name: '东北门', text: '东北门', id: 38, left: 0.785, top: 0.47 },
        { name: '华夏门', text: '华夏门', id: 39, left: 0.55, top: 0.09 },
        { name: '东南门', text: '东南门', id: 40, left: 0.535, top: 0.755 }
    ];
    const search_locations = ref([]);


    onMounted(() => {
        get_images_from_back();
    });

    // 计算闪烁点相关
    const full_contain_ref = ref<HTMLDivElement | null>(null)
    var full_contain_ref_width = ref(0);
    var full_contain_ref_height = ref(0);
    var contain_body_map_ref_width = ref(0);    
    var contain_body_map_ref_height = ref(0);
    var contain_body_map_padding_left = ref(0);
    const get_images_from_back = () => { 
        // 动态调整背景图片的宽度和高度
        if (full_contain_ref.value){
            full_contain_ref_height.value = full_contain_ref.value.clientHeight;
            full_contain_ref_width.value = full_contain_ref.value.clientWidth;
            contain_body_map_ref_height.value = full_contain_ref_height.value;
            contain_body_map_ref_width.value = contain_body_map_ref_height.value / 5.0 * 7;
            contain_body_map_padding_left.value = (full_contain_ref_width.value - contain_body_map_ref_width.value) / 2;
        }
    };  

    // 跳转相关
    const handleConfirm = (location) => {
        alert(location.id)
    }



</script>


<style>
.full_contain{
    border-radius: 0;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
}


.contain_body_map{
    background-color: rgba(255, 255, 255, 1);
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

.contain_body_site{
    margin-top: 2vh;
    width: 64vw; 
    height: 100vh;
}

</style>




