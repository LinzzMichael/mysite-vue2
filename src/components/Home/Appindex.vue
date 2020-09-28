<template>
 <div>
  <el-main style="padding: 0">
   <div class="block" >
<!--       -->
<!--       走马灯-->
<!--    <span class="demonstration">默认 Hover 指示器触发</span>-->
    <el-carousel :height="bannerHeight + 'px'" style="margin-bottom: 100px">
     <el-carousel-item v-for="img in imgs" >
<!--      <h3 class="small">{{ item }}</h3>-->
         <img
         :src="img.url"
         ref="bannerHeight"
         class="bannerImg"
         @load="imgLoad"
         />
     </el-carousel-item>
    </el-carousel>

    <el-row class="main_contain " style="padding-left: 10px; padding-right: 10px; ">
<!--        <el-col span="12" class="textLeft"><h2>最新推荐</h2></el-col>-->
<!--        <el-col class="textRight" span="12" style="height: 100%"><a href="#" >查看所有文章</a></el-col>-->
<!--        <a href="#" style="float: right;align-content: center">查看所有文章</a>-->
        <h2 class="textLeft">最新推荐</h2>
        <a href="#" style="float: right; margin-top: -45px;text-decoration:none;color: #f33f3f">查看所有文章></a>

        <el-divider></el-divider>
    </el-row>

<!--       <el-row class="main_contain "><el-divider ></el-divider></el-row>-->


    <!--       推荐栏目-->
    <el-row class="main_contain" :gutter="20">
    <!--    <el-col :span="2"><div class="grid-content"></div></el-col>-->
    <!--    <el-col :span="20">-->
            <el-col :span="8" :xs="24">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <img src="../../assets/imgs/timg.jpeg" class="image">
                    <div class="card_text_div">
                        <a href="#">
                            <h4>致橡树</h4>
                        </a>
                        <h6>诗歌</h6>
                        <p class="textLeft">
                            “橡树”的形象象征着刚硬的男性之美,而有着“红硕的花朵”的木棉显然体现着具有新的审美气质的女性人格...
                        </p>
                        <el-rate
                                value=5
                                disabled
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                    </div>
                </el-card>
            </el-col>
    <!--        <el-col :span="1"><div class="grid-content"></div></el-col>-->
            <el-col :span="8" :xs="24">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <img src="../../assets/imgs/summer.jpeg" class="image">
                    <div class="card_text_div">
                        <a href="#">
                            <h4>那个夏天</h4>
                        </a>
                        <h6>回忆</h6>
                        <p class="textLeft">
                            我知道那个夏天，就像青春一样回不来，代替梦想的，只能是勉为其难，我知道吹过的牛皮...
                        </p>
                        <el-rate
                                :value=5
                                disabled
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                    </div>
                </el-card>
            </el-col>
    <!--        <el-col :span="1"><div class="grid-content"></div></el-col>-->
            <el-col :span="8" :xs="24">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <img src="../../assets/imgs/test.png" class="image">
                    <div class="card_text_div">
                        <a href="#">
                            <h4>Normal people</h4>
                        </a>
                        <h6>影视</h6>
                        <p class="textLeft">
                            和你在一起的时候，我偶尔会沮丧，但从不孤单，他和她，相同点和不同点总是冲突式地呈现，...
                        </p>
                        <el-rate
                                value=5
                                disabled
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                    </div>
                </el-card>
            </el-col>
    <!--    </el-col>-->
    <!--    <el-col :span="2"><div class="grid-content"></div></el-col>-->
    </el-row>
    <el-row class="main_contain" style="padding-left: 10px; padding-right: 10px;margin-top: 50px">
        <h2 class="textLeft">关于我们</h2>
        <el-divider></el-divider>
<!--        <a href="#" style="float: right; margin-top: -45x;text-decoration:none;color: #f33f3f">查看所有文章></a>-->
    </el-row>
    <el-row class="main_contain" :gutter="20">
           <el-col :span="12">
               <div class="textLeft">
                    <div><h2>Ineffable</h2></div>
                   <div>
                       Ineffable意思是不可言喻的、妙不可言的,第一眼见到这个词语的时候，我就忍不住注册了它，我倾向于理解它为"妙不可言的"，
                       因为我希望，这个世界，总会有那么一点东西，有那么一个人，会让你感觉妙不可言。
                   </div>
                   <div  style="padding-top: 20px">
                       <li style="padding-top:4px">分享一些有意思的风景</li>
                       <li style="padding-top:4px">记录一些值得记住的事情</li>
                       <li style="padding-top:4px">做一些有意思的小功能</li>
                       <li style="padding-top:4px">其实就是想到啥做啥</li>
                       <el-button style="margin-top:15px" type="danger">更多关于我们</el-button>
                   </div>
               </div>
           </el-col>
           <el-col :span="12">
                <el-image :fit="scale-down" :src="bookImageUrl">

                </el-image>
           </el-col>
    </el-row>

   </div>
      <el-row class="main_contain" style="padding-left: 10px; padding-right: 10px;margin-top: 50px">
          <el-divider></el-divider>
          <!--        <a href="#" style="float: right; margin-top: -45x;text-decoration:none;color: #f33f3f">查看所有文章></a>-->
      </el-row>
  </el-main>

  <el-footer>COPYRIGHT © 2020 Ineffable world CO., LTD. - DESIGN: Lin</el-footer>
 </div>

<!-- <el-footer>-->
<!--  Footer-->
<!-- </el-footer>-->
</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';
    export default {
        name: "AppIndex",
        data() {
            return {
                bannerHeight:"",
                imgs: [
                    {url: require("../../assets/imgs/test2.jpg"),link:'#'},
                    {url: require("../../assets/imgs/test2.jpg"),link:'#'}
                ],
                bookImageUrl: require("../../assets/imgs/book.jpeg"),
                currentDate: new Date()
            }
        },
        methods:{
            // 下面的 imgLoad 是页面渲染完成的加载方法，确保屏幕中的图片的高度第一次渲染到页面。
            imgLoad () {
                this.$nextTick(() => {
                    this.bannerHeight = this.$refs.bannerHeight[0].height
                    console.log(this.$refs)
                })
            }
        },
        // 下面是增加监听事件，当视口发生变化的时候，得到此时图片的高度赋值给 bannerHeight
        mounted () {
            this.imgLoad()
            window.addEventListener('resize', () => {
                this.bannerHeight = this.$refs.bannerHeight[0].height
                this.imgLoad()
            }, false)
        }
    }
</script>

<style scoped>

    .el-row {
        margin-bottom: 20px;
        margin-top:20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    img{
        /*!*设置图片宽度和浏览器宽度一致*!*/
        width: 100%;
        /*height: 100%;*/
    }
    .main_contain {
        margin-left: 80px!important;;
        margin-right: 80px!important;;

    }
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .textLeft{
        text-align: left;
    }
    .textRight{
        text-align: right;
    }
    .card_text_div{
        padding: 20px;
        position: relative;
    }
    .card_text_div h4{
        text-align: left;
        margin-bottom: 20px;
        color: #1a6692;;
        /*font-size: 17px;*/
        height: 20px;
    }
    .card_text_div a{
        text-decoration: none;
    }
    .card_text_div h6{
        position: absolute;
        top: 40px;
        right: 20px;
        margin: 0;
        font-size: 16px;
        color: #121212;
    }

</style>


<style>


</style>