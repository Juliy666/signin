import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'userId': '@name',//活动发起人id
    'activityId': '@increment(1)',//活动id
    'activityName': '@name',//活动名称
    'activityCaption': '@name',//活动发起人名字
    'activityDetail': '@cparagraph(3)',//活动内容
    'activityPerson': '@range(1, 10, 2)',//活动参加人数
    'startTime': '@DATETIME("yyyy-MM-dd HH:mm:ss")',//活动开始时间
    'endTime': '@now(yyyy-MM-dd HH:mm:ss)',//活动结束时间
    'ifPhoto': '1',//拍照打卡
    'ifLocation': '1',//定位打卡打卡
    'ifFace': '1',//人脸识别打卡
    'userId': '001',//参加活动者id
    'userName': '@name',//参加活动者名字
    'joinTime': '@now(yyyy-MM-dd HH:mm:ss)'//参加活动时间
  }))
}

// 获取活动列表
export function list () {
  return {
    // isOpen: false,
    url: '/extra/activity/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}

// 获取活动信息
export function info () {
  return {
    // isOpen: false,
    url: '/extra/activity/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'user': dataList[0]
    }
  }
}

// 修改密码
export function updatePassword () {
  return {
    // isOpen: false,
    url: '/extra/activity/password',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 添加活动
export function add () {
  return {
    // isOpen: false,
    url: '/extra/activity/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改活动
export function update () {
  return {
    // isOpen: false,
    url: '/extra/activity/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除活动
export function del () {
  return {
    // isOpen: false,
    url: '/extra/activity/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }

}
