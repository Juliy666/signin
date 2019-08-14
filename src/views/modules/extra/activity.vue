<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询活动</el-button>
      <el-button  type="primary" @click="addOrUpdateHandle()">新增活动</el-button><!-- v-if="isAuth('extra:activity:save')" -->
      <el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button><!-- v-if="isAuth('extra:activity:delete')" -->
      <el-button  type="primary" @click="exportHandle()">活动名单导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="userId"
        header-align="center"
        align="center"
        label="活动发起人id">
      </el-table-column>
     <el-table-column
        prop="activityId"
        header-align="center"
        align="center"
        width="50"
        label="活动id">
      </el-table-column>
      <el-table-column
        prop="activityName"
        header-align="center"
        align="center"
        label="活动名称">
      </el-table-column>
<!--      <el-table-column
        prop="activityCaption"
        header-align="center"
        align="center"
        label="活动发起人名字">
      </el-table-column> -->
      <el-table-column
        prop="activityDetail"
        header-align="center"
        align="left"
        width="400"
        show-overflow-tooltip="true"
        label="活动内容">
      </el-table-column>
      <el-table-column
        prop="activityPerson"
        header-align="center"
        align="center"
        width="60"
        label="活动参加人数">
      </el-table-column>
      <el-table-column
        prop="startTime"
        header-align="center"
        align="center"
        label="活动开始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        header-align="center"
        align="center"
        label="活动截止时间">
      </el-table-column>
      <el-table-column
        prop="ifPhoto"
        header-align="center"
        align="center"
        width="50"
        label="拍照打卡">
      </el-table-column>
      <el-table-column
        prop="ifLocation"
        header-align="center"
        align="center"
        width="50"
        label="定位打卡">
      </el-table-column>
      <el-table-column
        prop="ifFace"
        header-align="center"
        align="center"
        width="50"
        label="人脸识别打卡">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.activityId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.activityId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <!-- 弹窗, 下载活动数据 -->
    <download v-if="downloadVisible" ref="exportHandle"></download>
  </div>
</template>

<script>
  import AddOrUpdate from './activity-add-or-update'
  import Download from './activity-download'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/extra/activity/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.activityId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/extra/activity/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      //显示活动名单
      exportHandle(){
        console.log("111");
      }

    }
  }
</script>
