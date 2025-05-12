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
                <img class="image_img" :src="sites_in_a_page[0].siteURL"/>
                <text class="image_text">{{sites_in_a_page[0].siteName}}</text>
            </div>
            <div class="image_button" @click="test(1)" v-show="is_show_image[1]">
                <img class="image_img" :src="sites_in_a_page[1].siteURL"/>
                <text class="image_text">{{sites_in_a_page[1].siteName}}</text>
            </div>
            <div class="image_button" @click="test(2)" v-show="is_show_image[2]">
                <img class="image_img" :src="sites_in_a_page[2].siteURL"/>
                <text class="image_text">{{sites_in_a_page[2].siteName}}</text>
            </div>
        </div>
        <div class="image_line">
            <div class="image_button" @click="test(3)" v-show="is_show_image[3]">
                <img class="image_img" :src="sites_in_a_page[3].siteURL"/>
                <text class="image_text">{{sites_in_a_page[3].siteName}}</text>
            </div>
            <div class="image_button" @click="test(4)" v-show="is_show_image[4]">
                <img class="image_img" :src="sites_in_a_page[4].siteURL"/>
                <text class="image_text">{{sites_in_a_page[4].siteName}}</text>
            </div>
            <div class="image_button" @click="test(5)" v-show="is_show_image[5]">
                <img class="image_img" :src="sites_in_a_page[5].siteURL"/>
                <text class="image_text">{{sites_in_a_page[5].siteName}}</text>
            </div>
        </div>
        <div class="image_line">
            <div class="image_button" @click="test(6)" v-show="is_show_image[6]">
                <img class="image_img" :src="sites_in_a_page[6].siteURL"/>
                <text class="image_text">{{sites_in_a_page[6].siteName}}</text>
            </div>
            <div class="image_button" @click="test(7)" v-show="is_show_image[7]">
                <img class="image_img" :src="sites_in_a_page[7].siteURL"/>
                <text class="image_text">{{sites_in_a_page[7].siteName}}</text>
            </div>
            <div class="image_button" @click="test(8)" v-show="is_show_image[8]">
                <img class="image_img" :src="sites_in_a_page[8].siteURL"/>
                <text class="image_text">{{sites_in_a_page[8].siteName}}</text>
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

    const sites_in_a_page: SiteClass[] = [
        total_sites[0], total_sites[0], total_sites[0],
        total_sites[0], total_sites[0], total_sites[0],
        total_sites[0], total_sites[0], total_sites[0] 
    ];

    onMounted(() => {
        get_images_from_back();
    });
    const get_images_from_back = () => { 
        total_image_numbers.value = 25;
        base_Id.value = 0;
        update_sites_in_a_page(base_Id.value, total_image_numbers.value);
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
    const update_sites_in_a_page = (base_Id: number, total_image_numbers: number) => {
        for (let i = 0; i < 9; i++) {
            if (base_Id + i < total_image_numbers){
                sites_in_a_page[i] = total_sites[base_Id + i];
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
        update_sites_in_a_page(base_Id.value, total_image_numbers.value);
        update_is_show_image(base_Id.value, total_image_numbers.value);
    }
    const sub_page = () => {
        let tmp = base_Id.value;
        base_Id.value = tmp - 9;
        update_sites_in_a_page(base_Id.value, total_image_numbers.value);
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




