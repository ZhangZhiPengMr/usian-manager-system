<template>
  <div class="login-box">
    <div class="loginFrom">
      <h2>积云后台管理系统</h2>
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-width="60px"
        :rules="rules"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, getUser } from "../../api/user";
export default {
  name: "",
  components: {},
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 登录按钮
    loginSubmitForm() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.handleLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //登录方法
    async handleLogin() {
      const token = await this.$store.dispatch("login", this.loginForm);
      if (!token) return;
      const userInfo = await this.$store.dispatch("user");
      if (!userInfo) return;
      this.$message.success("登录成功");
      this.$router.push("/homepage");

      // // 登录接口
      // const res = await login(this.loginForm);
      // this.$store.dispatch("DIS_SET_TOKEN", res.token);
      // // 用户信息接口
      // const user = await getUser();
      // this.$store.dispatch("DIS_SET_USER_INFO", user);
      // 登录成功跳转首页并且提示信息
      // this.$message.success("登录成功");
      // this.$router.push("/homepage");
    },
  },
};
</script>
<style scoped lang="scss">
.login-box {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login.jpg");
  overflow: hidden;
}
.loginFrom {
  width: 350px;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 160px auto;
  border-radius: 20px;
  padding: 28px;
}
h2 {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}
.el-form {
  margin-top: 20px;
}
</style>
