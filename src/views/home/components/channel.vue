<template>
<!--
    v-model 是
    v-bind:value="数据"
    v-on:input="数据=$event"
    lazy-render  关闭懒加载
 -->
  <van-popup
    :style="{ height: '95%' }"
    :value ='value'
    @input="$emit('input',$event)"
    position="bottom"
    get-container="body"
    :lazy-render="false"
  >
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
            @click="isEdit = !isEdit"
          >{{ isEdit ? '完成':'编辑' }}</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="(item,index) in userChannels"
          :key="item.id"
          text="文字"
          @click="handleUserChannelClick(item,index)"
         >
          <span class="text"
           :class="{ active:index === activeIndex && !isEdit }"
          >{{ item.name }}</span>
          <van-icon class="close-icon" name="close" v-show="isEdit" />
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          @click="handleAddChannel(item)"
          >
          <div class="info">
            <span class="text">{{ item.name }}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels, deleteUserChannel, updateUserChannel } from '@/api/channel'
export default {
  name: 'HomeChannel',
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userChannels: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    recommendChannels () {
      // 拿到所有重复的数据id
      const duplicates = this.userChannels.map(item => item.id)
      //  过滤返回不重复的数据
      return this.allChannels.filter(item => !duplicates.includes(item.id))
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const data = await getAllChannels()
        // 将获取到的频道数据统一处理成我们想要额数据格式
        data.channels.forEach(item => {
          item.articles = [] // 频道文章
          item.timestamp = Date.now() // 用于下一页频道数据的时间戳
          item.finished = false // 控制频道的上拉加载是否已经完毕
          item.uploading = false// 控制该频道的下拉刷新loading
          item.pullRefreshLoading = false // 控制频道列表的下拉刷新状态
          item.SuccessText = '' // 控制频道列表下拉刷新成功的提示文字
        })
        this.allChannels = data.channels
      } catch (err) {
        console.log(err)
      }
    },
    async handleUserChannelClick (item, index) {
      // 如果是非编辑状态 则是切换tab显示
      if (!this.isEdit) {
        this.$emit('update:active-index', index)
        this.$emit('input', false)
        return
      }
      // 如果是编辑状态 则是删除操作
      const channels = this.userChannels.slice(0)
      // 从第几个开始删除  删除几个
      channels.splice(index, 1)
      this.$emit('update:user-channels', channels)
      // 获取用户数据
      const { user } = this.$store.state
      // 如果用户登录 则请求删除
      if (user) {
        await deleteUserChannel(item.id)
        return
      }
      // 如果用户没有登陆 则将数据保存到本地存储
      window.localStorage.setItem('channels', JSON.stringify(channels))
    },
    async handleAddChannel (item) {
      // 截取一个数组操作这个数组操作结束将结果传递给父元素
      // 始终机组一个原则 props数据是单向的 不要在子组件中修改数据 始终由父组件去修改从而影响他
      const channels = this.userChannels.slice(0) // 存放添加数据的数组
      channels.push(item)//  追加到数组后面
      this.$emit('update:user-channels', channels) // 更新频道数据给父元素
      const { user } = this.$store.state
      // 如果用户已经登陆了 则请求添加用户频道
      if (user) {
        // 发送更新数据请求传入参数 id 和序号
        await updateUserChannel([{
          id: item.id,
          seq: channels.length - 1 // 序号
        }])
      } else {
        // 如果没有登录 则添加到本地存储
        // 没有就创建 有的就直接覆盖
        // 注意 本地存储数据无法像js数据变量去修改 要想改变只能重写
        window.localStorage.setItem('channels', JSON.stringify(channels))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
    .action {}
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
