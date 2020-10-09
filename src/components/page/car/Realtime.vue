<template>
    <div>
        <header>
            <span class="history">历史轨迹</span>
            <p>请选择医院监控点：</p>
            <div class="time">
                <div class="block">
                    <span class="demonstration">开始时间：</span>
                    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                </div>
                <div class="block-1">
                    <div class="block_top">
                        <span class="demonstration">结束时间：</span>
                        <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                    </div>
                    <div class="block_search">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="选择收集人:" style="line-height: 40px">
                                <el-select v-model="formInline.region" placeholder="活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div></div>
            </div>
        </header>
        <nav>
            <el-steps :active="1">
                <el-step title="血透中心"></el-step>
                <el-step title="妇科"></el-step>
                <el-step title="海扶中心"></el-step>
                <el-step title="生殖中心"></el-step>
                <el-step title="影像科"></el-step>
                <el-step title="口腔科"></el-step>
                <!-- <el-step title="海扶中心"></el-step>
                <el-step title="海扶中心"></el-step>
                <el-step title="海扶中心"></el-step> -->
                <el-steps direction="vertical" :active="1">
                    <el-step title="康复科"></el-step>
                    <el-step title="耳鼻喉科"></el-step>
                </el-steps>
            </el-steps>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formInline: {
                user: '',
                region: ''
            },
            value1: ''
        };
    }
};
</script>

<style lang="less">
header {
    .history {
        margin: 0%;
        padding: 0;
        font-weight: 700;
    }
    .time {
        background-color: #ddd;
        overflow: hidden;
        line-height: 40px;
        height: 40px;
        .block {
            float: left;
        }
        .block-1 {
            float: right;
            overflow: hidden;
            .block_top {
                float: left;
            }
            .block_search {
                float: right;
            }
        }
    }
}
nav {
    margin-top: 2%;
}
</style>