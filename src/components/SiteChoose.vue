<template>
    <div class="full_contain">
        <div class="delete_button">
            <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click="deleteSiteChooseView">
                <img style="width: 3vw; height: 3vw;" src="../../assets/icons/delete.png">
            </el-button>
        </div>
        <div class="type_name">
            <text style="font-size: 2vw; font-weight: bold;">地点跳转</text>
        </div>
        <div class="image_line">
            <div class="single_image">
                <img class="image" src="../../assets/library.png"/>
                <text class="image_text" >图书馆</text>
            </div>
            <div class="single_image">
                <img class="image" src="../../assets/library.png"/>
                <text class="image_text" >图书馆</text>
            </div>
            <div class="single_image">
                <img class="image" src="../../assets/library.png"/>
                <text class="image_text" >图书馆</text>
            </div>
        </div>
        <div class="image_line">
            <div class="single_image">
                <img class="image" src="../../assets/library.png"/>
                <text class="image_text" >图书馆</text>
            </div>
            <div class="single_image">
                <img class="image" src="../../assets/library.png"/>
                <text class="image_text" >图书馆</text>
            </div>
            <div class="single_image">
                <img class="image" src="../../assets/library.png"/>
                <text class="image_text" >图书馆</text>
            </div>
        </div>
        <div class="image_line">
            <div class="single_image">
                <img class="image" src="../../assets/library.png"/>
                <text class="image_text" >图书馆</text>
            </div>
            <div class="single_image">
                <img class="image" src="../../assets/library.png"/>
                <text class="image_text" >图书馆</text>
            </div>
            <div class="single_image">
                <img class="image" src="../../assets/library.png"/>
                <text class="image_text" >图书馆</text>
            </div>
        </div>

    </div>
</template>


<script setup>
    const emit = defineEmits(['deleteSiteChooseView']);
    const deleteSiteChooseView = () => {
        // alert("delete")
        emit('closeSiteChooseView');
    }


</script>


<style>
.full_contain{
    background-color: rgba(255, 255, 255, 0.6);
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
.single_image{
    width: 14vw;
    height: 8.3vw;
    margin-left: 4vw;
    margin-right: 4vw;
    display: flex;
    flex-direction: column;
}


</style>




