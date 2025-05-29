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
        siteID:   string;
        siteName: string;
        siteURL:  string;
    };
    const total_sites: SiteClass[] = [
        { siteID: "1", siteName: "010101", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "2", siteName: "020202", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "3", siteName: "030303", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "4", siteName: "040404", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "5", siteName: "050505", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "6", siteName: "060606", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "7", siteName: "070707", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "8", siteName: "080808", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "9", siteName: "090909", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "10", siteName: "101010", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "11", siteName: "111111", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "12", siteName: "121212", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "13", siteName: "131313", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "14", siteName: "141414", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "15", siteName: "151515", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "16", siteName: "161616", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "17", siteName: "171717", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "18", siteName: "181818", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "19", siteName: "191919", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "20", siteName: "202020", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "21", siteName: "212121", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "22", siteName: "222222", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "23", siteName: "232323", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "24", siteName: "242424", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" },
        { siteID: "25", siteName: "252525", siteURL: "https://virtual-campus-tour-sysu-zhuhai.oss-cn-guangzhou.aliyuncs.com/library.png" }
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




