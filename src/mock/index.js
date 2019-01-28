// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据

const doByTimes = (callback,times=10) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

Mock.mock('/mainnav', 'post', ()=>{
	return [
      {
      icon: "md-aperture",
      index: "dashboard",
      title: "系统首页"
      },
      {
      icon: "ios-grid",
      index: "tableList",
      title: "表格",
        subs: [
              {
              icon: "ios-list-box",
              index: "table",
              title: "基础表格"
              },
              {
              icon: "ios-list-box",
              index: "manyTable",
              title: "其他表格"
              },
          ]
      },
      {
      icon: "ios-cube",
      index: "formList",
      title: "表单相关",
      subs: [
              {
              icon: "ios-list-box",
              index: "form",
              title: "基本表单"
              },
              {
              icon: "ios-list-box",
              index: "manyForm",
              title: "其他表单"
              },
          ]
      },
      {
      icon: "ios-create",
      index: "editor",
      title: "文本编辑器"
      },
      {
      icon: "ios-warning",
      index: "permission",
      title: "权限测试"
      },
      // {
      // icon: "ios-close-circle",
      // index: "404",
      // title: "404页面"
      // }
  ];
});

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/tableData', 'post', (opt)=>{
  let list = [];
  let total = 32;
  let params = JSON.parse(opt.body).params;
  let pageSize = params.pageSize || 10;
  let page = params.page || 1;
  doByTimes(() => {
    list.push(Mock.mock({
      address: Random.county(true),
      name: Random.cname(),
      date: Random.date()
    }))
  },total<pageSize*page?total-pageSize*(page-1):pageSize);
	return {list:list,total:total};
});

Mock.mock('/true', 'post', ()=>{
	return {"success":true,"msg":"向服务器提交信息成功！","data":{},"userNo":"xiaoke","createDate":"2018-01-20 00:00:00"}
});


// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', ()=>{
  let data = [];
  doByTimes(() => {
    data.push(Mock.mock({
		title: Random.csentence(5, 10),
		author_name: Random.cname(),
		date: Random.date() + ' ' + Random.time()
    }))
  })
	return data
});

Mock.mock('/pro/index', 'post', ()=>{
  let data = [];
  doByTimes(() => {
    data.push(Mock.mock({
		title: Random.csentence(5, 10), //  Random.csentence( min, max )
		thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
		author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
		date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }))
  },15)
	return data
});