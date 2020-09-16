<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style lang="less">
* {
    padding: 0;
    margin: 0;
}
html,
body,
#app {
    width: 100%;
    height: 100%;
    // margin-top: -10px;
}
a {
    text-decoration-line: none;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
}
#nav {
    padding: 0 20px;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
    background: rgba(125, 125, 0, 0.3);
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
        margin: 0 5px;
    }
    span {
        float: right;
    }
}
.content-box {
    position: absolute;
    left: 200px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    background: #f0f0f0;
    .content {
        width: auto;
        height: 100%;
        padding: 10px;
        overflow-y: scroll;
        box-sizing: border-box;
    }
}

// .content {
//     width: auto;
//     height: 100%;
//     padding: 10px;
//     overflow-y: scroll;
//     box-sizing: border-box;
// }

.content-collapse {
    left: 65px;
}

.container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.crumbs {
    margin: 10px 0;
}

.el-table th {
    background-color: #f5f7fa !important;
}

.pagination {
    margin: 20px 0;
    text-align: right;
}

.plugins-tips {
    padding: 20px 10px;
    margin-bottom: 20px;
}

.el-button + .el-tooltip {
    margin-left: 10px;
}

.el-table tr:hover {
    background: #f6faff;
}

.mgb20 {
    margin-bottom: 20px;
}

.move-enter-active,
.move-leave-active {
    transition: opacity 0.5s;
}

.move-enter,
.move-leave {
    opacity: 0;
}

/*BaseForm*/

// .form-box {
//     width: 600px;
// }

.form-box .line {
    text-align: center;
}

.el-time-panel__content::after,
.el-time-panel__content::before {
    margin-top: -7px;
}

.el-time-spinner__wrapper .el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default) {
    padding-bottom: 0;
}

.el-form-item__content{
    display: flex;
}


/*Upload*/

.pure-button {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 3px;
}

.g-core-image-corp-container .info-aside {
    height: 45px;
}

.el-upload--text {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.el-upload--text .el-icon-upload {
    font-size: 67px;
    color: #97a8be;
    margin: 40px 0 16px;
    line-height: 50px;
}

.el-upload--text {
    color: #97a8be;
    font-size: 14px;
    text-align: center;
}

.el-upload--text em {
    font-style: normal;
}

/*VueEditor*/

.ql-container {
    min-height: 400px;
}

.ql-snow .ql-tooltip {
    transform: translateX(117.5px) translateY(10px) !important;
}

.editor-btn {
    margin-top: 20px;
}

/*markdown*/

.v-note-wrapper .v-note-panel {
    min-height: 500px;
} 
</style>
