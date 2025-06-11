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
            <el-tab-pane label="饮食">
                <div style="width: 100%; height: 78vh; display: flex; flex-direction: row;">
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            榕园食堂
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            开放时间：6:00-10:00，11:00-13:00，17:00-19:00
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            特色窗口：一楼自选、二楼石锅饭、二楼西北餐厅
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left;">
                            平均价格：8-15元
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            餐厅图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 12.8vw;">点击前往榕园食堂街景</el-button>
                        </div>
                          
                    </div>
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            荔园食堂
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            开放时间：6:00-10:00，11:00-13:00，17:00-19:00
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            特色窗口：一楼拉面、二楼肯德基
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left;">
                            平均价格：12-18元
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            餐厅图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 12.8vw;">点击前往荔园食堂街景</el-button>
                        </div>
                          
                    </div>
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            槿园食堂
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            开放时间：6:00-10:30，11:00-13:00，17:00-19:00
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            特色窗口：一楼面点、二楼自选、二楼烧腊、三楼东北盒饭
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.8vh; text-align: left;">
                            平均价格：12-18元
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            餐厅图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 12.8vw;">点击前往榕园食堂街景</el-button>
                        </div>
                          
                    </div>
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            若海食堂
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            开放时间：6:00-10:00，11:00-13:00，17:00-19:00
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            特色窗口：一楼必胜客、二楼烧腊、二楼自选
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 3.5vh; text-align: left;">
                            平均价格：12-18元
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            餐厅图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 12.8vw;">点击前往荔园食堂街景</el-button>
                        </div>
                          
                    </div>
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            校外美食
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            北门推荐美食：重庆小面、呱呱饺子
                        </text>
                        <text style="width: 95%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            华夏门推荐美食：唐家餸、渔记茶餐厅、白马烤鱼
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.8vh; text-align: left;">
                            南门推荐美食：伟记私房菜、鸡山煲仔饭
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            餐厅图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 12.8vw;">点击前往荔园食堂街景</el-button>
                        </div>
                          
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="住宿">
                <div style="width: 100%; height: 78vh; display: flex; flex-direction: row;">
                    <div style="width: 28%; margin-right: 8%; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            榕园宿舍
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            具体地点：翰林三号、华夏门附近
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            基础设施：四人寝、上床下桌、均安装有电梯
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            住宿费用：1000-1500元
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            热水供应时间：18:00-24:00
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            电力、网络供应时间：全天
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            宿舍图片：
                        </text>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往榕园宿舍街景</el-button>
                        </div>
                          
                    </div>
                    <div style="width: 28%; margin-right: 8%; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            荔园宿舍
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            具体地点：翰林二号、教学楼附近
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            基础设施：四人寝、上床下桌、均安装有电梯
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            住宿费用：1000-1500元
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            热水供应时间：18:00-24:00，荔五全天
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            电力、网络供应时间：全天
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            宿舍图片：
                        </text>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往荔园宿舍街景</el-button>
                        </div>
                          
                    </div>
                    <div style="width: 28%; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            槿园宿舍
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            具体地点：体育馆、北门附近
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            基础设施：一/二人寝、1m床、均安装有电梯
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            住宿费用：2000-5000元
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            热水供应时间：全天
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            电力、网络供应时间：全天
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            宿舍图片：
                        </text>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往槿园宿舍街景</el-button>
                        </div>
                          
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="交通">
                <div style="width: 100%; height: 78vh; display: flex; flex-direction: row;">
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            白埔路口公交车站
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            与学校距离：北门外200m
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            线路：3、10A、66、68、69、85、Z75
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            目的地：拱北口岸、港珠澳大桥口岸、珠海站、唐家湾站、九州港、官塘、宝龙城、万象城、扬名广场、格力海岸、圆明新园、中大五院等
                        </text>
                        
                        <text style="width: 90%; margin-left: 0.8vw; margin-top: 5vw; margin-bottom: 0.5vh; text-align: left;">
                            公交车站图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往0街景</el-button>
                        </div>
                          
                    </div>
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            唐南路西公交车站
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            与学校距离：华夏门外200m
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            线路：3A
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            目的地：九州港、扬名广场、吉大等
                        </text>
                        
                        <text style="width: 90%; margin-left: 0.8vw; margin-top: 11vw; margin-bottom: 0.5vh; text-align: left;">
                            公交车站图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往0街景</el-button>
                        </div>
                    </div>
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            中山大学公交车站
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            与学校距离：南门外700m
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            线路：3、10A、66、68、69、85、Z75
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            目的地：拱北口岸、港珠澳大桥口岸、珠海站、唐家湾站、九州港、官塘、宝龙城、万象城、扬名广场、格力海岸、圆明新园、中大五院等
                        </text>
                        
                        <text style="width: 90%; margin-left: 0.8vw; margin-top: 5vw; margin-bottom: 0.5vh; text-align: left;">
                            公交车站图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往0街景</el-button>
                        </div>
                    </div>
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            唐家湾站高铁站
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            与学校距离：约7.5km
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            线路：广珠城际列车
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            目的地：珠海站、广州南站、中山站、顺德站、珠海机场站、明珠站等
                        </text>
                        
                        <text style="width: 90%; margin-left: 0.8vw; margin-top: 10.7vw; margin-bottom: 0.5vh; text-align: left;">
                            唐家湾站图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往0街景</el-button>
                        </div>
                    </div>
                    <div style="width: 19.2%; margin-right: 1vw; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            珠海金湾机场
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            与学校距离：约60km
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            线路：国内航班
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            目的地：北京、上海、成都、重庆、武汉、杭州等
                        </text>
                        
                        <text style="width: 90%; margin-left: 0.8vw; margin-top: 12.1vw; margin-bottom: 0.5vh; text-align: left;">
                            珠海金湾机场图片：
                        </text>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <!-- <el-button style="width: 12.8vw;">点击前往图书馆网站</el-button> -->
                        </div>
                        <div style="width: 90%; margin-left: 5%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往0街景</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="就医">
                <div style="width: 100%; height: 78vh; display: flex; flex-direction: row;">
                    <div style="width: 28%; margin-right: 8%; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            校医院
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            具体地点：榕园、博雅苑附近
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            科室：发热门诊等
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            开放时间：全天
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            电话号码：0756-1201201
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-top: 3vw; margin-bottom: 0.5vh; text-align: left;">
                            校医院图片：
                        </text>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往校医院街景</el-button>
                        </div>
                          
                    </div>
                    <div style="width: 28%; margin-right: 8%; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            中大五院
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            具体地点：港湾大道、华子石东
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            科室：急诊、门诊等
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            开放时间：全天
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            电话号码：0756-1201202
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-top: 3vw; margin-bottom: 0.5vh; text-align: left;">
                            中大五院图片：
                        </text>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往校医院街景</el-button>
                        </div>
                          
                    </div>
                    <div style="width: 28%; height: 100%; background-color: #FFCC99; color: black; display: flex; flex-direction: column;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            学校保卫处
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            具体地点：荔园一号
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            电话号码：0756-1101101
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-top: 6.5vw; margin-bottom: 0.5vh; text-align: left;">
                            保卫处图片：
                        </text>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                        </div>
                        <div style="width: 70%; margin-left: 15%; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.6vw; width: 100%; height: 8vw;">
                            <el-button style="width: 100%;">点击前往荔园宿舍街景</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="校区管委会">
                <div style="width: 100%; height: 78vh; display: flex; flex-direction: column; background-color: #FFCC99;">
                    <div style="display: flex; flex-direction: column; color: black;">
                        <text style="width: 100%; margin-top: 1vh; margin-bottom: 1vh; font-size: x-large; font-weight: bold;">
                            中山大学珠海校区管委会
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            具体地点：翰林一号
                        </text>
                        <text style="width: 90%; margin-left: 0.8vw; margin-bottom: 0.5vh; text-align: left;">
                            电话号码：0756-3668129
                        </text>
                    </div>
                    <div style="display: flex; flex-direction: row;">
                        
                        <div style="margin-left: 0vw; width: 15vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 12.8vw; height: 8vw;">
                            <el-button style="width: 12.8vw;">点击前往管委会网站</el-button>
                        </div>
                        <div style="width: 15vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.png" style="margin-top: 0.8vw; width: 12vw; height: 8vw;">
                            <el-button style="width: 12vw;">点击前往翰林一号街景</el-button>
                        </div>
                        <div style="margin-left: 0vw; width: 15vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 12.8vw; height: 8vw;">
                            <el-button style="width: 12.8vw;">点击前往管委会公众号</el-button>
                        </div>
                        <div style="width: 15vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.png" style="margin-top: 0.8vw; width: 12vw; height: 8vw;">
                            <el-button style="width: 12vw;">点击前往中大体育场馆预定</el-button>
                        </div>
                        <div style="margin-left: 0vw; width: 15vw; display: flex; align-items: center; display: flex; flex-direction: column;">
                            <img src="../../assets/library.jpg" style="margin-top: 0.8vw; width: 12.8vw; height: 8vw;">
                            <el-button style="width: 12.8vw;">点击前往水电费交费网站</el-button>
                        </div>
                       
                    </div>

                </div>
            </el-tab-pane>
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




