<template>
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <div>
          <router-link to="/welcome">
            <img src="../assets/myLogo.gif" title="我的电商平台">
          </router-link>
          <span>仿佛我是电商平台</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!--页面主体区域-->
      <el-container>
        <!--侧边栏-->
        <el-aside :width="collapseFlag == false ? '200px' : '64px'">
          <!--折叠点击按钮-->
          <div class="toggle-button" @click="collapseFlag = !collapseFlag">|||</div>
          <!--侧边栏菜单区域-->
          <el-menu backgroundColor="#fff" textColor="#000"
            activeTextColor="lightpink" :unique-opened="true"
            :collapse="collapseFlag" :collapse-transition="false"
            :router="true" :default-active="activePath">
            <!--一级菜单-->
            <el-submenu :index="'/' + item.path" v-for="item in menuList" :key="item.menuId">
              <!--一级菜单模板区域-->
              <template slot="title">
                <i :class="iconsObj[item.menuId]"></i>
                <span>{{item.authName}}</span>
              </template>
              <!--二级菜单-->
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children"
                :key="subItem.menuId" @click="setPath('/' + subItem.path)">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!--右侧内容-->
        <el-main>
          <!--放一个路由的占位符-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
  export default {
    name: 'home',
    data () {
      return {
        // 左侧菜单数据
        menuList: [],
        iconsObj: {
          '101': 'el-icon-user-solid',
          '102': 'el-icon-shopping-cart-1'
        },
        collapseFlag: false,
        // 被激活的链接地址
        activePath: ''
      }
    },
    // 生命周期函数
    created () {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      logout () {
        window.sessionStorage.clear()
        this.$router.replace('/login')
      },
      // 获取所有的菜单
      async getMenuList () {
        const { data: res } = await this.$http.get('/getMenuList')
        if (res.status !== 200) return this.$message.error(res.message)
        this.menuList = res.result
      },
      // 保存链接激活状态
      setPath (activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      }
    }
  }
</script>
<style scoped>
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: pink;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
  .el-header div {
    display: flex;
    align-items: center;
  }
  .el-header div img {
    height: 60px;
  }
  .el-header div span {
    margin-left: 15px;
  }
  .el-aside {
    background-color: lightpink;
  }
  .toggle-button {
    background-color: darkblue;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .el-aside .el-menu {
    border-right: none;
  }
  .el-main {
    background-color: #eaedf1;
  }
</style>
