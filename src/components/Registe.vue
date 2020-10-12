<template>
    <body id="poster">
    <el-form class="Registe-container" label-position="left" label-width="0px">
        <h3 class="Registe_title">用户注册</h3>
        <div v-if="$v.registeForm.username.$dirty && !$v.registeForm.username.required">
            <el-alert
                    title="请输入用户名"
                    type="error">
            </el-alert>
        </div>
        <div v-if="$v.registeForm.username.$dirty && (!$v.registeForm.username.minLength || !$v.registeForm.username.maxLength) ">
            <el-alert
                    title="用户名长度必须为3-12位"
                    type="error">
            </el-alert>
        </div>
        <el-form-item>
            <el-input type="text" v-model="registeForm.username" auto-complete="off"
                      placeholder="用户名" @blur="$v.registeForm.username.$touch()"></el-input>
        </el-form-item>
        <div v-if="$v.registeForm.password1.$dirty && (!$v.registeForm.password1.minLength || !$v.registeForm.password1.maxLength) ">
            <el-alert
                    title="密码长度必须为6-12位"
                    type="error">
            </el-alert>
        </div>
        <div v-if="$v.registeForm.password1.$dirty && (!$v.registeForm.password1.required) ">
            <el-alert
                    title="请输入密码"
                    type="error">
            </el-alert>
        </div>
        <el-form-item>
            <el-input type="password" v-model="registeForm.password1"
                      auto-complete="off" placeholder="密码" @blur="$v.registeForm.password1.$touch()"></el-input>
        </el-form-item>
        <div v-if="$v.registeForm.password2.$dirty && (!$v.registeForm.password2.sameAsPassword) ">
            <el-alert
                    title="两次输入的密码不相同"
                    type="error">
            </el-alert>
        </div>
        <el-form-item>
            <el-input type="password" v-model="registeForm.password2"
                      auto-complete="off" placeholder="密码确认" @blur="$v.registeForm.password2.$touch()"></el-input>
        </el-form-item>
        <div v-if="$v.registeForm.email.$dirty && (!$v.registeForm.email.required) ">
            <el-alert
                    title="请填写邮箱地址"
                    type="error">
            </el-alert>
        </div>
        <div v-if="$v.registeForm.email.$dirty && (!$v.registeForm.email.email) ">
            <el-alert
                    title="请输入正确邮箱地址"
                    type="error">
            </el-alert>
        </div>
        <el-form-item>
            <el-input type="email" v-model="registeForm.email"
                      auto-complete="off" placeholder="邮箱" @blur="$v.registeForm.email.$touch()"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-row :gutter="60">
                <el-col :span="12"><el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="Registe">注册</el-button></el-col>
                <el-col :span="12"><el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="Reset">重置</el-button></el-col>
            </el-row>
            <p style="font-size:14px;line-height:20px;color:#999;cursor: pointer;float:right;" @click="handleCommand()">已有账号？点此登陆</p>

        </el-form-item>

    </el-form>
    </body>
</template>

<script>
    import {required, minLength, maxLength, sameAs, email, alphaNum} from 'vuelidate/lib/validators'
    export default {
        name: "Register",
        data () {
            return {
                registeForm: {
                username: '',
                password1: '',
                password2:'',
                email:''
            },
            responseResult: []
        }
    },
    validations:{
        registeForm:{
                username:{
                    required,
                    minLength:minLength(3),
                    maxLength:maxLength(12),
                },
                password1:{
                    required,
                    alphaNum,
                    minLength:minLength(6),
                    maxLength:maxLength(12),
                },
                password2:{
                    required,
                    // minLength:minLength(3),
                    // maxLength:maxLength(12),
                    sameAsPassword: sameAs('password1')
                },
                email:{
                    required,
                    email
                }
            }
    },
    methods: {
        Registe () {
            this.$v.$touch()
            if (this.$v.$invalid) {
                // this.submitStatus = 'ERROR'
            } else
            {
                //axios用于反向代理，全部请求都会在/api下,具体地址配置见main.js
                this.$axios
                    .post('/registe', {
                        username: this.registeForm.username,
                        password: this.registeForm.password1,
                        email: this.registeForm.email
                    })
                    .then(response => {
                        if (response.data.code === 200) {
                            this.$message.error('注册成功，即将跳转到登陆页面');
                            setTimeout(() =>{
                                this.$router.push('/login')
                            },1500);
                            // // var data = this.loginForm
                            // //调用store的更新函数更新session
                            // _this.$store.commit('login', _this.loginForm)
                            // //直接跳转到下一个页面
                            // var path = this.$route.query.redirect
                            // //如果登陆成功，且没有下一个地址，就进入主页
                            // this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                        }
                        //登陆失败提示
                        if (response.data.code === 400) {
                            //elment ui弹出提示框
                            this.$message.error(response.data.message);
                        }
                    })
                    //返回错误
                    .catch(failResponse => {
                        this.$message.error('注册失败');
                    })
            }

        },
        Reset (){
            this.registeForm.email="";
            // this.responseResult.password2="";
            this.registeForm.password2="";
            this.registeForm.password1="";
            this.registeForm.username="";
        },
        handleCommand() {
            this.$router.push('login');
        },
    }
    }
</script>

<style scoped>
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
    .Registe-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .Registe_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>
