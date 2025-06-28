<template>
    <div class="full_contain" ref="full_contain_ref">
        <div class="delete-button">
            <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click.stop="closeUsefulInfoView">
                <img style="width: 2vw; height: 2vw;" src="../../assets/icons/delete.png">
            </el-button>
        </div>
        <!-- <div style="width: 100%; height: 100%;"> -->
            <el-tabs  class="demo-tabs">
                <el-tab-pane label="学习">
                    <div class="study_library" style="margin-top: 1vh;">
                        <div style="width: 66vh; margin-left: 4vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <text style="width: 66vh; margin-bottom: 0.2vh; text-align: left; font-weight: bold; color: black; font-size: 2vh;" >
                                图书馆
                            </text>
                            <text style="width: 66vh; margin-bottom: 0.2vh; text-align: left; color: black; font-size: 1.5vh;" >
                                具体地点：中山大学珠海校区南门
                            </text>
                            <text style="width: 66vh; margin-bottom: 0.2vh; text-align: left; color: black; font-size: 1.5vh;" >
                                开放时间：8:00-22:30
                            </text>
                            <text style="width: 66vh; margin-bottom: 0.2vh; text-align: left; color: black; font-size: 1.5vh;" >
                                纸质资源：纸质藏书逾300万册，订购报纸128种，期刊1625种
                            </text>
                            <text style="width: 66vh; margin-bottom: 0.2vh; text-align: left; color: black; font-size: 1.5vh;" >
                                电子资源：数据库累计超过1000个，电子图书276万余册，电子期刊14万余种
                            </text>
                            <text style="width: 66vh; margin-bottom: 0.3vh; text-align: left; color: black; font-size: 1.5vh;" >
                                容纳人数：阅览座位1106席，研讨室15间，可容纳50人的视频培训室1间
                            </text>
                        </div>
                        
                        <div style="width: 25vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/xx-tsg-1.jpg" style="margin-top: 1.5vh; width: 22.4vh; height: 14vh;">
                            <el-button style="width: 22.4vh; height: 3vh;" @click="redirectTo_xx_tsg">点击前往图书馆网站</el-button>
                        </div>
                        <div style="width: 25vh; padding-right: 2vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/xx-tsg-2.jpg" style="margin-top: 1.5vh; width: 21vh; height: 14vh;">
                            <el-button style="width: 21vh; height: 3vh;">点击前往图书馆街景</el-button>
                        </div>
                        
                    </div>
                    <div style="display: flex; flex-direction: row;">
                        <div class="study_teaching_building ">
                            <div style="display: flex; flex-direction: column; justify-content: center; margin-left: 4vh;">
                                <text style="margin-top: 2.5vh; margin-bottom: 0.5vh; text-align: left; font-weight: bold; color: black; font-size: 2vh;" >
                                    教学楼
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    具体地点：逸仙大道中部，图书馆后方
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    开放时间：7:00-22:00
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    教室数量：共有大小课室179间，可以同时容纳2万学生上课
                                </text>
                                <text style="wmargin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    今日开放自习室：
                                </text>
                                <el-table
                                    :data="tableData"
                                    style="width: 64vh; height: 18vh;"
                                    :row-style="{ height: '3.25vh' }"
                                    :cell-style="{ padding: '0px', fontSize: '1.2vh' }"
                                    :header-cell-style="{ background: 'transparent' }"
                                    :show-header="false">
                                    <el-table-column prop="aaa" label="aaa" :width="full_contain_ref_vh"/>
                                    <el-table-column prop="bbb" label="bbb" :width="full_contain_ref_vh"/>
                                    <el-table-column prop="ccc" label="ccc" :width="full_contain_ref_vh"/>
                                    <el-table-column prop="ddd" label="ddd" :width="full_contain_ref_vh"/>
                                    <el-table-column prop="eee" label="eee" :width="full_contain_ref_vh"/>
                                    <el-table-column prop="fff" label="fff" :width="full_contain_ref_vh"/>
                                    <el-table-column prop="ggg" label="ggg" :width="full_contain_ref_vh"/>
                                    <el-table-column prop="hhh" label="hhh" :width="full_contain_ref_vh"/>
                                    <el-table-column prop="iii" label="iii" :width="full_contain_ref_vh"/>
                                    <el-table-column prop="jjj" label="jjj" :width="full_contain_ref_vh"/>
                                </el-table>
                                
                            </div>
                            <div style="display: flex; flex-direction: row; justify-content: center;">
                                <div style="width: 21.3vh; margin-right: 2vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                    <img src="../../assets/xx-jxl-1.jpg" style="margin-top: 1vh; width: 21.3vh; height: 12vh;">
                                    <el-button style="width: 21.3vh; height: 3vh;" @click="redirectTo_xx_jwxt">点击前往中山大学教务系统</el-button>
                                </div>
                                <div style="width: 21.3vh; margin-right: 2vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                    <img src="../../assets/xx-jxl-2.jpg" style="margin-top: 1vh; width: 21.3vh; height: 12vh;">
                                    <el-button style="width: 21.3vh; height: 3vh;" @click="redirectTo_xx_jj">点击前往珠海校区简介</el-button>
                                </div>
                                <div style="width: 18vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                    <img src="../../assets/xx-jxl-3.jpg" style="margin-top: 1vh; width: 18vh; height: 12vh;">
                                    <el-button style="width: 18vh; height: 3vh;">点击前往教学楼街景</el-button>
                                </div>
                            </div>
                            
                        </div>
                        <div class="study_department_building ">
                            <div style="display: flex; flex-direction: column; margin-left: 4vh;">
                                <text style="margin-top: 3vh; margin-bottom: 0.5vh; text-align: left; font-weight: bold; color: black; font-size: 2vh;" >
                                    学院院楼
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    具体地点：请在地点跳转查询
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    开放时间：7:00-22:00
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    注意事项：需有各学院通行权限
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    部分学院自习室：
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    微电子学院：A211
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    软件工程学院：A311、A317
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    人工智能学院：A402
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    国际金融学院：A4120
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    旅游学院：A513
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    国际关系学院：B208
                                </text>
                                
                                
                            </div>
                            <div style="display: flex; flex-direction: row;">
                                <div style="display: flex; flex-direction: row; justify-content: center; ">
                                    <div style="width: 18vh; margin-left: 4vh; margin-right: 2vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/xx-hleh.jpg" style="margin-top: 1vh; width: 18vh; height: 12vh;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往翰林二号街景</el-button>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: center;">
                                    <div style="width: 18vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/xx-hqlh.jpg" style="margin-top: 1vh; width: 18vh; height: 12vh;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往海琴六号街景</el-button>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="饮食">
                    <div style="width: 100%; height: 78vh; display: flex; flex-direction: row; margin-top: 1vh;">
                        <!-- 榕园 -->
                        <div class="canteen">
                            <div style="height: 28vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    榕园食堂
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    开放时间：6:00-10:00，11:00-13:00，17:00-19:00
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    特色窗口：一楼自选、二楼石锅饭、二楼西北餐厅
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    平均价格：8-15元
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    餐厅图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-ry-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-ry-2.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-ry-3.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往榕园食堂街景</el-button>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                        </div>
                        <!-- 荔园 -->
                        <div class="canteen">
                            <div style="height: 28vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    荔园食堂
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    开放时间：6:00-10:00，11:00-13:00，17:00-19:00
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    特色窗口：一楼手工拉面、二楼肯德基
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    平均价格：12-18元
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    餐厅图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-ly-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-ly-2.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-ly-3.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往荔园食堂街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <!-- 槿园 -->
                         <div class="canteen">
                            <div style="height: 28vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 2vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    槿园食堂
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    开放时间：6:00-10:30，11:00-13:00，17:00-19:00
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    特色窗口：一楼面点、二楼自选、二楼烧腊、三楼东北盒饭
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    平均价格：12-18元
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    餐厅图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-jy-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-jy-2.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-jy-3.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往槿园食堂街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <!-- 若海 -->
                         <div class="canteen">
                            <div style="height: 28vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    若海食堂
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    开放时间：6:00-10:30，11:00-13:00，17:00-19:00
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    特色窗口：一楼小肥羊、一楼黄记煌、二楼烧腊、二楼自选、三楼餐厅
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    平均价格：12-18元
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    餐厅图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-rh-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-rh-2.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-rh-3.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往槿园食堂街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <!-- 校外美食 -->
                         <div class="canteen" style="margin-right: 0;">
                            <div style="height: 28vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    校外美食
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    北门推荐美食：重庆小面、呱呱饺子、东北人家
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    华夏门推荐美食：唐家餸、渔记茶餐厅、白马烤鱼、简也奶茶
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    南门推荐美食：伟记私房菜、鸡山煲仔饭
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    餐厅图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-xwms-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-xwms-2.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/ys-xwms-3.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往北门街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </el-tab-pane>
                <el-tab-pane label="住宿">
                    <div style="width: 100%; height: 78vh; display: flex; flex-direction: row; margin-top: 1vh;">
                        <!-- 榕园 -->
                        <div class="dormitory" style="margin-left: 2%; margin-right: 6%;">
                            <div style="height: 32vh; display: flex; flex-direction: column; ">
                                <text style="width: 100%; margin-top: 2.5vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    榕园宿舍
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    具体地点：翰林三号、华夏门附近
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    基础设施：四人寝、上床下桌、均安装有电梯
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    住宿费用：1000-1500元
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    热水供应时间：18:00-24:00
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    电力、网络供应时间：全天
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 84%; margin-left: 10%; text-align: left; font-size: 1.8vh;">
                                    宿舍图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 24vh; height: 16vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/zs-ry-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/zs-ry-2.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往榕园宿舍街景</el-button>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                        </div>
                        <!-- 荔园 -->
                        <div class="dormitory" style="margin-left: 4vh; margin-right: 4vh;">
                            <div style="height: 32vh; display: flex; flex-direction: column; ">
                                <text style="width: 100%; margin-top: 2.5vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    荔园宿舍
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    具体地点：翰林二号、教学楼附近
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    基础设施：四人寝、上床下桌、均安装有电梯
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    住宿费用：1000-1500元
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    热水供应时间：18:00-24:00，荔五全天
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    电力、网络供应时间：全天
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 84%; margin-left: 10%; text-align: left; font-size: 1.8vh;">
                                    宿舍图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 24vh; height: 16vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/zs-ly-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/zs-ly-2.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往荔园宿舍街景</el-button>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                        </div>
                        <!-- 荔园 -->
                        <div class="dormitory" style="margin-left: 6vh;margin-right: 2vh;">
                            <div style="height: 32vh; display: flex; flex-direction: column; ">
                                <text style="width: 100%; margin-top: 2.5vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    荔园宿舍
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    具体地点：体育馆、北门附近
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    基础设施：一/二人寝、1m床、均安装有电梯
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    住宿费用：2000-5000元
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    热水供应时间：全天
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    电力、网络供应时间：全天
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 84%; margin-left: 10%; text-align: left; font-size: 1.8vh;">
                                    宿舍图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 24vh; height: 16vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/zs-jy-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/zs-jy-2.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往槿园宿舍街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="交通">
                    <div style="width: 100%; height: 68vh; display: flex; flex-direction: row; margin-top: 1vh;">
                        <!-- 校内出行 -->
                        <div class="traffic">
                            <div style="height: 23vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 3vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    校内出行
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    共享单车：哈啰、美团、青桔
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    校内小巴：享坐车
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    校区巴士：岐关拱运巴士
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 90%; margin-left: 0.8vw; height: 2.5vh; text-align: left; font-size: 1.8vh;">
                                    岐关车上车点：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jt-jxlscd.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往教学楼上车点</el-button>
                                    </div>
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jt-byyscd.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往博雅苑上车点</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 白埔路口 -->
                        <div class="traffic">
                            <div style="height: 39vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 3vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    白埔路口公交车站
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    距离：北门外200m
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    线路：3、10A、66、68、69、85、Z75
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    目的地：拱北口岸、港珠澳大桥口岸、珠海站、唐家湾站、九州港、官塘、宝龙城、万象城、扬名广场、格力海岸、圆明新园、中大五院等
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <text style="width: 90%; margin-left: 5%; height: 2.5vh; text-align: left; font-size: 1.8vh;">
                                        最近校门：
                                    </text>
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jt-bm.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往北门街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <!-- 唐南路西 -->
                        <div class="traffic">
                            <div style="height: 39vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 3vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    唐南路西公交车站
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    距离：华夏门外200m
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    线路：3A
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    目的地：九州港、扬名广场、吉大等
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    最近校门：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jt-hxm.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往华夏门街景</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 中山大学 -->
                        <div class="traffic">
                            <div style="height: 39vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 3vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    中山大学公交车站
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    距离：南门外700m
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    线路：3、3A、10A、66、68、69、85、Z75
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    目的地：拱北口岸、港珠澳大桥口岸、珠海站、唐家湾站、九州港、官塘、宝龙城、万象城、扬名广场、格力海岸、圆明新园、中大五院等
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    最近校门：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jt-nm.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往南门街景</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 唐家湾站 -->
                        <div class="traffic">
                            <div style="height: 26vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 3vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    唐家湾站高铁站
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    距离：约7.5km
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    线路：广珠城际列车
                                </text>
                                <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                    目的地：珠海站、广州南站、中山站、顺德站、珠海机场站、明珠站等
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    唐家湾站图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jt-tjwz.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jt-hxm.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往华夏门街景</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="就医与保卫">
                    <div style="width: 100%; height: 78vh; display: flex; flex-direction: row; margin-top: 1vh;">
                        <!-- 校医院 -->
                        <div class="hospital " style="margin-left: 2vh; margin-right: 6vh;">
                            <div style="height: 25vh; display: flex; flex-direction: column; ">
                                <text style="width: 100%; margin-top: 2.5vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    校医院
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    具体地点：榕园、博雅苑附近
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    科室：发热门诊等
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    开放时间：全天
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    电话号码：0756-3668120
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 84%; margin-left: 10%; text-align: left; font-size: 1.8vh;">
                                    校医院图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 24vh; height: 16vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jyybw-xyy-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jyybw-xyy-2.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往校医院街景</el-button>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                        </div>
                        <!-- 中大五院 -->
                        <div class="hospital " style="margin-left: 4vh; margin-right: 4vh;">
                            <div style="height: 25vh; display: flex; flex-direction: column; ">
                                <text style="width: 100%; margin-top: 2.5vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    中大五院
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    具体地点：港湾大道、华子石东
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    科室：急诊、全科门诊等
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    开放时间：全天
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    电话号码：0756-2528888
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 84%; margin-left: 10%; text-align: left; font-size: 1.8vh;">
                                    中大五院图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 24vh; height: 16vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jyybw-zdwy-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jyybw-zdwy-2.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;" @click="redirectTo_jyybw_zdwy">点击前往中大五院官网</el-button>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                        </div>
                        <!-- 中大五院 -->
                        <div class="hospital"  style="margin-left: 6vh; margin-right: 2vh;">
                            <div style="height: 25vh; display: flex; flex-direction: column; ">
                                <text style="width: 100%; margin-top: 2.5vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    学校保卫处
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    具体地点：荔园一号
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    电话号码：0756-3668006
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 84%; margin-left: 10%; text-align: left; font-size: 1.8vh;">
                                    学校保卫处图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 24vh; height: 16vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jyybw-bwc-1.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/jyybw-bwc-2.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往荔园一号街景</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                    </div>
                </el-tab-pane>
                <el-tab-pane label="校区管委会">
                    <div class="committee" style="margin-top: 1vh;">
                        <div style="height: 20vh; display: flex; flex-direction: column;">
                            <text style="width: 100%; margin-top: 3vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                中山大学珠海校区管委会
                            </text>
                            <text style="width: 80%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                具体地点：翰林一号
                            </text>
                            <text style="width: 80%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                电话号码：0756-3668129
                            </text>
                            <text style="width: 80%; margin-left: 10%; margin-bottom: 3.5vh; text-align: left; font-size: 1.8vh;">
                                相关部门：中山大学珠海校区管委会、财务处、教务处、总务处、基建处等
                            </text>
                        </div>
                        
                        <div style="margin-top: 2vh; display: flex; flex-direction: row; align-items: center; justify-content: center;">
                            <div style="width: 28vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/xqgwh-hlyh.jpg" style="margin-top: 1vh; width: 24vh; height: 16vh;">
                                <el-button style="width: 24vh; height: 3vh;">点击前往翰林一号街景</el-button>
                            </div>
                            <div style="width: 28vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/xqgwh-gwh.jpg" style="margin-top: 1vh; width: 24vh; height: 16vh;">
                                <el-button style="width: 24vh; height: 3vh;" @click="redirectTo_xqgwh_gwh">点击前往管委会网站</el-button>
                            </div>
                            <div style="width: 28vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/xqgwh-gzh.jpg" style="margin-top: 1vh; width: 16vh; height: 16vh;">
                                <el-button style="width: 18vh; height: 3vh;" @click="redirectTo_xqgwh_wxgzh">点击前往管委会公众号</el-button>
                            </div>
                            
                        </div>
                        <div style="margin-top: 2vh; display: flex; flex-direction: row; align-items: center; justify-content: center;">
                            <div style="width: 28vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/xqgwh-gym.jpg" style="margin-top: 1vh; width: 24vh; height: 16vh;">
                                <el-button style="width: 24vh; height: 3vh;" @click="redirectTo_xqgwh_gym">点击前往中大体育场馆预定</el-button>
                            </div>
                            
                            <div style="width: 28vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/xqgwh-ewpay.jpg" style="margin-top: 1vh; width: 24vh; height: 16vh;">
                                <el-button style="width: 24vh; height: 3vh;" @click="redirectTo_xqgwh_ewpay">点击前往水电费交费网站</el-button>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>

        <!-- </div> -->

    </div>
