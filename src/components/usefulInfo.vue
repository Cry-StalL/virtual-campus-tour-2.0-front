<template>
    <div class="full_contain">
        <el-tabs v-model="activeName" class="demo-tabs" style="width: 70vw; margin-top: 3vh;">
            <el-tab-pane label="学习">
                <div class="study_library">
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <text style="width: 38vw; margin-left: 2vw; margin-bottom: 0.2vh; text-align: left; font-weight: bold; color: black; font-size: x-large;" >
                            图书馆
                        </text>
                        <text style="width: 38vw; margin-left: 2vw; margin-bottom: 0.2vh; text-align: left; color: black;" >
                            具体地点：中山大学珠海校区南门
                        </text>
                        <text style="width: 38vw; margin-left: 2vw; margin-bottom: 0.2vh; text-align: left; color: black;" >
                            开放时间：7:00-22:00
                        </text>
                        <text style="width: 38vw; margin-left: 2vw; margin-bottom: 0.2vh; text-align: left; color: black;" >
                            纸质资源：纸质藏书逾300万册，订购报纸128种，期刊1625种
                        </text>
                        <text style="width: 38vw; margin-left: 2vw; margin-bottom: 0.2vh; text-align: left; color: black;" >
                            电子资源：数据库累计超过1000个，电子图书276万余册，电子期刊14万余种
                        </text>
                        <text style="width: 38vw; margin-left: 2vw; margin-bottom: 0.3vh; text-align: left; color: black;" >
                            容纳人数：阅览座位1106席，研讨室15间，可容纳50人的视频培训室1间
                        </text>
                    </div>
                    
                    <div style="margin-left: 0vw; width: 15vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                        <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 12.8vw; height: 8vw;">
                        <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button>
                    </div>
                    <div style="width: 15vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                        <img src="../../assets/library.png" style="margin-top: 0.8vw; width: 12vw; height: 8vw;">
                        <el-button style="width: 12vw;">点击前往图书馆街景</el-button>
                    </div>
                      
                </div>
                <div style="display: flex; flex-direction: row;">
                    <div class="study_teaching_building ">
                        <div style="display: flex; flex-direction: column; align-items: center; ">
                            <text style="width: 100%; margin-left: 4vw; margin-top: 1.5vh; margin-bottom: 0.5vh; text-align: left; font-weight: bold; color: black; font-size: x-large;" >
                                教学楼
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                具体地点：逸仙大道中部，图书馆后方
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                开放时间：7:00-22:00
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                教室数量：共有大小课室179间，可以同时容纳2万学生上课
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                今日开放自习室：
                            </text>
                            <el-table :data="tableData"  :show-header=false style="background-color: transparent; color: black" :header-cell-style="{ background: 'transparent' }" :row-style="{ background: 'transparent' }" >
                                <el-table-column prop="aaa" label="aaa" width="60"/>
                                <el-table-column prop="bbb" label="bbb" width="60"/>
                                <el-table-column prop="ccc" label="ccc" width="60"/>
                                <el-table-column prop="ddd" label="ddd" width="60"/>
                                <el-table-column prop="eee" label="eee" width="60"/>
                                <el-table-column prop="fff" label="fff" width="60"/>
                                <el-table-column prop="ggg" label="ggg" width="60"/>
                                <el-table-column prop="hhh" label="hhh" width="60"/>
                                <el-table-column prop="iii" label="iii" width="60"/>
                                <el-table-column prop="jjj" label="jjj" width="60"/>
                            </el-table>
                            
                        </div>
                        <div style="display: flex; flex-direction: row; justify-content: center;">
                            <div style="width: 12.8vw; margin-right: 0.75vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/classroom1.jpg" style="margin-top: 0.8vw; width: 12.8vw; height: 8vw;">
                                <el-button style="width: 12.8vw;">点击前往中山大学教务系统</el-button>
                            </div>
                            <div style="width: 14vw; margin-right: 0.75vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/classroom2.jpg" style="margin-top: 0.8vw; width: 14vw; height: 8vw;">
                                <el-button style="width: 14vw;">点击前往中山大学珠海校区简介</el-button>
                            </div>
                            <div style="width: 12vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/library.png" style="margin-top: 0.8vw; width: 12vw; height: 8vw;">
                                <el-button style="width: 12vw;">点击前往教学楼街景</el-button>
                            </div>
                        </div>
                        
                    </div>
                    <div class="study_department_building ">
                        <div style="display: flex; flex-direction: column; align-items: center; ">
                            <text style="width: 100%; margin-left: 4vw; margin-top: 1.5vh; margin-bottom: 0.5vh; text-align: left; font-weight: bold; color: black; font-size: x-large;" >
                                各个学院院楼
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                具体地点：请在地点跳转查询
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                开放时间：7:00-22:00
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                注意事项：需有各学院通行权限
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                部分学院自习室：
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                微电子学院：A211、A217
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                软件工程学院：A311、A317
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                人工智能学院：A411、A417
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                微电子学院：A211、A217
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                软件工程学院：A311、A317
                            </text>
                            <text style="width: 100%; margin-left: 4vw; margin-bottom: 0.5vh; text-align: left; color: black;" >
                                人工智能学院：A411、A417
                            </text>
                            
                            
                        </div>
                        <div style="display: flex; flex-direction: row;">
                            <div style="display: flex; flex-direction: row; justify-content: center; ">
                                <div style="width: 12vw; margin-left: 1.2vw; margin-right: 1vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                                    <img src="../../assets/library.png" style="margin-top: 0.8vw; width: 12vw; height: 8vw;">
                                    <el-button style="width: 12vw;">点击前往翰林二号街景</el-button>
                                </div>
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: center;">
                                <div style="width: 12vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                                    <img src="../../assets/library.png" style="margin-top: 0.8vw; width: 12vw; height: 8vw;">
                                    <el-button style="width: 12vw;">点击前往海琴五号街景</el-button>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="饮食">饮食</el-tab-pane>
            <el-tab-pane label="住宿">住宿</el-tab-pane>
            <el-tab-pane label="交通">交通</el-tab-pane>
            <el-tab-pane label="就医">就医</el-tab-pane>
            <el-tab-pane label="校区管委会">校区管委会</el-tab-pane>
        </el-tabs>

    </div>
