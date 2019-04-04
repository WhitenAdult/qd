<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-row class="action-header">
        <el-button type="primary" @click="add()">新增社团</el-button>
      </el-row>
      <el-table
        :data="asssData"
        tooltip-effect="dark"
        style="width: 100%;margin-top: 30px">
        <el-table-column
          prop="asssName"
          label="社团名称">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="建团时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="assDetail(scope.row)" v-if="$store.getters.st === null && $store.getters.roles[0] !== 'admin'">申请加入社团</el-button>
            <el-button type="text" @click="assDetail(scope.row)">社团主页</el-button>
            <el-button type="danger" @click="deleteAss(scope.row)" v-if="$store.getters.roles[0] === 'admin'">删除社团</el-button>
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
    <el-dialog title="新建社团" :visible.sync="addFormVisible">
      <el-form :model="addForms">
        <el-form-item label="社团名称" :label-width="formLabelWidth">
          <el-input v-model="addForms.assName" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动内容" :label-width="formLabelWidth">
          <el-input v-model="addForms.content" auto-complete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAss()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addAsss,getAsssList,getAssInfo,deleteAsss } from '@/api/asss'

export default {
  name: 'asssMg',
  data() {
    return {
      total:0,
      formLabelWidth:'120px',
      asssData:[],
      addFormVisible: false,
      addForms:{
        assName:'',
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
    this.asssList();
  },

  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.asssList();
    },

    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.asssList();
    },

    resetTable(){
      this.page.pageNum = 1;
      this.asssList();
    },

    asssList() {
      getAsssList(this.page).then(res => {
        if(res.data.code === 200){
          this.asssData = res.data.data;
          this.total = res.data.total
        }
      })
    },

    add(){
      this.addFormVisible = true;
    },

    addAss(){
      addAsss(this.addForms).then(res => {
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

    assDetail(row){
      getAssInfo({id:row.asssID}).then(res => {
        if(res.code = 200){
          console.log(11111111111);
        }
      })
    },

    deleteAss(row){
      deleteAsss({id:row.asssID}).then(res => {
        if(res.code = 200){
          this.$notify({
            type: 'success',
            message:'删除成功！'
          });
          this.resetTable();
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

