/**
 * 注意当前文件是node.js执行的 只能写node.js代码
 * post-css是一个后处理器
 * 说白了就是预处理器less sass处理之后的css再进一步处理
 * 该文件是post-css的配置文件
 * 它有很多插件
 * autoprefixer 用来处理样式兼容前缀用的 不用谢兼容前缀
 * postcss-pxtorem用来将px转成rem用的
 * const { sep } = require('path')
 *
 */

const { sep } = require('path')

module.exports = ({ file }) => {
  let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
    ? 37.5
    : 75

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