</template>


<script setup>
    const emit = defineEmits(['deleteSiteChooseView']);
    const deleteSiteChooseView = () => {
        // alert("delete")
        emit('closeUsefulInfoView');
    }

    const tableData = [
    {
        aaa: 'A301',
        bbb: 'A302',
        ccc: 'A303',
        ddd: 'A304',
        eee: 'A305',
        fff: 'A306',
        ggg: 'A307',
        hhh: 'A308',
        iii: 'A309',
        jjj: 'A310'
    },
    {
        aaa: 'A401',
        bbb: 'A402',
        ccc: 'A403',
        ddd: 'A404',
        eee: 'A405',
        fff: 'A406',
        ggg: 'A407',
        hhh: 'A408',
        iii: 'A409',
        jjj: 'A410'
    },
    {
        aaa: 'A501',
        bbb: 'A502',
        ccc: 'A503',
        ddd: 'A504',
        eee: 'A505',
        fff: 'A506',
        ggg: 'A507',
        hhh: 'A508',
        iii: 'A509',
        jjj: 'A510'
    },
    {
        aaa: 'A601',
        bbb: 'A602',
        ccc: 'A603',
        ddd: 'A604',
        eee: 'A605',
        fff: 'A606',
        ggg: 'A607',
        hhh: 'A608',
        iii: 'A609',
        jjj: 'A610'
    }]

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

.demo-tabs > .el-tabs__content {
    width: 70vw;
    height: 80vh;
}

.study_library{
    width: 100%; 
    height: 20vh; 
    background-color: #FFCC99; 
    border-radius: 10px;
    display: flex;
    flex-direction: row;
}

.study_teaching_building{
    width: 60%; 
    margin-top: 2vh;
    height: 57vh; 
    background-color: #FFCC99; 
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}
.study_department_building{
    width: 39%; 
    margin-top: 2vh;
    margin-left: 1vw;
    height: 57vh; 
    background-color: #FFCC99; 
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

</style>




