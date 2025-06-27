<template>
    <div class="full_contain" ref="full_contain_ref">
        <!-- <div style="width: 100%; height: 100%;"> -->
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="学习">
                    <div class="study_library">
                        <div style="width: 66vh; margin-left: 4vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <text style="width: 66vh; margin-bottom: 0.2vh; text-align: left; font-weight: bold; color: black; font-size: 2vh;" >
                                图书馆
                            </text>
                            <text style="width: 66vh; margin-bottom: 0.2vh; text-align: left; color: black; font-size: 1.5vh;" >
                                具体地点：中山大学珠海校区南门
                            </text>
                            <text style="width: 66vh; margin-bottom: 0.2vh; text-align: left; color: black; font-size: 1.5vh;" >
                                开放时间：7:00-22:00
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
                            <img src="../../assets/library-website.jpg" style="margin-top: 1.5vh; width: 22.4vh; height: 14vh;">
                            <el-button style="width: 22.4vh; height: 2.5vh;">点击前往图书馆网站</el-button>
                        </div>
                        <div style="width: 25vh; padding-right: 2vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.png" style="margin-top: 1.5vh; width: 21vh; height: 14vh;">
                            <el-button style="width: 21vh; height: 2.5vh;">点击前往图书馆街景</el-button>
                        </div>
                        
                    </div>
                    <div style="display: flex; flex-direction: row;">
                        <div class="study_teaching_building ">
                            <div style="display: flex; flex-direction: column; justify-content: center; margin-left: 4vh;">
                                <text style="margin-top: 5vh; margin-bottom: 0.5vh; text-align: left; font-weight: bold; color: black; font-size: 2vh;" >
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
                                    style="width: 64vh; height: 13vh;"
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
                                    <img src="../../assets/classroom1.jpg" style="margin-top: 1vh; width: 21.3vh; height: 12vh;">
                                    <el-button style="width: 21.3vh; height: 2.5vh;">点击前往中山大学教务系统</el-button>
                                </div>
                                <div style="width: 21.3vh; margin-right: 2vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                    <img src="../../assets/classroom2.jpg" style="margin-top: 1vh; width: 21.3vh; height: 12vh;">
                                    <el-button style="width: 21.3vh; height: 2.5vh;">点击前往中山大学珠海校区简介</el-button>
                                </div>
                                <div style="width: 18vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                    <img src="../../assets/library.png" style="margin-top: 1vh; width: 18vh; height: 12vh;">
                                    <el-button style="width: 18vh; height: 2.5vh;">点击前往教学楼街景</el-button>
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
                                    微电子学院：A211、A217
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    软件工程学院：A311、A317
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    人工智能学院：A411、A417
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    微电子学院：A211、A217
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    软件工程学院：A311、A317
                                </text>
                                <text style="margin-bottom: 0.5vh; text-align: left; color: black; font-size: 1.5vh;" >
                                    人工智能学院：A411、A417
                                </text>
                                
                                
                            </div>
                            <div style="display: flex; flex-direction: row;">
                                <div style="display: flex; flex-direction: row; justify-content: center; ">
                                    <div style="width: 18vh; margin-left: 4vh; margin-right: 2vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library.png" style="margin-top: 1vh; width: 18vh; height: 12vh;">
                                        <el-button style="width: 18vh;">点击前往翰林二号街景</el-button>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: row; justify-content: center;">
                                    <div style="width: 18vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library.png" style="margin-top: 1vh; width: 18vh; height: 12vh;">
                                        <el-button style="width: 18vh;">点击前往海琴五号街景</el-button>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="饮食">
                    <div style="width: 100%; height: 78vh; display: flex; flex-direction: row;">
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
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
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
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往荔园食堂街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <!-- 槿园 -->
                         <div class="canteen">
                            <div style="height: 28vh; display: flex; flex-direction: column;">
                                <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
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
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
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
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
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
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往北门街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </el-tab-pane>
                <el-tab-pane label="住宿">
                    <div style="width: 100%; height: 78vh; display: flex; flex-direction: row;">
                        <!-- 榕园 -->
                        <div class="dormitory ">
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
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往榕园宿舍街景</el-button>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                        </div>
                        <!-- 荔园 -->
                        <div class="dormitory ">
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
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往荔园宿舍街景</el-button>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                        </div>
                        <!-- 荔园 -->
                        <div class="dormitory" style="margin-right: 0;">
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
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往槿园宿舍街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="交通">
                    <div style="width: 100%; height: 68vh; display: flex; flex-direction: row;">
                        <!-- 校内出行 -->
                        <div class="traffic">
                            <div style="height: 33vh; display: flex; flex-direction: column;">
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
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    岐关车上车点图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往教学楼上车点</el-button>
                                    </div>
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往博雅苑上车点</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 白埔路口 -->
                        <div class="traffic">
                            <div style="height: 36vh; display: flex; flex-direction: column;">
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
                                <text style="width: 90%; margin-left: 0.8vw; text-align: left; font-size: 1.8vh;">
                                    公交车站图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往榕园食堂街景</el-button>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <!-- 唐南路西 -->
                        <div class="traffic">
                            <div style="height: 36vh; display: flex; flex-direction: column;">
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
                                    公交车站图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往榕园食堂街景</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 中山大学 -->
                        <div class="traffic">
                            <div style="height: 36vh; display: flex; flex-direction: column;">
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
                                    公交车站图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 18vh; height: 12vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往榕园食堂街景</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 唐家湾站 -->
                        <div class="traffic">
                            <div style="height: 36vh; display: flex; flex-direction: column;">
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
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 18vh; height: 15vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 18vh; height: 3vh;">点击前往榕园食堂街景</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="就医与保卫">
                    <div style="width: 100%; height: 78vh; display: flex; flex-direction: row;">
                        <!-- 校医院 -->
                        <div class="hospital ">
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
                                    电话号码：0756-1201201
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 84%; margin-left: 10%; text-align: left; font-size: 1.8vh;">
                                    校医院图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 24vh; height: 16vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往校医院街景</el-button>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                        </div>
                        <!-- 中大五院 -->
                        <div class="hospital ">
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
                                    电话号码：0756-1201202
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 84%; margin-left: 10%; text-align: left; font-size: 1.8vh;">
                                    中大五院图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 24vh; height: 16vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往中大五院官网</el-button>
                                    </div>
                                   
                                </div>
                                
                            
                            </div>
                        </div>
                        <!-- 中大五院 -->
                        <div class="hospital" style="margin-right: 0;" >
                            <div style="height: 25vh; display: flex; flex-direction: column; ">
                                <text style="width: 100%; margin-top: 2.5vh; margin-bottom: 1vh; font-size: 2.5vh; font-weight: bold;">
                                    学校保卫处
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    具体地点：荔园一号
                                </text>
                                <text style="width: 84%; margin-left: 10%; margin-bottom: 0.5vh; text-align: left; font-size: 1.8vh;">
                                    电话号码：0756-1101101
                                </text>
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <text style="width: 84%; margin-left: 10%; text-align: left; font-size: 1.8vh;">
                                    学校保卫处图片：
                                </text>
                                <div style="display: flex; flex-direction: column; align-items: center;">
                                    <div style="width: 24vh; height: 16vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                    </div>
                                    <div style="width: 24vh; height: 19vh; margin-top: 1vh;  display: flex; align-items: center; display: flex; flex-direction: column;">
                                        <img src="../../assets/library-website.jpg" style="width: 100%; height: 100%;">
                                        <el-button style="width: 24vh; height: 3vh;">点击前往学校保卫处官网</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                    </div>
                </el-tab-pane>
                <el-tab-pane label="校区管委会">
                    <div class="committee" >
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
                                <img src="../../assets/library-website.jpg" style="margin-top: 1vh; width: 24vh; height: 16vh;">
                                <el-button style="width: 24vh;">点击前往翰林一号街景</el-button>
                            </div>
                            <div style="width: 28vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/library-website.jpg" style="margin-top: 1vh; width: 24vh; height: 16vh;">
                                <el-button style="width: 24vh;">点击前往管委会网站</el-button>
                            </div>
                            <div style="width: 28vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/library-website.jpg" style="margin-top: 1vh; width: 24vh; height: 16vh;">
                                <el-button style="width: 24vh;">点击前往管委会公众号</el-button>
                            </div>
                            
                        </div>
                        <div style="margin-top: 2vh; display: flex; flex-direction: row; align-items: center; justify-content: center;">
                            <div style="width: 28vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/library-website.jpg" style="margin-top: 1vh; width: 24vh; height: 16vh;">
                                <el-button style="width: 24vh;">点击前往中大体育场馆预定</el-button>
                            </div>
                            
                            <div style="width: 28vh; display: flex; align-items: center; display: flex; flex-direction: column;">
                                <img src="../../assets/library-website.jpg" style="margin-top: 1vh; width: 24vh; height: 16vh;">
                                <el-button style="width: 24vh;">点击前往水电费交费网站</el-button>
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
    background-color: rgb(242, 245, 252);
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

/* 头部 */
.demo-tabs {
    width: 120vh;
    height: 80vh;
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
    height: 53vh; 
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
    height: 53vh; 
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
    color: black; 
    display: flex; 
    flex-direction: column;
    border-radius: 1vh;
}

/* 交通 */
.traffic{
    width: 19.2%; 
    margin-right: 1%; 
    height: 70vh; 
    background-color: white; 
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
    color: black; 
    display: flex; 
    flex-direction: column;
    border-radius: 1vh;
}
</style>




