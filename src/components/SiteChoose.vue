<template>
    <div class="full_contain" ref="full_contain_ref">
      
        <div class="contain_body_map" ref="contain_body_ref" :style="{width: `${contain_body_map_ref_width}px`, height: `${contain_body_map_ref_height}px`}"> 
            <div class="popconfirm-group">
                <el-popconfirm
                    v-for="location in locations"
                    :key="location.id"
                    :hide-icon="true"
                    width="200"
                    placement="right"
                    trigger="hover"
                >
                    <template #reference>
                        <el-button style="position: absolute; background-color: rgba(0, 0, 0, 0); border: 0; padding: 0; margin: 0; width:30px; height: 30px;" :style="{left: `${contain_body_map_padding_left + contain_body_map_ref_width * location.left - 15}px`, top: `${contain_body_map_ref_height * location.top - 15}px`}">
                            <img src="../../assets/icons/click.gif" style="width:30px; height: 30px;">
                        </el-button>
                    </template>

                    <template #actions="{ confirm, cancel }" >
                        <el-container style="height: 8px; display: flex; align-items: center; justify-content: space-between; display: flex; align-items: center;">
                            <el-text>{{ location.name }}</el-text>
                            <div>
                                <el-button size="small" @click="handleConfirm(location)">点击跳转</el-button>
                            </div>
                        </el-container>
                        <el-container style="width: 100%; height: 5px;" ></el-container>
                    </template>
                </el-popconfirm>
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
    
    import { onMounted, ref, computed } from 'vue';

    const locations = [
        { name: '南门', id: 1, left: 0.325, top: 0.7 },
        { name: '彩虹门', id: 2, left: 0.345, top: 0.66 },
        { name: '图书馆', id: 3, left: 0.385, top: 0.58 },

        { name: '若海', id: 4, left: 0.535, top: 0.56 },
        { name: '海琴一号', id: 5, left: 0.745, top: 0.44 },
        { name: '海琴二号', id: 6, left: 0.71, top: 0.47 },
        { name: '海琴三号', id: 7, left: 0.66, top: 0.535 },
        { name: '海琴四号', id: 8, left: 0.62, top: 0.60 },
        { name: '海琴五号', id: 9, left: 0.58, top: 0.68 },
        { name: '若海食堂', id: 10, left: 0.485, top: 0.685 },
        { name: '海琴六号', id: 11, left: 0.435, top: 0.75 },

        { name: '音乐厅', id: 12, left: 0.38, top: 0.44 },
        { name: '教学楼', id: 13, left: 0.49, top: 0.38 },
        { name: '中山像', id: 14, left: 0.56, top: 0.38 },
        { name: '槿园一二号', id: 15, left: 0.62, top: 0.33 },
        { name: '槿园食堂', id: 16, left: 0.64, top: 0.36 },
        { name: '槿园三四号', id: 17, left: 0.67, top: 0.37 },
        { name: '体育场', id: 18, left: 0.565, top: 0.33 },
        { name: '体育馆', id: 19, left: 0.62, top: 0.395 },

        { name: '天琴中心', id: 20, left: 0.165, top: 0.175 },
        { name: '天琴湖（沕水）', id: 21, left: 0.215, top: 0.185 },
        { name: '风雨球场', id: 22, left: 0.225, top: 0.24 },
        { name: '翰林三号', id: 23, left: 0.29, top: 0.25 },
        { name: '翰林二号', id: 24, left: 0.335, top: 0.285 },
        { name: '岁月湖', id: 25, left: 0.37, top: 0.305 },
        { name: '翰林一号', id: 26, left: 0.39, top: 0.345 },
        { name: '隐湖', id: 27, left: 0.44, top: 0.39 },

        { name: '博雅苑', id: 28, left: 0.50, top: 0.1 },
        { name: '校医院', id: 29, left: 0.445, top: 0.115 },
        { name: '榕园宿舍', id: 30, left: 0.36, top: 0.17 },
        { name: '榕园广场', id: 31, left: 0.315, top: 0.215 },
        { name: '榕园食堂', id: 32, left: 0.34, top: 0.22 },
        { name: '得一超市', id: 33, left: 0.40, top: 0.26 },
        { name: '荔园宿舍', id: 34, left: 0.45, top: 0.25 },
        { name: '荔园食堂', id: 35, left: 0.495, top: 0.265 },
        { name: '篮球场', id: 36, left: 0.48, top: 0.29 },
    ];

    interface Site {
        building_name: string
        department_name: string
        URL: string
    }

    onMounted(() => {
        get_images_from_back();
    });

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

    const handleConfirm = (location) => {
        alert(location.id)
    }


</script>


<style>
.full_contain{
    border-radius: 1vw;
    flex-direction: column;
    align-items: center;
}

.contain_body_map{
    background-image: url("../../assets/background.jpg");
    background-size: cover; /*完全覆盖容器，可能会裁剪*/
    background-position: center; /*居中显示 */
    background-repeat: no-repeat; /* 不重复 */
    height: 0;
    width: 0;
}

.contain_body_site{
    margin-top: 2vh;
    width: 64vw; 
    height: 100vh;
}

</style>




