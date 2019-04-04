<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-row class="action-header">
        <el-col :span="3">头像：</el-col>
        <el-col :span="6" v-if="this.state === true">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col v-if="this.state === false">
          <img :src="imageUrl" style="width:150px;height:150px">
        </el-col>
      </el-row>
      <el-row class="action-header">
        <el-col :span="12">用户名：{{userData.userName}}</el-col>
      </el-row>
      <el-row class="action-header">
        <el-col :span="12" v-if="this.state === false">昵称：{{userData.nickName}}</el-col>
        <el-col :span="8" v-if="this.state === true">
          昵称：<el-input v-model="userData.nickName"></el-input>
        </el-col>
      </el-row>
      <el-row class="action-header">
        <el-col :span="12" v-if="this.state === false">联系方式：{{userData.phone}}</el-col>
        <el-col :span="8" v-if="this.state === true">
          联系方式：<el-input v-model="userData.phone"></el-input>
        </el-col>
      </el-row>
      <el-row class="action-header">
        <el-col :span="12">所属社团：{{userData.stID}}</el-col>
      </el-row>
      <el-row class="action-header">
        <el-col :span="12">用户权限：{{userData.roles}}</el-col>
      </el-row>
      <el-row class="action-header">
        <el-col :span="12">创建日期：{{userData.create_time}}</el-col>
      </el-row>
      <el-row class="action-header">
        <el-col :span="12">
          <el-button type="primary" @click="state = true" v-if="this.state === false">
            修改个人信息
          </el-button>
          <el-button type="primary" @click="state = false" v-if="this.state === true">
            放弃修改
          </el-button>
          <el-button type="primary" @click="confirmChange()" v-if="this.state === true">
            确认修改
          </el-button>
          <el-button type="primary" @click="changePwd()" v-if="this.state === false">
            修改密码
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { getPersonalInfo,modifyInfo } from '@/api/users'

export default {
  name: 'personalInfo',
  data() {
    return {
      saveUrl:'',
      state: false,
      imageUrl:'',
      uploadUrl: process.env.BASE_API + '/users/api/uploads',
      userData: [],
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  mounted: function() {
    this.userInfo();
  },

  methods: {
    changePwd(){

    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.saveUrl = res.imageUrl.substring(6)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //获取个人用户信息
    userInfo() {
      getPersonalInfo({id:this.$store.getters.token}).then(res => {
        if(res.data.code === 200){
          this.userData = res.data.data;
          this.imageUrl = process.env.BASE_API + res.data.data.picURL;
        }
      })
    },
    confirmChange(){
      modifyInfo({
        id:this.$store.getters.token,
        nickName:this.userData.nickName,
        phone:this.userData.phone,
        imgUrl:this.saveUrl
      }).then(res => {
        if(res.data.code === 200){
          this.$notify({
            type: 'success',
            message:'修改成功！'
          });
          this.$store.dispatch('GetInfo');
          this.state = false;
          this.userInfo();
        }
      })
    },

    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .box-card {
    margin: 30px;
  }
  .action-header {
    margin-top:20px;
    margin-bottom:20px;
    margin-left:10px;
  }
  .avatar-uploader  {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