</template>


<script setup lang="ts">
    import { onMounted, ref, computed, nextTick } from 'vue';

    onMounted(() => {
        get_vh();
    });

    // 计算闪烁点相关
    const full_contain_ref = ref<HTMLDivElement | null>(null)
    var full_contain_ref_height = ref(0);
    var full_contain_ref_vh = ref(0);
    const get_vh = () => { 
        // alert("2:"+full_contain_ref.value);
        // 动态调整背景图片的宽度和高度
        if (full_contain_ref.value){
            full_contain_ref_height.value = full_contain_ref.value.clientHeight;
            full_contain_ref_vh.value = 6.4 * full_contain_ref_height.value / 90.0;

        }
        // alert("3:"+full_contain_ref_vh.value);
    };  

    const redirectTo_xx_tsg = () => {
        window.open('https://library.sysu.edu.cn/');
    };
    const redirectTo_xx_jwxt = () => {
        window.open('https://jwxt.sysu.edu.cn/jwxt/');
    };
    const redirectTo_xx_jj = () => {
        window.open('https://fgw.sysu.edu.cn/zhuhai/about');
    };
    const redirectTo_jyybw_zdwy = () => {
        window.open('http://www.sysu5.cn/');
    };
    const redirectTo_xqgwh_gwh = () => {
        window.open('https://fgw.sysu.edu.cn/zhuhai/');
    };
    const redirectTo_xqgwh_wxgzh = () => {
        window.open('https://wx.qq.com/');
    };
    const redirectTo_xqgwh_gym = () => {
        window.open('https://tiyu.sysu.edu.cn/node/39');
    };
    const redirectTo_xqgwh_ewpay = () => {
        window.open('http://ewpay.sysu.edu.cn/ewpay/index.jsp');
    };
    




    const emit = defineEmits(['closeUsefulInfoView']);
    
    const closeUsefulInfoView = () => {
        emit('closeUsefulInfoView');
    };

    const tableData = [
    {
        aaa: 'B203',
        bbb: 'B303',
        ccc: 'B503',
        ddd: 'C201',
        eee: 'C203',
        fff: 'C205',
        ggg: 'C207',
        hhh: 'C210',
        iii: 'C301',
        jjj: 'C302'
    },
    {
        aaa: 'C303',
        bbb: 'C305',
        ccc: 'C307',
        ddd: 'C310',
        eee: 'C312',
        fff: 'C402',
        ggg: 'C403',
        hhh: 'C405',
        iii: 'C407',
        jjj: 'C408'
    },
    {
        aaa: 'C410',
        bbb: 'C412',
        ccc: 'C501',
        ddd: 'C502',
        eee: 'C503',
        fff: 'C505',
        ggg: 'C507',
        hhh: 'C508',
        iii: 'C510',
        jjj: 'C512'
    },
    {
        aaa: 'D201',
        bbb: 'D204',
        ccc: 'D206',
        ddd: 'D207',
        eee: 'D208',
        fff: 'D209',
        ggg: 'D301',
        hhh: 'D304',
        iii: 'D306',
        jjj: 'D307'
    },
    {
        aaa: 'D308',
        bbb: 'D309',
        ccc: 'D404',
        ddd: 'D406',
        eee: 'D407',
        fff: 'D408',
        ggg: 'D409',
        hhh: 'D501',
        iii: 'D504',
        jjj: 'D506'
    },
    {
        aaa: 'D507',
        bbb: 'D508',
        ccc: 'E201',
        ddd: 'E202',
        eee: 'E203',
        fff: 'E204',
        ggg: 'E205',
        hhh: 'E206',
        iii: 'E207',
        jjj: 'E209'
    },
    {
        aaa: 'E301',
        bbb: 'E302',
        ccc: 'E303',
        ddd: 'E304',
        eee: 'E305',
        fff: 'E306',
        ggg: 'E307',
        hhh: 'E309',
        iii: 'E402',
        jjj: 'E404'
    },
    {
        aaa: 'E406',
        bbb: 'E501',
        ccc: 'E502',
        ddd: 'E504',
        eee: 'E506',
        fff: 'F201',
        ggg: 'F202',
        hhh: 'F203',
        iii: 'F204',
        jjj: 'F205'
    },
    {
        aaa: 'F206',
        bbb: 'F207',
        ccc: 'F208',
        ddd: 'F209',
        eee: 'F212',
        fff: 'F301',
        ggg: 'F303',
        hhh: 'F304',
        iii: 'F305',
        jjj: 'F306'
    },
    {
        aaa: 'F307',
        bbb: 'F309',
        ccc: 'F317',
        ddd: 'F402',
        eee: 'F403',
        fff: 'F404',
        ggg: 'F405',
        hhh: 'F406',
        iii: 'F407',
        jjj: 'F408'
    },
    {
        aaa: 'F410',
        bbb: 'F412',
        ccc: 'F414',
        ddd: 'F416',
        eee: 'F418',
        fff: 'F420',
        ggg: 'F501',
        hhh: 'F502',
        iii: 'F504',
        jjj: 'F508'
    },
    {
        aaa: 'F509',
        bbb: 'F512',
        ccc: 'F514',
        ddd: 'F516',
        eee: '',
        fff: '',
        ggg: '',
        hhh: '',
        iii: '',
        jjj: ''
    }]

