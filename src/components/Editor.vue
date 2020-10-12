<template>
    <div style="min-width: 600px">
        <el-main>
<!--            编辑器导航栏目-->
            <el-row :gutter="5" >
                <el-col :lg="2" :sm="4" :xs="5" style="margin-top:10px; text-align: left">
                    <a href="/index" style="text-decoration: none">
                        &lt; 返回博客页
                    </a>
                </el-col>
<!--                标题框-->
                <el-col :lg="17" :sm="13" :xs="8">
                    <el-input
                            placeholder="在此输入你的标题"
                            v-model="blog.title"
                    ></el-input>
                </el-col>
<!--                保存按钮-->
                <el-col :lg="2" :sm="3" :xs="4">
                    <el-button v-on:click="submit">保存草稿</el-button>
                </el-col>
<!--                发布按钮-->
                <el-col :lg="2" :sm="3" :xs="4">
                    <el-button type="danger" @click="postBlog">发布文章</el-button>
                </el-col>
<!--                用户图标-->
                <el-col :lg="1" :sm="1" :xs="2">
                    <a href="#">
                        <el-avatar  style="margin-top:2px" size="medium" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </a>
                </el-col>
            </el-row>
<!--            分割线-->
            <el-row>
                <el-divider></el-divider>
            </el-row>
<!--            编辑器-->
            <el-row>
                <mavon-editor v-model="blog.content" ref="md" @change="change" @imgAdd="$imgAdd" style="min-height: 1000px; height:100%">

                </mavon-editor>
            </el-row>
<!--            弹出确认框-->
            <el-dialog
                title="发布文章"
                :visible.sync="centerDialogVisible"
                width="600px"
                center>
                <div>
                    <el-row type="flex" align="middle" class="form-entry">
                        <el-col :span="4" >
                            文章标签:
                        </el-col>
                        <el-col :span="20">
                            <el-input
                                    class="input-new-tag"
                                    v-if="tagInputVisible"
                                    v-model="tagInputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleTagInputConfirm"
                                    @blur="handleTagInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ 新增标签</el-button>
                        </el-col>
                    </el-row>
                    <el-row type="flex" align="middle" class="form-entry">
                        <el-col :span="4" class="grid-content">

                        </el-col>
                        <el-col :span="20">
                            <el-card class="columnCard" shadow="never" >
                                <el-checkbox-group v-model="tagCheckList" :max="3">
                                    <span v-for="tag in dynamicTags" :key="tag" class="tagSpan">
                                        <el-checkbox :label="tag"></el-checkbox>
                                    </span>

                                </el-checkbox-group>

                            </el-card>
                        </el-col>
                    </el-row>


