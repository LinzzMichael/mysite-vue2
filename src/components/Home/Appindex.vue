<template>
 <div>
  <el-main style="padding: 0">
   <div class="block" >
<!--       走马灯-->
    <el-carousel :height="bannerHeight + 'px'" style="margin-bottom: 100px">
     <el-carousel-item v-for="img in imgs" >
         <img
         :src="img.url"
         ref="bannerHeight"
         class="bannerImg"
         @load="imgLoad"
         />
     </el-carousel-item>
    </el-carousel>

    <el-row class="main_contain " style="padding-left: 10px; padding-right: 10px; ">
        <h2 class="textLeft">最新推荐</h2>
        <a href="#" style="float: right; margin-top: -45px;text-decoration:none;color: #f33f3f">查看所有文章></a>

        <el-divider></el-divider>
    </el-row>



    <!--       推荐栏目-->
    <el-row class="main_contain" :gutter="20">

            <el-col :span="8" :xs="24">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <img src="../../assets/imgs/timg.jpeg" class="image">
                    <div class="card_text_div">
                        <router-link :to="{path:'blog/getBlog/', query:{id:19}}">
                          <h4>致橡树</h4>
                        </router-link>
                        <h6>诗歌</h6>
                        <p class="textLeft">
                            “橡树”的形象象征着刚硬的男性之美,而有着“红硕的花朵”的木棉显然体现着具有新的审美气质的女性人格...
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
                                :value=5
                                disabled
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                    </div>
                </el-card>
            </el-col>

    </el-row>


<!--最近文章-->
     <el-row class="main_contain " style="padding-left: 10px; padding-right: 10px; ">
       <h2 class="textLeft">最近文章</h2>
       <el-divider></el-divider>
     </el-row>
     <div v-for="(blog, index) in blogList">
       <el-row class="main_contain" style="padding-left: 10px; padding-right: 10px;margin-bottom: 0;">
         <el-row >
           <el-col :span="16" class="textLeft" >
             <el-row  style="margin: 0px; height: 50px">
               <router-link :to="{path:'blog/getBlog/', query:{id: blog.id}}">
                 <el-link  :underline="false">
                   <h3 class="textLeft" style="">{{ blog.title }}</h3>
                 </el-link>
               </router-link>

             </el-row>
             <el-row style="margin: 0px">
               <p class="textLeft">{{ blog.introduction }}</p>
             </el-row>
             <el-row style="margin: 0px">
               <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="1"  class="textLeft">
                 <el-button :circle="true" size="mini"" ><li class="el-icon-star-off" ></li></el-button>
                 x {{ blog.likeCount }} · <span v-if="!isLikeList[index]">赞</span><span v-else>已赞</span>
               </el-col>

               <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="1" class="textLeft">
                 <el-button :circle="true" size="mini" class="el-icon-view" ></el-button>
                 x {{ blog.views }} · 阅读
               </el-col>
               <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="1" class="textLeft">
                 <el-button :circle="true" size="mini" class="el-icon-s-comment"></el-button>
                 x {{ blog.commentCount }} · 评论
               </el-col>
             </el-row>
           </el-col>
<!--           文章内容和图片中间的留白-->
           <el-col :span="1">
             <p></p>
           </el-col>
<!--           文章的封面图片-->
           <el-col :span="5">
             <el-image style="width: 250px; height: 150px" :src="blog.cover">
               <div slot="placeholder" class="image-slot">
                 加载中<span class="dot">...</span>
               </div>
             </el-image>
           </el-col>
<!--           每个文章的标签显示-->
           <el-col :span="2">
             <div v-for="tag in tagList[index]" style="padding: 10px 0 15px 30px" class="textLeft">
               <el-link type="primary" >
                 <span class="el-icon-collection-tag"></span>
                 {{ tag.name }}
               </el-link>
             </div>
           </el-col>
         </el-row>
         <el-divider style="margin: 5px"></el-divider>
       </el-row>

     </div>
     <div class="block">
       <!--分页部件-->
       <el-pagination
           layout="prev, pager, next"
           @current-change="handleCurrentChange"
           :total="totalBlogs"
           :current-page="this.curPage"
           :pageSize="pageSize"
       >
       </el-pagination>
     </div>







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
                <el-image fit="scale-down" :src="bookImageUrl">

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
                blogs:[],
                bookImageUrl: require("../../assets/imgs/book.jpeg"),
                currentDate: new Date(),
                blogList: [],
                tagList: [],
                isLikeList: [],
                totalBlogs: 0,
                pageSize: 3,
                curPage:1,
            }
        },
        methods:{
            // 下面的 imgLoad 是页面渲染完成的加载方法，确保屏幕中的图片的高度第一次渲染到页面。
            imgLoad () {
                this.$nextTick(() => {
                    this.bannerHeight = this.$refs.bannerHeight[0].height
                    // console.log(this.$refs)
                })
            },
            loadRecentBlog (page, size){
              page=page-1
              var username = this.$store.state.user.username
              this.$axios.get('/blog/list/'+page+'/'+size+'/'+username).then(resp => {
                if(resp && resp.data.code === 200)
                {
                  //这里很关键，因为每次点击不同的页数，需要显示不同页面的内容，如果直接用this.blogList=resp.data.result.blogList
                  //虽然会替换blogList的内容，但是却不会触发v-for重新渲染，所以要使用concat，这会触发重新渲染，但是这是拼接，需要先清空
                  this.blogList = []
                  this.blogList = this.blogList.concat(resp.data.result.blogList)
                  this.tagList = resp.data.result.tagList
                  this.totalBlogs = resp.data.result.total
                  this.isLikeList = resp.data.result.isLikeList
                  console.log(resp.data.result)
                }
              })
              console.log(this.$store.state.user)
          },
          //处理页数变化的函数，el-page会自动传当前页数进来
          handleCurrentChange(val) {
              this.curPage = val
            this.loadRecentBlog(this.curPage, this.pageSize)
          }
        },
        // 下面是增加监听事件，当视口发生变化的时候，得到此时图片的高度赋值给 bannerHeight
        mounted () {
            this.imgLoad()
            window.addEventListener('resize', () => {
                this.bannerHeight = this.$refs.bannerHeight[0].height
                this.imgLoad()
            }, false)
            this.loadRecentBlog(this.curPage, this.pageSize)

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
    .router-link-active {
      text-decoration: none;
    }
    a {
      text-decoration: none;
    }

</style>


<style>


</style>
