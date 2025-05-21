<template>
    <div class="full_contain">
        <div class="delete_button">
            <el-button style="background-color: rgba(0, 0, 0, 0); border: 0; color: black;" @click="deleteSiteChooseView">
                <img style="width: 3vw; height: 3vw;" src="../../assets/icons/delete.png">
            </el-button>
        </div>
        <div class="type_name">
            <text style="font-size: 2vw; font-weight: bold; color: black;">地点跳转</text>
        </div>
        <div class="image_line">
            <div class="image_button" @click="test(0)" v-show="is_show_image[0]">
                <img class="image_img" :src="scenes_in_a_page[0].sceneURL"/>
                <text class="image_text">{{scenes_in_a_page[0].sceneName}}</text>
            </div>
            <div class="image_button" @click="test(1)" v-show="is_show_image[1]">
                <img class="image_img" :src="scenes_in_a_page[1].sceneURL"/>
                <text class="image_text">{{scenes_in_a_page[1].sceneName}}</text>
            </div>
            <div class="image_button" @click="test(2)" v-show="is_show_image[2]">
                <img class="image_img" :src="scenes_in_a_page[2].sceneURL"/>
                <text class="image_text">{{scenes_in_a_page[2].sceneName}}</text>
            </div>
        </div>
        <div class="image_line">
            <div class="image_button" @click="test(3)" v-show="is_show_image[3]">
                <img class="image_img" :src="scenes_in_a_page[3].sceneURL"/>
                <text class="image_text">{{scenes_in_a_page[3].sceneName}}</text>
            </div>
            <div class="image_button" @click="test(4)" v-show="is_show_image[4]">
                <img class="image_img" :src="scenes_in_a_page[4].sceneURL"/>
                <text class="image_text">{{scenes_in_a_page[4].sceneName}}</text>
            </div>
            <div class="image_button" @click="test(5)" v-show="is_show_image[5]">
                <img class="image_img" :src="scenes_in_a_page[5].sceneURL"/>
                <text class="image_text">{{scenes_in_a_page[5].sceneName}}</text>
            </div>
        </div>
        <div class="image_line">
            <div class="image_button" @click="test(6)" v-show="is_show_image[6]">
                <img class="image_img" :src="scenes_in_a_page[6].sceneURL"/>
                <text class="image_text">{{scenes_in_a_page[6].sceneName}}</text>
            </div>
            <div class="image_button" @click="test(7)" v-show="is_show_image[7]">
                <img class="image_img" :src="scenes_in_a_page[7].sceneURL"/>
                <text class="image_text">{{scenes_in_a_page[7].sceneName}}</text>
            </div>
            <div class="image_button" @click="test(8)" v-show="is_show_image[8]">
                <img class="image_img" :src="scenes_in_a_page[8].sceneURL"/>
                <text class="image_text">{{scenes_in_a_page[8].sceneName}}</text>
            </div>
        </div>
        <div class="page_number" style="display: flex; flex-direction: row; ">
            <div style="width:2vw;">
                <div @click="sub_page()" v-show="base_Id >= 9" style="font-size: 2vw">-</div>
            </div>
            <div style="font-size: 2vw; width: 2vw;">{{base_Id/9+1}}</div>
            <div style="width: 2vw;">
                <div @click="add_page()" v-show="total_image_numbers - base_Id - 9 > 0" style="font-size: 2vw">+</div>
            </div>
        </div>
        

    </div>
</template>


<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    const base_Id = ref(0);
    const total_image_numbers = ref(0);
    const is_show_image = ref<boolean[]>([
        false, false, false,
        false, false, false,
        false, false, false
    ]);

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

    const scenes_in_a_page: SiteClass[] = [
        total_scenes[0], total_scenes[0], total_scenes[0],
        total_scenes[0], total_scenes[0], total_scenes[0],
        total_scenes[0], total_scenes[0], total_scenes[0] 
    ];

    onMounted(() => {
        get_images_from_back();
    });
    const get_images_from_back = () => { 
        total_image_numbers.value = 26;
        base_Id.value = 0;
        update_scenes_in_a_page(base_Id.value, total_image_numbers.value);
        update_is_show_image(base_Id.value, total_image_numbers.value);

    };  
    const update_is_show_image = (base_Id: number, total_image_numbers: number) => {
        for (let i = 0; i < 9; i++) {
            if (base_Id + i < total_image_numbers){
                is_show_image.value[i] = true;
            }else{
                is_show_image.value[i] = false;
            }
        }
    };
    const update_scenes_in_a_page = (base_Id: number, total_image_numbers: number) => {
        for (let i = 0; i < 9; i++) {
            if (base_Id + i < total_image_numbers){
                scenes_in_a_page[i] = total_scenes[base_Id + i];
            }
        }
    };
    const emit = defineEmits(['closeSiteChooseView']); // 添加 'closeSiteChooseView'
    
    const deleteSiteChooseView = () => {
        emit('closeSiteChooseView'); // 现在是合法的
    }

    
    

    const test = (index: number) => {
        if(is_show_image.value[index] == true){
            alert(base_Id.value + index);
        }
    }

    const add_page = () => {
        let tmp = base_Id.value;
        base_Id.value = tmp + 9;
        update_scenes_in_a_page(base_Id.value, total_image_numbers.value);
        update_is_show_image(base_Id.value, total_image_numbers.value);
    }
    const sub_page = () => {
        let tmp = base_Id.value;
        base_Id.value = tmp - 9;
        update_scenes_in_a_page(base_Id.value, total_image_numbers.value);
        update_is_show_image(base_Id.value, total_image_numbers.value);
    }


</script>


<style>
.full_contain{
    /* background-color: rgba(0, 255, 255, 1); */
    border-radius: 1vw;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.delete_button{
    padding: 0%;
    position: absolute;
    left: 90%;
    top: 4%;
    /* background-color: red; */
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




