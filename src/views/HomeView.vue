<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>梦学谷管理系统</h1>
        <el-dropdown>
          <span class="el-dropdown-link" @click="signOut">
            {{ userData.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @command="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="about">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="member">
              <i class="el-icon-user-solid"></i>
              <span slot="title">会员管理</span>
            </el-menu-item>
            <el-menu-item index="supplier">
              <i class="el-icon-goods"></i>
              <span slot="title">供应商管理</span>
            </el-menu-item>
            <el-menu-item index="goods">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="staff">
              <i class="el-icon-user"></i>
              <span slot="title">员工管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      menusData: [], //左侧栏数据
      userData: [],
    };
  },
  created() {
    // this.getMenus();
    this.gitUser();
  },
  mounted() {},
  methods: {
    //获取用户信息
    gitUser() {
      this.$axios
        .get("http://vue.mengxuegu.com/pro-api/user/info/admin")
        .then((res) => {
          console.log(res);
          this.userData = res.data.data;
        });
    },
    //退出登录以及token
    signOut() {
      this.$router.back();
      console.log(1);
    },
  },
};
</script>
<style scoped lang="scss">
.el-header,
.el-footer {
  background-color: #373d41;
  color: #fff;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.el-aside {
  background-color: #373d41;
  color: #fff;
  height: 90vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 90vh;
}
.el-icon-s-operation {
  display: block;
  text-align: center;
  font-size: 30px;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 18px;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 18px;
}
</style>
