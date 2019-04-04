<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-row class="action-header">
        <el-button type="primary" @click="add()">添加用户</el-button>
      </el-row>
      <el-table
        :data="userData"
        tooltip-effect="dark"
        style="width: 100%;margin-top: 30px"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="resetPwd(scope.row)">重置密码</el-button>
            <el-button type="danger" @click="deleteUser(scope.row)">删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div :model="page" style="margin-top:30px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNum"
          :page-sizes="[10,20,30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog title="新增用户" :visible.sync="addFormVisible">
      <el-form :model="addForms">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="addForms.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" :label-width="formLabelWidth">
          <el-select v-model="addForms.roles" placeholder="请选择用户权限">
            <el-option label="超级管理员" value="admin"></el-option>
            <el-option label="普通管理员" value="editor"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { getUserInfo,addUsers,resetPassword,deleteU } from '@/api/users'

export default {
  name: 'userMg',
  data() {
    return {
      total:0,
      formLabelWidth:'120px',
      userData:[],
      addFormVisible: false,
      addForms:{
        userName:'',
        roles:'',
      },
      page:{
        pageSize:10,
        pageNum:1,
      },
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
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.userInfo();
    },

    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.userInfo();
    },

    resetTable(){
      this.page.pageNum = 1;
      this.userInfo();
    },

    userInfo() {
      getUserInfo(this.page).then(res => {
        if(res.data.code === 200){
          this.userData = res.data.data;
          this.total = res.data.total
        }
      })
    },

    add(){
      this.addFormVisible = true;
    },

    addUser(){
      addUsers(this.addForms).then(res => {
        if(res.data.code === 200){
          this.$notify({
            type: 'success',
            message:'新增成功！'
          });
          this.addFormVisible = false;
          this.resetTable();
        }
      })
    },

    resetPwd(row){
      resetPassword({id:row.id}).then(res => {
        if(res.code = 200){
          this.$notify({
            type: 'success',
            message:'重置成功！'
          });
          this.resetTable();
        }
      })
    },

    deleteUser(row){
      deleteU({id:row.id}).then(res => {
        if(res.code = 200){
          this.$notify({
            type: 'success',
            message:'删除成功！'
          });
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
</style>
