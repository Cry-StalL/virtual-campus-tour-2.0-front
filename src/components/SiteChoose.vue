<template>
    <div class="full_contain" ref="full_contain_ref">
        <div class="contain_head">
            <div class="contain_head_switch_button">
                <el-radio-group v-model="radio1" size="large">
                    <el-radio-button label="地图" value="New York" />
                    <el-radio-button label="地点" value="Washington" />
                </el-radio-group>
            </div>
            <div class="contain_head_title">
                <text style="font-size: 2vw; font-weight: bold; color: black;">地点跳转</text>
            </div>
            <div class="contain_head_delete_button">
                <el-button style="background-color: rgba(0, 0, 0, 0); border: 0; color: black;" @click="deleteSiteChooseView">
                    <img style="width: 4vh; height: 4vh;" src="../../assets/icons/delete.png">
                </el-button>
            </div>
        </div>
        <div class="contain_body" ref="contain_body_ref"> 
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
                        <el-button style="position: absolute; background-color: rgba(0, 0, 0, 0); border: 0; padding: 0; margin: 0; width:30px; height: 30px;" :style="{left: `${left_px + contain_body_ref_width * location.left - 15}px`, top: `${top_px + contain_body_ref_height * location.top - 15}px`}">
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
    import { onMounted, ref } from 'vue';

    
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

    const full_contain_ref = ref<HTMLDivElement | null>(null)
    const contain_body_ref = ref<HTMLDivElement | null>(null)
    var contain_body_ref_width = ref(0);
    var contain_body_ref_height = ref(0);
    var left_px = ref(0);
    var top_px = ref(0);

    type SiteClass = {
        sceneID:   string;
        sceneName: string;
        sceneURL:  string;
    };
    const total_scenes: SiteClass[] = [
        { sceneID: "1", sceneName: "010101", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "2", sceneName: "020202", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "3", sceneName: "030303", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "4", sceneName: "040404", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "5", sceneName: "050505", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "6", sceneName: "060606", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "7", sceneName: "070707", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "8", sceneName: "080808", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "9", sceneName: "090909", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "10", sceneName: "101010", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "11", sceneName: "111111", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "12", sceneName: "121212", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "13", sceneName: "131313", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "14", sceneName: "141414", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "15", sceneName: "151515", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "16", sceneName: "161616", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "17", sceneName: "171717", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "18", sceneName: "181818", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "19", sceneName: "191919", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "20", sceneName: "202020", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "21", sceneName: "212121", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "22", sceneName: "222222", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "23", sceneName: "232323", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "24", sceneName: "242424", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "25", sceneName: "252525", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { sceneID: "25", sceneName: "252525", sceneURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" }
    ];



    onMounted(() => {
        get_images_from_back();
    });
    const get_images_from_back = () => { 
        if (contain_body_ref.value) {

            contain_body_ref_height.value = contain_body_ref.value.clientHeight
            contain_body_ref_width.value = contain_body_ref.value.clientWidth

            contain_body_ref.value.style.width = `${contain_body_ref_height.value * 1.4}px`
            left_px.value = (full_contain_ref.value.clientWidth - contain_body_ref.value.clientHeight*1.4) / 2;
            top_px.value = full_contain_ref.value.clientHeight * 0.11 / 9 * 10;
            contain_body_ref_width.value = contain_body_ref.value.clientWidth
        }
    };  

    const handleConfirm = (location) => {
        alert(location.id)
    }
   
    const emit = defineEmits(['closeSiteChooseView']); // 添加 'closeSiteChooseView'
    
    const deleteSiteChooseView = () => {
        emit('closeSiteChooseView'); // 现在是合法的
    }

    const radio1 = ref('New York')


</script>


<style>
.full_contain{
    border-radius: 1vw;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}

.contain_head{ 
    /* background-color: aqua; */
    width: 100%;
    height: 6vh;
    margin-top: 4.5vh;
    margin-bottom: 0.5vh;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.contain_head_switch_button{
    margin-left: 15%;
    width: 10%;
    margin-right: 0%;
    /* background-color: aqua; */
}
.contain_head_title{
    width: 50%;
    /* margin-left: 10%; */
    height: 100%;
}
.contain_head_delete_button{
    width: 6%;
    height: 100%;
    margin-left: 14%;
    margin-right: 5%;
}

.contain_body{
    background-image: url("../../assets/background.jpg");
    background-size: cover; /* 完全覆盖容器，可能会裁剪 */
    background-position: center; /* 居中显示 */
    background-repeat: no-repeat;/* 不重复 */
    height: 75vh;
    /* width: 1050px; */
}



.type_name{
    width: 100%;
    height: 15%;
    /* background-color: blue; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.image_line{
    /* background-color: aqua; */
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.image_button{
    width: 15vw;
    height: 13vw;
    background-color: rgba(255, 255, 255, 0);
    border: 0;
    padding: 0%;
    margin-left: 3vw;
    margin-right: 3vw;
}
.image_img{
    width: 15vw;
    height: 10vw;
}
.image_text{
    font-size: 1.5vw;
    width: 15vw;
    height: 3vw;
}
.single_image{
    width: 14vw;
    height: 8.3vw;
    margin-left: 4vw;
    margin-right: 4vw;
    display: flex;
    flex-direction: column;
}
.page_number{
    width: 100%;
    height: 5vw;
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
    align-items: center;
}


</style>




