import Mock from 'mockjs'

// 生成活动名单数据列表
var activityList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  activityList.push(Mock.mock({
    'userId': '001',//参加活动者id
    'userName': '@name',//参加活动者名字
    'activityId': '@increment(1)',//活动id
    'activityName': '@name',//活动名称
    'joinTime': '@now(yyyy-MM-dd HH:mm:ss)'//参加活动时间
  }))
}
//获取活动名单列表
export function list () {
  return {
    // isOpen: false,
    url: '/extra/download/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': activityList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': activityList
      }
    }
  }
}
