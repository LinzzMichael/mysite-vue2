<template>
<!--    <el-container>-->
<!--        <el-header>-->
            <el-menu
                    :default-active="'/index'"
                    router
                    mode="horizontal"
                    background-color="#232323"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    style="border-bottom: none"
            >
                <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                    {{ item.navItem }}
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">博客</template>
                    <el-menu-item index="/editor">写博客</el-menu-item>
                    <el-menu-item index="#">博客中心</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">相册</template>
                    <el-menu-item index="#">相册中心</el-menu-item>
                    <el-menu-item index="#">创建相册</el-menu-item>
                </el-submenu>

                <el-menu-item  style="float:right;" v-if="!isLogin()">
                    <a href="#"  class="el-icon-s-custom" title="登录"></a>
                    <a href="/login" >登录/注册</a>

                </el-menu-item>

<!--                <el-submenu index="2"  style="float:right;">-->
<!--                    <template slot="title">我的工作台</template>-->
<!--                    <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--                    <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--                    <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--                    <el-submenu index="2-4">-->
<!--                        <template slot="title">选项4</template>-->
<!--                        <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--                        <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--                        <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--                    </el-submenu>-->
<!--                </el-submenu>-->

                <el-submenu style="float:right;" v-if="isLogin()">

                    <template slot="title">{{ username }}</template>
                    <el-menu-item class="userSubMenu">个人中心</el-menu-item>
                    <el-menu-item class="userSubMenu" v-on:click="loginOut">注销</el-menu-item>
<!--                    <el-menu-item index="2-3">选项3</el-menu-item>-->
                </el-submenu>

<!--                <i class="el-icon-s-custom" style="float:right;"></i>-->
<!--                <el-button type="primary" style="float:right;" plain>-->
<!--                    登录-->
<!--                </el-button>-->
<!--                <a href="/login" style="color: #222;float: right;padding: 5px;">登录</a>-->
<!--                <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>-->
<!--                <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">Ineffable World</span>-->
            </el-menu>
<!--        </el-header>-->
<!--    </el-container>-->
<!--    <el-menu-->
<!--        :default-active="'/index'"-->
<!--        router-->
<!--        mode="horizontal"-->
<!--        background-color="white"-->
<!--        text-color="#222"-->
<!--        active-text-color="red"-->
<!--        style="min-width: 1300px">-->
<!--        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">-->
<!--            {{ item.navItem }}-->
<!--        </el-menu-item>-->
<!--        <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a>-->
<!--        <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>-->
<!--        <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">Ineffable World</span>-->
<!--    </el-menu>-->
</template>

<script>
    import store from "@/store";

    export default {
        name: "NavMenu",
        data() {
            return {
                navList: [
                    {name: '/index', navItem: '首页'},
                    // {name: '/blog', navItem: '博客'},
                    // {name: '/library', navItem: '相册'},
                    // {name: '/admin', navItem: '个人中心'}
                ],
                username: store.state.user.username,
            }
        },
        methods: {
            isLogin() {
                if (store.state.user.username)
                {
                    return true;
                }
                else{
                    return false;
                }
            },
            //注销函数，调用store更新
            loginOut(){
                var _this = this;
                _this.$store.commit("logout");
                _this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }

    span {
        pointer-events: none;
    }
</style>


<style>
.userSubMenu{
    text-align: center;
    width: 100%;
}
</style>