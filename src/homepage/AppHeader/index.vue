<template>
  <div>
    <router-link class="link" to="/">
      <img
        class="logo"
        src="http://vue.mengxuegu.com/img/logo.7156be27.png"
        alt="logo"
      />
      <span class="company">积云会员管理系统</span>
    </router-link>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ $store.getters.userInfo.name
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="changePassWord"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-s-fold" command="logout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    //下拉事件
    handleCommand(command) {
      switch (command) {
        case "changePassWord":
          this.handleChangePass();
          break;
        case "logout":
          this.handleLogout();
          break;
      }
    },
    //修改密码
    handleChangePass() {
      alert("修改密码");
    },
    // 退出登录
    async handleLogout() {
      try {
        const response = await this.$store.dispatch("Logout");
        setTimeout(() => {
          this.$router.push("/login");
        }, 100);
        this.$message.success("退出成功");
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.link {
  text-decoration: none;
  color: #fff;
  margin-left: 30px;
}
.logo {
  width: 25px;
  vertical-align: middle;
}
.company {
  line-height: 50px;
  vertical-align: middle;
  color: #fff;
  margin-left: 15px;
}
.el-dropdown {
  float: right;
  color: #fff;
  margin-right: 30px;
}
</style>
