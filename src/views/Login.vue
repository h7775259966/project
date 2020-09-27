<template>
    <div class="login">
        <div class="login-form">
            <el-form class="form-box" :model="param" :rules="rules" ref="login">
                <el-form-item class="input-box" prop="username">
                    <span class="input-icon icon-user"></span>
                    <input class="input-text" type="text" placeholder="请输入用户名(随便填)" v-model="param.username" />
                </el-form-item>
                <el-form-item class="input-box" prop="password">
                    <span class="input-icon icon-password"></span>
                    <input class="input-text" type="password" placeholder="请输入密码(随便填)" v-model="param.password"
                    />
                    <!--  @keyup.enter.native="submitForm()" -->
                </el-form-item>
                <button class="login-btn" type="button" @click="submitForm()">登 录</button>
            </el-form>
        </div>
        <div class="copyright">版权所有：©湖南省卫生健康委员会 所有 2020&nbsp;&nbsp;建议：使用Chrome浏览器，分辨率为1280*768以上分辨率。</div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'login',
    data: function () {
        return {
            param: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        // 跳转
        submitForm() {
            // this.$router.push('/Index');
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/Index');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.login {
    height: 100%;
    background: url(../assets/loadbg2.png) no-repeat 50% 0;
    position: relative;
}
.login-form {
    width: 1000px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
}
.form-box {
    margin-top: 360px;
    float: right;
    margin-right: 35px;
}
.input-box {
    overflow: hidden;
    display: flex;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 6px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    margin-bottom: 25px;
    .input-icon {
        display: block;
        width: 48px;
        height: 46px;
        border-right: 1px solid #ccc;
    }
    .icon-user {
        background: url(../assets/user.png) no-repeat center center/20px;
    }
    .icon-password {
        background: url(../assets/password.png) no-repeat center center/20px;
    }
    .input-text {
        width: 300px;
        height: 46px;
        border: 0;
        font-size: 18px;
        padding: 0 16px;
        outline: none;
    }
}
.login-btn {
    width: 380px;
    background: -webkit-linear-gradient(top, #00c8ff, #0098ff);
    height: 50px;
    border: 0;
    border-radius: 6px;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    cursor: pointer;
}
.login-btn:hover {
    background: -webkit-linear-gradient(bottom, #00c8ff, #0098ff);
}
.copyright {
    position: fixed;
    bottom: 35px;
    width: 100%;
    text-align: center;
    font-size: 12px;
}

</style>
