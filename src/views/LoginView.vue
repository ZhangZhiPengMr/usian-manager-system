<template>
  <div class="loginBox">
    <el-card class="login">
      <h1>梦学谷会员管理系统</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            show-password
            prefix-icon="el-icon-s-tools"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        //必填
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("http://vue.mengxuegu.com/pro-api/user/login", this.ruleForm)
            .then((res) => {
              console.log(res);
              if (res.data.code == 2000) {
                //成功信息
                this.$message({
                  type: "success", // success error warning
                  message: res.data.message,
                  duration: 2000,
                });
                //存储token
                sessionStorage.setItem("token", res.data.data.token);
                this.$router.push("/about");
              } else {
                this.$message({
                  type: "error", // success error warning
                  message: res.data.msg,
                  duration: 2000,
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.loginBox {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: cover/contain;
  .login {
    width: 500px;
    height: 400px;
    border-radius: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
h1 {
  box-sizing: border-box;
  padding: 5px 35px;
}
</style>
