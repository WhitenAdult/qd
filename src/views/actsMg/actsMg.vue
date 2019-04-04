<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-row class="action-header">
        <el-button type="primary" @click="add()">添加活动</el-button>
      </el-row>
      <el-table
        :data="actsData"
        tooltip-effect="dark"
        style="width: 100%;margin-top: 30px">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="actDetail(scope.row)">活动详情</el-button>
            <el-button type="danger" @click="deleteAct(scope.row)">删除活动</el-button>
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
    <el-dialog title="发布活动" :visible.sync="addFormVisible">
      <el-form :model="addForms">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="addForms.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" :label-width="formLabelWidth">
          <el-input v-model="addForms.content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAct()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addActs,getActsList,getActInfo,deleteActs } from '@/api/acts'

export default {
  name: 'actsMg',
  data() {
    return {
      total:0,
      formLabelWidth:'120px',
      actsData:[],
      addFormVisible: false,
      addForms:{
        title:'',
        content:'',
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
    this.actsList();
  },

  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.actsList();
    },

    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.actsList();
    },

    resetTable(){
      this.page.pageNum = 1;
      this.actsList();
    },

    actsList() {
      getActsList(this.page).then(res => {
        if(res.data.code === 200){
          this.actsData = res.data.data;
          this.total = res.data.total
        }
      })
    },

    add(){
      this.addFormVisible = true;
    },

    addAct(){
      addActs(this.addForms).then(res => {
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

    actDetail(row){
      this.$router.push({ name: 'actsInfo', params: {actsID: row.actsID}})
      // getActInfo({id:row.actsID}).then(res => {
      //   if(res.code = 200){
      //     console.log(11111111111);
      //   }
      // })
    },

    deleteAct(row){
      deleteActs({id:row.actsID}).then(res => {
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

