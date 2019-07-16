<template>
  <div id="app">
    <!-- 路由组件是动态的  默认情况下切换会销毁重建 状态丢失
    如果想要切换的时候保留状态 说白了不要销毁 则使用keep-alive缓存就可以了
     -->
    <keep-alive>
      <router-view/>  
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped></style>
