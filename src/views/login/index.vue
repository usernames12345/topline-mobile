<template>
   <div class= 'login-wrap'>
    <van-nav-bar title="登录"/>
   <form>
      <van-cell-group>
      <van-field
        v-model="user.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
      />

      <van-field
        v-model="user.code"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
       />
     </van-cell-group>
    <div class ='login-btn-box'>
        <van-button
        type="info"
        :loading = 'loginLoading'
        loading-text= '登陆中...'
        class= 'login-btn'
        @click.prevent = 'handleLogin'
        >登录</van-button>
    </div>
    </form>
   </div>
</template>

<script>
//  引入封装好的接口
import { login } from '@/api/user'
export default {
  name:"LoginIndex",
  data() {
    return {
        user: {
            mobile: '13512091051',
            code: '123456'
        },
        loginLoading:false
    }
  },
  methods: {
      async handleLogin () {
        try {
            //  表单验证通过 发送请求 loading 加载
            this.loginLoading = true
            const data = await login(this.user)
            // console.log(data)
            this.$store.commit('setUser',data)
            // 先跳转到首页
            //真实的业务处理跳转到之前过来的页面
            this.$router.push({
                name: 'home'
            })
        }
        catch (err) {
          console.log(err)
          console.log('登录失败')
        }
        this.loginLoading = false
      } 
  }
}
</script>

<style lang="less" scoped>
  .login-btn-box {
      padding:20px;
  .login-btn {
   width:100%;
   }
  }
 
</style>
