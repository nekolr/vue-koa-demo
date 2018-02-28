<template>
  <el-row class="content">
    <el-col><img src="../assets/logo.png"></el-col>
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       <router-link :to='{name: "Login"}'>登录去</router-link>
      </span>
      <el-row>
        <el-input
          v-model="account"
          placeholder="账号"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
          @keyup.enter.native="registerToDo">
        </el-input>
        <el-button type="primary" @click="registerToDo">注册</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    registerToDo () {
      let obj = {
        name: this.account,
        password: this.password
      }
      const result = this.$http.post('/auth/user', obj) // 将信息发送给后端
      result.then((res) => {
        if (res.data.success) { // 如果成功
          this.$message({ // 注册成功，显示提示语
            type: 'success',
            message: '注册成功！'
          })
          this.$router.push('/') // 进入登录页面
        } else {
          this.$message.error(res.data.info) // 登录失败，显示提示语
        }
      }, (err) => {
        console.log(err)
        this.$message.error('请求错误！')
      })
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
</style>

<style scoped>
.title a {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  display: block;
  height: 40px;
  font-size: 15px;
  color: #409eff;
  line-height: 40px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
}
</style>
