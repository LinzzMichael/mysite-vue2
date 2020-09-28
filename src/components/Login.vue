<template>
    <body id="poster">
            <el-form class="login-container" label-position="left" label-width="0px">
                <h3 class="login_title">用户登陆</h3>
                <div>
                    <div v-if="$v.loginForm.username.$dirty && !$v.loginForm.username.required">
                        <el-alert
                                title="请输入用户名"
                                type="error">
                        </el-alert>
                    </div>

                    <el-form-item >
                        <el-input type="text" v-model="loginForm.username" auto-complete="off"
                                      placeholder="账户" @input="$v.loginForm.username.$touch()">

                        </el-input>
                    </el-form-item>
                    <div v-if="$v.loginForm.password.$dirty && !$v.loginForm.password.required">
                        <el-alert
                                title="请输入密码"
                                type="error">
                        </el-alert>
                    </div>
                    <el-form-item>
                        <el-input type="password" v-model="loginForm.password"
                                  auto-complete="off" placeholder="密码" @input="$v.loginForm.password.$touch()"></el-input>
                    </el-form-item>
                    <el-form-item style="width: 100%">
                        <el-row :gutter="60">
                            <el-col :span="24"><el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button></el-col>
                            <!--                        <el-col :span="12"><el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="regisiter">注册</el-button></el-col>-->
                        </el-row>
                        <p style="font-size:14px;line-height:20px;color:#999;cursor: pointer;float:right;" @click="handleCommand()">没有账号？点此注册</p>
                    </el-form-item>
                </div>

            </el-form>
    </body>

</template>

<script>
import {required} from 'vuelidate/lib/validators'
    export default {
        name: 'Login',
        data () {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                responseResult: []
            }
        },
        validations: {
            loginForm:{
                username:{
                    required
                },
                password:{
                    required
                }
            }
        },
        methods: {
            login () {
                //进行一次校验
                this.$v.$touch()
                if (this.$v.$invalid) {
                    // this.submitStatus = 'ERROR'
                } else
                {
                    //因为this在里面的代码段指向可能会变，所以先定一个一个_this保存最初的对象
                    var _this = this
                    console.log(this.$store.state)
                    //axios用于反向代理，全部请求都会在/api下,具体地址配置见main.js
                    this.$axios
                        .post('/login', {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        })
                        .then(response => {
                            if (response.data.code === 200) {
                                // var data = this.loginForm
                                //调用store的更新函数更新session
                                _this.$store.commit('login', response.data.result)
                                //直接跳转到下一个页面
                                var path = this.$route.query.redirect
                                //如果登陆成功，且没有下一个地址，就进入主页
                                this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                            }
                            //登陆失败提示
                            if (response.data.code === 400) {
                                //elment ui弹出提示框
                                this.$message.error('账号或者密码错误');
                            }
                        })
                        .catch(failResponse => {
                        })
                }

            },
            handleCommand () {
                this.$router.push('/registe');
            }
        }
    }
</script>


<style>
    #poster {
        /*background:url("../assets/eva.jpg") no-repeat;*/
        background-image: url("../assets/eva.jpg");
        background-repeat: no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0px;
    }
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }





</style>



