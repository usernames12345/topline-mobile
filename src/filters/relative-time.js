import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') //  使用中文
dayjs.extend(relativeTime) // 扩展相对时间插件
export default (value) => {
  return dayjs().from(dayjs(value))
}