<!--                    栏目-->
                  <el-row type="flex" align="middle" class="form-entry">
                    <el-col :span="4" >
                      文章栏目：
                    </el-col>
                    <el-col :span="20">
                      <el-select style="margin: 0 10px;"
                          v-model="blogColunm"
                          filterable
                          allow-create
                          default-first-option
                          placeholder="请选择文章栏目"
                          size="medium">
                        <el-option
                            v-for="item in options"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                      </el-select>
                    </el-col>
                  </el-row>

                  <el-row type="flex" align="middle" class="form-entry">
                    <el-col :span="4" class="grid-content">
                      文章简介:
                    </el-col>
                    <el-col :span="20">
                      <div style=" margin: 0 10px; border-style: solid;border-width: thin;">
                        <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="blog.introduction"
                            maxlength="200"
                            minLength="100"
                            show-word-limit
                            rows="4"
                        ></el-input>
                      </div>
                    </el-col>
                  </el-row>



                  <!--                发布形式-->
                  <el-row type="flex" align="middle" class="form-entry">
                    <el-col :span="4">
                      封面：
                    </el-col>
                    <el-col :span="20">
                      <el-row style="margin: 0 10px">
                        <el-col :span="21">
                          <el-input placeholder="请选择封面图片" v-model="coverName" ></el-input>
                        </el-col>
                        <el-col :span="1">
                          <el-upload
                                     action="api/blog/uploadImg"
                                     enctype="Content-Type': 'multipart/form-data"
                                     :on-progress="uploadVideoProcess"
                                     :on-change="uploadChang"
                                     :on-success="uploadSuccess"
                                     :limit="1"
                                     :show-file-list="false"
                                     :file-list="uploadCover">
                            <el-button  icon="el-icon-folder" style="width: 100%"></el-button>
                          </el-upload>
                        </el-col>
                        <!-- 进度条 -->
                        <el-progress v-if="progressFlag" :percentage="loadProgress"></el-progress>
                      </el-row>

                    </el-col>
                  </el-row>


                    <!--                发布形式-->
                    <el-row type="flex" align="middle" class="form-entry">
                        <el-col :span="4">
                            发布形式：
                        </el-col>
                        <el-col :span="20">
                            <el-radio-group v-model="permission" class="radio-margin">
                                <el-radio :label="3">公开</el-radio>
                                <el-radio :label="6">私密</el-radio>
                                <el-radio :label="9">粉丝可见</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-row type="flex">
                    <el-col :span="16" class="grid-content">

                    </el-col>
                    <el-col :span="4">
                        <el-button @click="centerDialogVisible = false" >取 消</el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="submit"  type="danger">发 布</el-button>
                    </el-col>
                </el-row>
                </span>
            </el-dialog>
        </el-main>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: "Editor",
        components: {
            mavonEditor,
        },
        data() {
            return {
                content:'',
                html:'',
                configs: {},
                title:'',
                centerDialogVisible: false,
                dynamicTags: [],
                dynamicColumns: [],
                tagInputVisible: false,
                columnInputVisible: false,
                tagInputValue: '',
                columnInputValue: '',
                tagCheckList: [],  //已经选中的标签
                columnCheckList: [],
                columnList: [], //显示的标签
                permission: 3,
                options: ['html', 'C++', 'python'],
                uploadCover: [],
                coverName: '',
                blogColunm: '',
                blog: {
                  title: '',
                  html: '',
                  content: '',
                  introduction: '',
                  cover: '',
                  user: this.$store.state.user,
                },
              loadProgress: 0, // 动态显示进度条
              progressFlag: false, // 关闭进度条

            }
        },
      mounted() {
          this.loadTags()
      },
      methods: {
            uploadVideoProcess(event, file, fileList) {
              this.progressFlag = true; // 显示进度条
              this.loadProgress = parseInt(event.percent); // 动态获取文件上传进度
              if (this.loadProgress >= 100) {
                this.loadProgress = 100
                setTimeout( () => {this.progressFlag = false}, 1000) // 一秒后关闭进度条
              }
            },
            uploadChang(file, filelist) {
              // console.log(file)
              // console.log(filelist)
              // this.blog.cover = file.name
              this.coverName = file.name
            },
            uploadSuccess(resp, file, fileList)
            {
              console.log(resp)
              this.blog.cover = resp.result.url

            },
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                let formdata = new FormData();
                formdata.append('file', $file);
                this.$axios({
                    url: 'blog/uploadImg',
                    method: 'post',
                    data:formdata,
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    },
                }).then((resp) => {
                    if(resp.data.code === 200)  //成功上传
                    {
                        // console.log(resp.data)
                        this.$refs.md.$img2Url(pos, resp.data.result.url);
                    }
                    else{
                        this.$message.error('图片上传失败，请重试！');
                    }

                })
            },
          //发布文章
          postBlog()
          {
            if (this.blog.title=="")
            {
              this.$message.warning("请输入标题！");
            }
            else{
              this.centerDialogVisible=true;
            }
          },
            // 编辑器变动所有操作都会被解析重新渲染
            change(value, render){
                // render 为 markdown 解析后的结果[html]
                this.html = render;
            },
            // 提交编写的博客
            submit(){
                var data={"blog": this.blog, "tagList": this.tagCheckList};
                this.$axios({
                  method:"post",
                  url:"/blog/post",
                  data:JSON.stringify(data),
                  headers:{
                    'Content-type': 'application/json'
                  },
                })
                console.log(this.content);
                console.log(this.html);
                // this.$message.success('提交成功，已打印至控制台！');
                this.centerDialogVisible=false;
            },
            //删除选中的标签
            handleTagClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            //删除选中的栏目
            handleColumnClose(tag) {
                this.dynamicColumns.splice(this.dynamicColumns.indexOf(tag), 1);
            },
            //显示输入框
            showTagInput() {
                this.tagInputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            //显示输入框
            showColumnInput() {
                this.columnInputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveColumnInput.$refs.input.focus();
                });
            },
            //输入完成，就添加一个标签
            handleTagInputConfirm() {
                let inputValue = this.tagInputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.tagInputVisible = false;
                this.tagInputValue = '';
            },
            //输入完成，就添加一个标签
            handleColumnInputConfirm() {
                let inputValue = this.columnInputValue;
                if (inputValue) {
                    this.dynamicColumns.push(inputValue);
                }
                this.columnInputVisible = false;
                this.columnInputValue = '';
            },
          //从后台获取存在的标签
            loadTags() {
              // var _this = this
              this.$axios.get('/tags').then(resp => {
                if(resp && resp.data.code === 200)
                {
                    var data = resp.data.result;
                    for(var i=0; i<data.length; i++)
                    {
                      this.dynamicTags[i] = data[i].name
                    }
                    // console.log(data);
                }
              })
            }
        },
    }
</script>

<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .radio-margin{
        margin-left:10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .form-entry{
        margin: 10px 0;
    }
    .columnCard{
        margin: 0 10px;
        border: #747373;
        border-style: solid;
        border-width: thin;
        padding: 5px;
        height: 100px;
    }
    .tagSpan{
        margin-right: 20px;
    }

</style>
