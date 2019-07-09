<template>
   <div>
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
    <div class = 'login-btn-box'>
        <van-button
        type="info"
        class= 'login-btn'
        @click.prevent = 'handleLogin'
        >登录</van-button>
    </div>
    </form>
</div>
</template>

<script>
//  引入封装好的接口
export default {
  name:"LoginIndex",
  components: {},
  data() {
    return {
        user: {
            mobile: '',
            code: ''
        }
    }
  },
  methods: {
    //   async handleLogin () {
    //     try {
    //         const data = await login(this.user)
    //         this.$store.commit('setUser',data)
    //     }
    //   }
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
