<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
<!--   <el-form-item label="活动发起人id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="活动发起人id"></el-input>
    </el-form-item> -->
    <el-form-item label="活动名称" prop="activityName">
      <el-input v-model="dataForm.activityName" placeholder="活动名称"></el-input>
    </el-form-item>
    <el-form-item label="活动发起人名字" prop="activityCaption">
      <el-input v-model="dataForm.activityCaption" placeholder="活动发起人名字"></el-input>
    </el-form-item>
    <el-form-item label="活动内容" prop="activityDetail">
      <el-input v-model="dataForm.activityDetail" type="textarea" rows="3" placeholder="活动内容"></el-input>
    </el-form-item>
    <el-form-item label="活动参加人数" prop="activityPerson">
      <el-input v-model="dataForm.activityPerson" placeholder="活动参加人数"></el-input>
    </el-form-item>
<!--    <el-form-item label="活动开始时间" prop="startTime">
      <el-input v-model="dataForm.startTime" placeholder="活动开始时间"></el-input>
    </el-form-item> -->
    <el-form-item label="活动开始时间" prop="startTime">
      <el-date-picker
             v-model="dataForm.startTime"
             type="date"
             placeholder="活动开始日期"
             >
      </el-date-picker>
      <!-- :picker-options="pickerOptions0"-->
    </el-form-item>

    <el-form-item label="活动结束时间" prop="endTime">
      <el-date-picker
             v-model="dataForm.endTime"
             type="date"
             placeholder="活动结束日期"
             >
             <!-- :picker-options="pickerOptions1" -->
      </el-date-picker>

    </el-form-item>

<!--    <el-form-item label="活动截止时间" prop="endTime">
      <el-input v-model="dataForm.endTime" placeholder="活动截止时间"></el-input>
    </el-form-item> -->



    <el-form-item label="选择打卡方式(可多选)" >
      <el-checkbox label="拍照打卡" prop="ifPhoto" v-model="dataForm.ifPhoto"></el-checkbox>
      <el-checkbox label="定位打卡" prop="ifLocation" v-model="dataForm.ifLocation"></el-checkbox>
      <el-checkbox label="人脸识别打卡" prop="ifFace" v-model="dataForm.ifFace"></el-checkbox>
    </el-form-item>

<!--   <el-form-item label="拍照打卡" prop="ifPhoto">
      <el-input v-model="dataForm.ifPhoto" placeholder="拍照打卡"></el-input>
    </el-form-item>
    <el-form-item label="定位打卡" prop="ifLocation">
      <el-input v-model="dataForm.ifLocation" placeholder="定位打卡"></el-input>
    </el-form-item>
    <el-form-item label="人脸识别打卡" prop="ifFace">
      <el-input v-model="dataForm.ifFace" placeholder="人脸识别打卡"></el-input>
    </el-form-item> -->
    </el-form>
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
          userId: '',
          activityId: 0,
          activityName: '',
          activityCaption: '',
          activityDetail: '',
          activityPerson: '',
          startTime: '',
          endTime: '',
          ifPhoto: '',
          ifLocation: '',
          ifFace: '',
        },
        dataRule: {
          userId: [
            { required: true, message: '活动发起人id不能为空', trigger: 'blur' }
          ],
          activityName: [
            { required: true, message: '活动名称不能为空', trigger: 'blur' }
          ],
          activityCaption: [
            { required: true, message: '活动发起人名字不能为空', trigger: 'blur' }
          ],
          activityDetail: [
            { required: true, message: '活动内容不能为空', trigger: 'blur' }
          ],
          activityPerson: [
            { required: true, message: '活动参加人数不能为空', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '活动开始时间不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '活动截止时间不能为空', trigger: 'blur' }
          ],
          ifPhoto: [
            { required: true, message: '拍照打卡不能为空', trigger: 'blur' }
          ],
          ifLocation: [
            { required: true, message: '定位打卡不能为空', trigger: 'blur' }
          ],
          ifFace: [
            { required: true, message: '人脸识别打卡不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.activityId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.activityId) {
            this.$http({
              url: this.$http.adornUrl(`/extra/activity/info/${this.dataForm.activityId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.activity.userId
                this.dataForm.activityName = data.activity.activityName
                this.dataForm.activityCaption = data.activity.activityCaption
                this.dataForm.activityDetail = data.activity.activityDetail
                this.dataForm.activityPerson = data.activity.activityPerson
                this.dataForm.startTime = data.activity.startTime
                this.dataForm.endTime = data.activity.endTime
                this.dataForm.ifPhoto = data.activity.ifPhoto
                this.dataForm.ifLocation = data.activity.ifLocation
                this.dataForm.ifFace = data.activity.ifFace
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/extra/activity/${!this.dataForm.activityId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId,
                'activityId': this.dataForm.activityId || undefined,
                'activityName': this.dataForm.activityName,
                'activityCaption': this.dataForm.activityCaption,
                'activityDetail': this.dataForm.activityDetail,
                'activityPerson': this.dataForm.activityPerson,
                'startTime': this.dataForm.startTime,
                'endTime': this.dataForm.endTime,
                'ifPhoto': this.dataForm.ifPhoto,
                'ifLocation': this.dataForm.ifLocation,
                'ifFace': this.dataForm.ifFace
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
