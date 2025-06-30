<template>
    <div class="m-useful-info-container">
        <div class="delete-button">
            <el-button style="background-color: rgba(0, 0, 0, 0); border: 0;" @click.stop="closeUsefulInfoView">
                <img style="width: 30px; height: 30px;" src="../../assets/icons/delete.png">
            </el-button>
        </div>
        
        <div class="header">
            <text class="title" style="color: #005826; font-size: 6vw;">实用信息</text>
        </div>
        
        <div class="content">
            <!-- 学习区域 -->
            <div class="info-section">
                <text class="section-title"> 学习</text>
                <div class="info-item">
                    <text class="item-title">图书馆</text>
                    <text class="item-detail">地点：中山大学珠海校区南门</text>
                    <text class="item-detail">时间：8:00-22:30</text>
                    <text class="item-detail">纸质藏书：300万册+，期刊1625种</text>
                    <text class="item-detail">电子资源：数据库1000+个，电子图书276万册+</text>
                    <text class="item-detail">容量：阅览座位1106席，研讨室15间</text>
                    <div class="button-group">
                        <el-button size="small" @click="redirectTo_xx_tsg">图书馆官网</el-button>
                        <el-button size="small" @click="handleSceneJump('图书馆街景', 'rh-1-31')">街景导览</el-button>
                    </div>
                </div>
                <div class="info-item">
                    <text class="item-title">教学楼</text>
                    <text class="item-detail">地点：逸仙大道中部，图书馆后方</text>
                    <text class="item-detail">时间：7:00-22:00</text>
                    <text class="item-detail">教室：共179间，可容纳2万学生上课</text>
                    <div class="button-group">
                        <el-button size="small" @click="redirectTo_xx_jwxt">教务系统</el-button>
                        <el-button size="small" @click="handleSceneJump('教学楼街景', 'yxdd-1-59')">街景导览</el-button>
                    </div>
                </div>
            </div>

            <!-- 饮食区域 -->
            <div class="info-section">
                <text class="section-title"> 饮食</text>
                <div class="info-item">
                    <text class="item-title">榕园食堂</text>
                    <text class="item-detail">时间：6:00-10:00，11:00-13:00，17:00-19:00</text>
                    <text class="item-detail">特色：一楼自选、二楼石锅饭、二楼西北餐厅</text>
                    <text class="item-detail">价格：8-15元</text>
                    <el-button size="small" @click="handleSceneJump('榕园食堂街景', 'ry-1-1')">街景导览</el-button>
                </div>
                <div class="info-item">
                    <text class="item-title">荔园食堂</text>
                    <text class="item-detail">时间：6:00-10:00，11:00-13:00，17:00-19:00</text>
                    <text class="item-detail">特色：一楼手工拉面、二楼肯德基</text>
                    <text class="item-detail">价格：12-18元</text>
                    <el-button size="small" @click="handleSceneJump('荔园食堂街景', 'ly-2-13')">街景导览</el-button>
                </div>
                <div class="info-item">
                    <text class="item-title">槿园食堂</text>
                    <text class="item-detail">时间：6:00-10:30，11:00-13:00，17:00-19:00</text>
                    <text class="item-detail">特色：一楼面点、二楼自选、二楼烧腊、三楼东北盒饭</text>
                    <text class="item-detail">价格：12-18元</text>
                    <el-button size="small" @click="handleSceneJump('槿园食堂街景', 'jy-2-4')">街景导览</el-button>
                </div>
                <div class="info-item">
                    <text class="item-title">若海食堂</text>
                    <text class="item-detail">时间：6:00-10:30，11:00-13:00，17:00-19:00</text>
                    <text class="item-detail">特色：一楼小肥羊、一楼黄记煌、二楼烧腊、三楼餐厅</text>
                    <text class="item-detail">价格：12-18元</text>
                    <el-button size="small" @click="handleSceneJump('若海食堂街景', 'rh-3-3')">街景导览</el-button>
                </div>
            </div>

            <!-- 住宿区域 -->
            <div class="info-section">
                <text class="section-title"> 住宿</text>
                <div class="info-item">
                    <text class="item-title">榕园宿舍</text>
                    <text class="item-detail">地点：翰林三号、华夏门附近</text>
                    <text class="item-detail">设施：四人寝、上床下桌、均安装电梯</text>
                    <text class="item-detail">费用：1000-1500元</text>
                    <text class="item-detail">热水：18:00-24:00</text>
                    <el-button size="small" @click="handleSceneJump('榕园宿舍街景', 'ry-1-9')">街景导览</el-button>
                </div>
                <div class="info-item">
                    <text class="item-title">荔园宿舍</text>
                    <text class="item-detail">地点：翰林二号、教学楼附近</text>
                    <text class="item-detail">设施：四人寝、上床下桌、均安装电梯</text>
                    <text class="item-detail">费用：1000-1500元</text>
                    <text class="item-detail">热水：18:00-24:00，荔五全天</text>
                    <el-button size="small" @click="handleSceneJump('荔园宿舍街景', 'ly-3-12')">街景导览</el-button>
                </div>
                <div class="info-item">
                    <text class="item-title">槿园宿舍</text>
                    <text class="item-detail">地点：体育馆、北门附近</text>
                    <text class="item-detail">设施：一/二人寝、1m床、均安装电梯</text>
                    <text class="item-detail">费用：2000-5000元</text>
                    <text class="item-detail">热水：全天供应</text>
                    <el-button size="small" @click="handleSceneJump('槿园宿舍街景', 'jy-2-2')">街景导览</el-button>
                </div>
            </div>

            <!-- 交通区域 -->
            <div class="info-section">
                <text class="section-title"> 交通</text>
                <div class="info-item">
                    <text class="item-title">校内出行</text>
                    <text class="item-detail">共享单车：哈啰、美团、青桔</text>
                    <text class="item-detail">校内小巴：享坐车</text>
                    <text class="item-detail">校区巴士：岐关拱运巴士</text>
                    <div class="button-group">
                        <el-button size="small" @click="handleSceneJump('教学楼上车点', 'jxl-1-6')">教学楼上车点</el-button>
                        <el-button size="small" @click="handleSceneJump('博雅苑上车点', 'byy-1-30')">博雅苑上车点</el-button>
                    </div>
                </div>
                <div class="info-item">
                    <text class="item-title">白埔路口公交站</text>
                    <text class="item-detail">距离：北门外200m</text>
                    <text class="item-detail">线路：3、10A、66、68、69、85、Z75</text>
                    <text class="item-detail">目的地：拱北口岸、港珠澳大桥口岸、珠海站等</text>
                    <el-button size="small" @click="handleSceneJump('北门街景', 'jy-2-23')">北门街景</el-button>
                </div>
                <div class="info-item">
                    <text class="item-title">唐家湾站</text>
                    <text class="item-detail">距离：约7.5km</text>
                    <text class="item-detail">线路：广珠城际列车</text>
                    <text class="item-detail">目的地：珠海站、广州南站、中山站等</text>
                </div>
            </div>

            <!-- 就医与保卫区域 -->
            <div class="info-section">
                <text class="section-title"> 就医与保卫</text>
                <div class="info-item">
                    <text class="item-title">校医院</text>
                    <text class="item-detail">地点：榕园、博雅苑附近</text>
                    <text class="item-detail">时间：全天开放</text>
                    <text class="item-detail">电话：0756-3668120</text>
                    <el-button size="small" @click="handleSceneJump('校医院街景', 'byy-1-13')">街景导览</el-button>
                </div>
                <div class="info-item">
                    <text class="item-title">中大五院</text>
                    <text class="item-detail">地点：港湾大道、华子石东</text>
                    <text class="item-detail">科室：急诊、全科门诊等</text>
                    <text class="item-detail">电话：0756-2528888</text>
                    <el-button size="small" @click="redirectTo_jyybw_zdwy">官网</el-button>
                </div>
                <div class="info-item">
                    <text class="item-title">学校保卫处</text>
                    <text class="item-detail">地点：荔园一号</text>
                    <text class="item-detail">电话：0756-3668006</text>
                    <el-button size="small" @click="handleSceneJump('荔园一号街景', 'yxdd-1-44')">街景导览</el-button>
                </div>
            </div>

            <!-- 校区管委会区域 -->
            <div class="info-section">
                <text class="section-title" > 校区管委会</text>
                <div class="info-item">
                    <text class="item-title">中山大学珠海校区管委会</text>
                    <text class="item-detail">地点：翰林一号</text>
                    <text class="item-detail">电话：0756-3668129</text>
                    <text class="item-detail">部门：管委会、财务处、教务处、总务处、基建处等</text>
                    <div class="button-group">
                        <el-button size="small" @click="handleSceneJump('翰林一号街景', 'yxdd-3-7')">街景导览</el-button>
                        <el-button size="small" @click="redirectTo_xqgwh_gwh">官网</el-button>
                        <el-button size="small" @click="redirectTo_xqgwh_gym">体育场馆预定</el-button>
                        <el-button size="small" @click="redirectTo_xqgwh_ewpay">水电费缴费</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, computed, nextTick } from 'vue';

    // 声明window上的streetViewer属性
    declare global {
        interface Window {
            streetViewer?: {
                switchScene: (name: string) => void;
            };
        }
    }

    // 地点跳转相关函数
    const handleSceneJump = (sceneName: string, sceneId: string = '') => {
        console.log('正在跳转到:', sceneName, sceneId);
        
        // 先关闭实用信息界面和sidebar
        emit('closeUsefulInfoViewWithSidebar');
        
        // 延迟后开始跳转逻辑
        setTimeout(() => {
            // 如果没有提供sceneId，则只是关闭界面，不跳转
            if (!sceneId) {
                console.log(`${sceneName}的场景ID暂未配置`);
                return;
            }
            
            // 获取当前的viewer组件
            const viewerGroup = (window as any).viewerGroup;
            if (!viewerGroup) {
                console.error('无法获取viewerGroup');
                return;
            }
            
            // 检查当前是否在street viewer中
            const currentViewer = viewerGroup.currentViewer;
            console.log('当前viewer:', currentViewer);
            
            if (currentViewer !== 'street') {
                // 如果不在street viewer中，先切换到street viewer
                console.log('当前不在street viewer，先切换到street viewer');
                viewerGroup.switchViewer('street');
                
                // 等待切换完成后再跳转场景
                setTimeout(() => {
                    if ((window as any).streetViewer && sceneId) {
                        console.log('切换到street viewer完成，跳转场景:', sceneId);
                        (window as any).streetViewer.switchScene(sceneId);
                    }
                }, 500); // 给一点时间让viewer切换完成
            } else {
                // 如果已经在street viewer中，直接跳转场景
                if ((window as any).streetViewer && sceneId) {
                    console.log('已在street viewer中，直接跳转场景:', sceneId);
                    (window as any).streetViewer.switchScene(sceneId);
                }
            }
        }, 300); // 先等待页面关闭动画完成，再开始跳转
    };

    // 外部链接跳转函数
    const redirectTo_xx_tsg = () => {
        window.open('https://library.sysu.edu.cn/');
    };
    const redirectTo_xx_jwxt = () => {
        window.open('https://jwxt.sysu.edu.cn/jwxt/');
    };
    const redirectTo_jyybw_zdwy = () => {
        window.open('http://www.sysu5.cn/');
    };
    const redirectTo_xqgwh_gwh = () => {
        window.open('https://fgw.sysu.edu.cn/zhuhai/');
    };
    const redirectTo_xqgwh_gym = () => {
        window.open('https://tiyu.sysu.edu.cn/node/39');
    };
    const redirectTo_xqgwh_ewpay = () => {
        window.open('http://ewpay.sysu.edu.cn/ewpay/index.jsp');
    };
    
    const emit = defineEmits(['closeUsefulInfoView', 'closeUsefulInfoViewWithSidebar']);
    
    const closeUsefulInfoView = () => {
        emit('closeUsefulInfoView');
    };
