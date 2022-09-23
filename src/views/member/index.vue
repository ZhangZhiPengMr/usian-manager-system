<template>
  <div class="mt_2">
    <el-form
      :inline="true"
      ref="queryForm"
      :model="memberQueryParams"
      class="demo-form-inline"
    >
      <el-form-item prop="cardNum">
        <el-input
          v-model="memberQueryParams.cardNum"
          placeholder="会员卡号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input
          v-model="memberQueryParams.name"
          placeholder="会员名字"
        ></el-input>
      </el-form-item>
      <el-form-item prop="payType">
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
      <el-form-item prop="birthday">
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
        <el-button type="primary" @click="openDialog">新增</el-button>
        <el-button @click="reset('queryForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="memberList" border style="width: 100%" height="700">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
      <el-table-column prop="name" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="integral" label="可用积分"></el-table-column>
      <el-table-column prop="money" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" label="支付类型">
        <template v-slot="scope">
          {{ scope.row.payType | filtersPayType }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="openDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="delMember(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form
        :model="dialogFormParams"
        ref="dialogForm"
        :rules="dialogRules"
        style="width: 400px"
        label-width="120px"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input
            v-model="dialogFormParams.cardNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input
            v-model="dialogFormParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="dialogFormParams.birthday"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="dialogFormParams.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input
            v-model="dialogFormParams.money"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input
            v-model="dialogFormParams.integral"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select
            v-model="dialogFormParams.payType"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="(item, index) in payType"
              :key="index"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input
            type="textarea"
            v-model="dialogFormParams.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="determine('dialogForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      //页码渲染的数据
      memberList: [],
      // 定义支付类型的数组
      payType: MemberData.payType,
      // 控制弹框的显示隐藏
      dialogFormVisible: false,
      //  弹框的数据
      dialogFormParams: {
        cardNum: "",
        name: "",
        payType: "",
        address: "",
        money: "",
        integral: "",
        phone: "",
        birthday: "",
      },
      //弹框的标题
      dialogTitle: "",
      //弹框的正则校验
      dialogRules: {
        cardNum: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        payType: [
          { required: true, message: "支付类型不能为空", trigger: "change" },
        ],
      },
    };
  },
  filters: {
    //过滤了支付格式
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
      try {
        const response = await MemberApi.memberList(
          this.currentPage,
          this.pageSize,
          this.memberQueryParams
        );
        this.memberList = response.rows;
        this.total = response.total;
      } catch (error) {
        console.log(error.message);
      }
    },
    //分配每页条数
    handleSizeChange(val) {
      this.pageSize = val;
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
    //重置表单
    reset(Form) {
      this.$refs[Form].resetFields();
    },
    //打开弹框
    openDialog(id) {
      this.dialogFormVisible = true;
      if (typeof id === "number") {
        this.findMemderId(id);
        this.dialogTitle = "会员编辑";
      } else {
        this.dialogTitle = "会员添加";
      }
    },
    //关闭弹框
    cancelDialog() {
      this.reset("dialogForm");
      this.dialogFormVisible = false;
    },
    //弹框确定按钮
    determine() {
      this.$refs["dialogForm"].validate((valid) => {
        if (!valid) return;
        this.dialogFormParams.id
          ? this.handleEdidMember()
          : this.handleAddMember();
      });
    },
    //删除单个按钮
    delMember(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const response = await MemberApi.delMemder(id);
            this.$message.success("删除成功");
            this.getMemberList();
          } catch (error) {
            console.log(error.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //会员添加
    async handleAddMember() {
      try {
        const response = await MemberApi.addMember(this.dialogFormParams);
        this.reset("dialogForm");
        this.getMemberList();
        this.dialogFormVisible = false;
        this.$message.success("添加成功");
      } catch (error) {
        console.log(error.maessage);
      }
    },
    async findMemderId(id) {
      try {
        const response = await MemberApi.findMember(id);
        // console.log(response);
        this.dialogFormParams = response;
      } catch (error) {
        console.log(error.message);
      }
    },
    //会员编辑
    async handleEdidMember() {
      try {
        const response = await MemberApi.editMember(
          this.dialogFormParams.id,
          this.dialogFormParams
        );
        this.getMemberList();
        this.reset("dialogForm");
        this.$message.success("编辑成功");
        this.dialogFormVisible = false;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  created() {
    this.getMemberList();
  },
};
</script>
<style scoped lang="scss"></style>
