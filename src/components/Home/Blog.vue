<template>
  <div>
    <el-main style="padding-top: 70px" >
<!--      <el-card style="width: 90%;margin: 35px auto 0 auto">-->
<!--        <el-col :span="2">-->

<!--        </el-col>-->
      <el-row type="flex" justify="center">
        <el-col :span="20" >
          <span style="font-size: 40px"><strong>{{blog.title}}</strong></span>
          <div class="mavonEditor">
            <mavon-editor v-html="blog.html" :boxShadow="false" style="border: none"/>
          </div>
        </el-col>
      </el-row>
      <el-row class="main_contain" style="padding-left: 10px; padding-right: 10px;margin-top: 50px">
        <el-divider></el-divider>
      </el-row>

    </el-main>
    <el-footer>COPYRIGHT © 2020 Ineffable world CO., LTD. - DESIGN: Lin</el-footer>
  </div>


</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: "Blog",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    mavonEditor,
  },
  mounted() {
    this.loadBlog()
  },
  data() {
    return{
      blog: [],
    }
  },
  methods:{
    loadBlog() {
      var _this = this
      this.$axios.get('/blog/getBlog/' + this.$route.query.id).then(resp =>
      {
        console.log(resp)
        if(resp && resp.data.code === 200) {
          _this.blog = resp.data.result
        }
      })
    }
  }
}
</script>

<style scoped>
  /*@import "../../styles/markdown.css";*/
</style>