</script>

<style scoped>
.m-useful-info-container {
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
}

.delete-button {
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 10;
}

.delete-button img {
    width: 20px !important;
    height: 20px !important;
}

.header {
    width: 100%;
    height: 12vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid #e0e0e0;
    background: white;
    color: #005826;
    flex-shrink: 0;
}

.title {
    font-weight: bold;
    color: #005826;
}

.content {
    background-image: url(../../assets/background.png);
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.info-section {
    margin-bottom: 20px;
    border-radius: 12px;
    width: 95%;
    background-color: white;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 5vw;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 15px;
    text-align: center;
    border-bottom: 2px solid #bdc3c7;
    padding-bottom: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info-item {
    margin-bottom: 15px;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.item-title {
    font-size: 4vw;
    font-weight: bold;
    color: #005826;
    margin-bottom: 5px;
}

.item-detail {
    font-size: 3.2vw;
    color: #555;
    line-height: 1.4;
    margin-bottom: 2px;
    text-align: left;
}

.button-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
    justify-content: center;
}

.button-group .el-button {
    font-size: 2.8vw;
    padding: 4px 8px;
    height: auto;
    min-height: 28px;
}

/* 单个按钮居中对齐 */
.info-item > .el-button {
    font-size: 2.8vw;
    padding: 4px 8px;
    height: auto;
    min-height: 28px;
    align-self: center;
    margin-top: 8px;
}

/* 滚动条美化 */
.content::-webkit-scrollbar {
    width: 6px;
}

.content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.content::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style> 