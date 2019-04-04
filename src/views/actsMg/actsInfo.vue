<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-row>
        <el-col>
          {{actsData.title}}
        </el-col>
      </el-row>
    </el-card>
    <!-- <el-dialog title="新建社团" :visible.sync="addFormVisible">
      <el-form :model="addForms">
        <el-form-item label="社团名称" :label-width="formLabelWidth">
          <el-input v-model="addForms.assName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" :label-width="formLabelWidth">
          <el-input v-model="addForms.content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAss()">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { getActInfo } from '@/api/acts'

export default {
  name: 'actsInfo',
  props:['actsID'],
  data() {
    return {
      actsData:{},
    }
  },
  watch: {
    
  },

  mounted() {
    this.info();
  },

  methods: {
    info(){
      getActInfo({id:this.actsID}).then(res => {
        if(res.code === 200){
          this.actsData = res.data.data;
          console.log(this.actsData)
        }
      })
    },
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

