<template>
    <div class="login_container">
      <div class="login_box">
        <!--头像区域-->
        <div class="avatar_box">
          <img src="../assets/logo.png" title="头像">
        </div>
        <!--表单区域-->
        <el-form :model="loginForm" :rules="rules" label-width="0px" class="login_form">
          <!--用户名-->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefixIcon="el-icon-s-custom" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" prefixIcon="el-icon-s-goods" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!--按钮-->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>

    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";

    export default {
      components: {
        ElInput,
        ElForm,
        ElFormItem,
        ElButton},
      name: 'login',
      data () {
        return {
          loginForm: {
            username: '',
            password: ''
          },
          rules: {
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        login () {
          console.log(this.loginForm.username, this.loginForm.password)
        },
        reset () {
          this.loginForm.username = ''
          this.loginForm.password = ''
        }
      }
    }
</script>
<style scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%); /*半分比是根据当前盒子的高度来进行位移的，现在就是130的一半*/
    background-color: #fff;
  }
  .avatar_box img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
