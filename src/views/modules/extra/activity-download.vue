<template>
  <el-dialog
    title="活动名单导出"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="getDataList()" label-width="120px">

    </el-form>

    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      height="460"
      style="width: 100%;">
      <el-table-column
        prop="userId"
        header-align="center"
        align="center"
        width="80"
        label="参加活动者id">
      </el-table-column>
      <el-table-column
        prop="userName"
        header-align="center"
        align="center"
        width="80"
        label="参加活动者名字">
      </el-table-column>
      <el-table-column
        prop="activityId"
        header-align="center"
        align="center"
        label="活动id">
      </el-table-column>
      <el-table-column
        prop="activityName"
        header-align="center"
        align="center"
        label="活动名称">
      </el-table-column>
      <el-table-column
        prop="joinTime"
        header-align="center"
        align="center"
        label="参加时间">
      </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {

        },
        dataList: [],
        dataListLoading: false,

      }
    },
    methods: {
      init () {
        this.visible = true
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/extra/download/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'jobId': this.dataForm.id
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

    }
  }
</script>