</script>


<style>
.full_contain{
    background-color: rgb(242, 245, 252);
    border-radius: 1vw;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

.delete-button {
    position: absolute;
    right: 2%;
    top: 2%;
    z-index: 10;
}

.delete-button img {
    width: 30px;
    height: 30px;
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

/* 头部 */
.demo-tabs {
    width: 120vh;
    height: 82vh;
    margin-top: 4vh;
}

.el-tabs__header {
    height: 4vh;
}
.el-tabs__item {
    font-size: 1.8vh; /* 设置为你想要的字体大小 */
}






/* 学习 */
.study_library{
    width: 100%; 
    height: 20vh; 
    background-color: white; 
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
}

.study_teaching_building{
    width: 72vh; 
    margin-top: 2vh;
    height: 52vh; 
    background-color: white; 
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.el-table__row {
    height: 3vh; /* 每一行的高度 */
}

.study_department_building{
    width: 46vh; 
    margin-top: 2vh;
    margin-left: 2vh;
    height: 52vh; 
    background-color: white; 
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

/* 饮食 */
.canteen{
    width: 19.2%; 
    margin-right: 1%; 
    height: 74vh; 
    background-color: white; 
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    color: black; 
    display: flex; 
    flex-direction: column;
    border-radius: 1vh;
}

/* 住宿 */
.dormitory {
    width: 28%; 
    margin-right: 8%; 
    height: 74vh; 
    background-color: white; 
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    color: black; 
    display: flex; 
    flex-direction: column;
    border-radius: 1vh;
}

/* 交通 */
.traffic{
    width: 19.2%; 
    margin-right: 1%; 
    height: 60vh; 
    background-color: white; 
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    color: black; 
    display: flex; 
    flex-direction: column;
    border-radius: 1vh;
}

/* 就医 */
.hospital {
    width: 28%; 
    margin-right: 8%; 
    height: 68vh; 
    background-color: white; 
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    color: black; 
    display: flex; 
    flex-direction: column;
    border-radius: 1vh;
}

/* 管委会 */
.committee{
    width: 100%; 
    height: 72vh; 
    background-color: white; 
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    color: black; 
    display: flex; 
    flex-direction: column;
    border-radius: 1vh;
}

.el-button {
  font-size: 1.5vh ;
}
</style>

<style scoped>
::v-deep .el-tabs__item.is-active {
  color: #005826;
  opacity: 1;
}
 
::v-deep .el-tabs__item:hover {
  color: #005826;
  cursor: pointer;
  opacity: 1;
}

/*去下划线 */
::v-deep .el-tabs__nav-wrap::after {
  position: static !important;
}
 
/* 下划线颜色 */
::v-deep .el-tabs__active-bar {
  background-color: #005826;
}
</style>

