// 给DOM对象添加class
export function addClass(el, className) {
  // 如果有class不再添加
  if (hasClass(el, className)) {
    return
  }
  // 把class的空格拆分开变成数组
  let newClass = el.className.split(' ')
  newClass.push(className)
  // 数组 然后把class 用空白隔开传进去
  el.className = newClass.join(' ')
}

// 判断class
export function hasClass(el, className) {
  // classname前后有或没有空白字符都通过test
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}



// 浏览器供应商前缀
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    // 匹配就返回出去
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  // 都不支持那么是浏览器的问题
  return false
})()

// 处理DOM样式 自动匹配浏览器私有前缀
export function prefixStyle(style) {
  if (vendor === false) return false
  if (vendor === 'standard') return 'standard'
  // 私有前缀 + 样式 首字母并且使之大写 + 样式除首字母外的字符
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
