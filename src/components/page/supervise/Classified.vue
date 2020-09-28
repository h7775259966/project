<template>
    <div>
        <header>
            <span>医废分级统计</span>
            <div>
                <div class="block">
                    <span class="demonstration">开始时间：</span>
                    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                </div>
                <div class="block">
                    <span class="demonstration">结束时间：</span>
                    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>