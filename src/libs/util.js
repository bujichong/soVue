export const store = localStorage;

export const indexTag = {
    name:"dashboard",
    path:"/dashboard",
    title:"系统首页"
};//首页标签，不关闭
/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagInLocal = list => {
    store.tagNaveList = JSON.stringify(list)
  }
  /**
   * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
   */
  export const getTagFromLocal = () => {
    const list = store.tagNaveList
    return list ? JSON.parse(list) : [indexTag]
  }