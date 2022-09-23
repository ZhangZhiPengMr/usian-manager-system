<template>
  <div class="mt_2">
    <el-form :inline="true" :model="memberQueryParams" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="memberQueryParams.cardNum"
          placeholder="会员卡号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="memberQueryParams.name"
          placeholder="会员名字"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="memberQueryParams.payType"
          placeholder="支付类型"
          width="100"
        >
          <el-option
            v-for="(item, index) in payType"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="memberQueryParams.birthday"
          type="date"
          placeholder="出生日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchQuery">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="memberList" border style="width: 100%" height="700">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"> </el-table-column>
      <el-table-column prop="name" label="会员姓名"> </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> </el-table-column>
      <el-table-column prop="phone" label="手机号码"> </el-table-column>
      <el-table-column prop="integral" label="可用积分"> </el-table-column>
      <el-table-column prop="money" label="开卡金额"> </el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template v-slot="scope">
          {{ scope.row.payType | filtersPayType }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt_2"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import MemberApi from "../../api/member";
import MemberData from "../../enum/Member";
export default {
  name: "",
  components: {},
  data() {
    return {
      //页码
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      // 查询的参数
      memberQueryParams: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
      },
      memberList: [],
      payType: MemberData.payType,
    };
  },
  filters: {
    filtersPayType(value) {
      const data = MemberData.payType.find((item) => {
        return item.type === value;
      });
      return data ? data.name : "";
    },
  },
  methods: {
    //获取会员列表的数据
    async getMemberList() {
      const response = await MemberApi.memberList(
        this.currentPage,
        this.pageSize,
        this.memberQueryParams
      );
      this.memberList = response.data;
      this.total = response.total;
    },
    //分配每页条数
    handleSizeChange(val) {
      this.page = val;
      this.getMemberList();
    },
    //跳转页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMemberList();
    },
    //查询
    searchQuery() {
      this.currentPage = 1;
      this.getMemberList();
    },
  },
  created() {
    this.getMemberList();
  },
};
</script>
<style scoped lang="scss"></style>
