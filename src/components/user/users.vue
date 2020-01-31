<template>
    <div>
      <!--面包屑导航区-->
      <el-breadcrumb :separator-class="classIcon">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!--卡片区域-->
      <el-card>
        <!--Layout布局-->
        <el-row :gutter="20"> <!--gutter间距-->
          <el-col :span="8">  <!--span子区域比例大小-->
            <!--搜索与添加区域-->
            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
          </el-col>
        </el-row>
        <!--用户列表区-->
        <el-table :data="userList" border stripe>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="电话" prop="mobile"></el-table-column>
          <el-table-column label="角色" prop="role_name"></el-table-column>
          <el-table-column label="状态">
            <template v-slot="scope">
              <!--可以通过scope.row获取到本行的数据-->
              <el-switch v-model="scope.row.mg_status" @change="handleSwitchChange(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="190px">
            <template v-slot="scope">
              <el-tooltip effect="dark" content="修改" placement="top-end" :enterable="false">
                <el-button @click="showEditDialog(scope.row.userId)" size="mini" type="primary" icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                <el-button @click="removeUserById(scope.row.userId)" size="mini" type="danger" icon="el-icon-delete"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="分配角色" placement="top-start" :enterable="false">
                <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!--分页区域-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum" :page-sizes="[3, 5]" :page-size="queryInfo.pageSize"
           :total="total" layout="total, sizes, prev, pager, next, jumper" background></el-pagination>
      </el-card>
      <!--添加用户的对话框-->
      <el-dialog title="添加用户" @close="addDialogClosed" :visible.sync="addDialogVisible" width="50%">
        <!--内容主题区域-->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
        </el-form>
        <!--底部区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">添 加</el-button>
        </span>
      </el-dialog>
      <!--修改用户对话框-->
      <el-dialog title="修改用户" @close="editDialogClosed" :visible.sync="editDialogVisible" width="50%">
        <!--内容主题区域-->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!--底部区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">修 改</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
  export default {
    name: 'users',
    data () {
      var checkEmail = (rule, value, callback) => {
        const regEmail = /([0-9a-zA-Z_-])+@([0-9a-zA-Z_-])+(\.[0-9a-zA-Z_-])+/
        if (regEmail.test(value)) return callback()
        return callback(new Error("邮箱不合法"))
      }
      var checkMobil = (rule, value, callback) => {
        const regEmail = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (regEmail.test(value)) return callback()
        return callback(new Error("手机号不合法"))
      }
      return {
        classIcon: 'el-icon-arrow-right',
        // 定义get参数
        queryInfo: {
          query: '',
          // 当前的页数
          pagenum: 1,
          // 当前每页显示多少条数据
          pageSize: 3
        },
        userList: [],
        total: 0,      // 数据总条数
        // 控制添加对话框的显示与隐藏
        addDialogVisible: false,
        // 添加表单的数据对象
        addForm: {
          username: '',
          password: '',
          mobile: '',
          email: ''
        },
        // 添加表单的验证规则对象
        addFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名的长度在3-10个字符之间', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '密码的长度在6-15个字符之间', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkMobil, message: '手机号不合法', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, message: '邮箱不合法', trigger: 'blur' }
          ]
        },
        // 控制修改对话框的显示与隐藏
        editDialogVisible: false,
        // 修改表单的数据对象
        editForm: {},
        // 修改表单的数据验证规则
        editFormRules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: checkMobil, message: '手机号不合法', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, message: '邮箱不合法', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.getUserList()
    },
    methods: {
      async getUserList () {
        const { data: res } = await this.$http.get('/getUserList', { params: this.queryInfo })
        if (res.status !== 200) return this.$message.error("获取用户失败")
        this.userList = res.result
        this.total = res.total
      },
      // Switch状态的改变
      async handleSwitchChange (userInfo) {
        // console.log(userInfo.mg_status)
        const {data: res} = await this.$http.post('/ModifyUserStatusById', { userId: userInfo.userId, status: userInfo.mg_status })
        if (res.status !== 200) {
          return this.$message.error("更新用户状态失败")
        }
        this.$message.success("更新用户状态成功")
      },
      // 监听 pagesize 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.pageSize = newSize
        this.getUserList()
      },
      // 监听 页码值 改变的事件
      handleCurrentChange (newPage) {
        // console.log(newPage)
        this.queryInfo.pagenum = newPage
        this.getUserList()
      },
      // 监听添加用户对话框的关闭
      addDialogClosed () {
        // 重置对话框表单内容
        this.$refs.addFormRef.resetFields()
      },
      // 添加用户
      addUser () {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return;
          // 发起添加用户的请求
          const {data: res} = await this.$http.post('/addUser', this.addForm)
          if (res.status !== 200) return this.$message.error("添加失败")
          this.$message.success("添加成功")
          this.addDialogVisible = false
          // 刷新列表
          this.getUserList()
        })
      },
      // 监听修改按钮，根据id请求用户信息
      async showEditDialog (userId) {
        const {data: res} = await this.$http.get('/getUserById?userId=' + userId)
        if (res.status !== 200) return this.$message.error("出错啦")
        this.editForm = res.result
        this.editDialogVisible = true
      },
      // 监听修改用户对话框的关闭从而实现验证信息的清空
      editDialogClosed () {
        this.$refs.editFormRef.resetFields()
      },
      // 修改用户
      editUser () {
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return; // 数据不合法，return出去
          const {data: res} = await this.$http.post('/editUser', this.editForm)
          if (res.status !== 200) return this.$message.error("修改失败")
          this.getUserList()
          this.editDialogVisible = false
          this.$message.success("修改成功")
        })
      },
      // 根据id删除选中的用户
      async removeUserById (userId) {
        const result = await this.$confirm('此操作将永久删除该用户，是否继续', '确认？',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)  // 将错误return给result保存
        if (result === 'cancel') return this.$message.info("取消了删除")
        // 执行删除操作
        const {data: res} = await this.$http.post('/deleteUserById', { userId: userId })
        if (res.status !== 200) return this.$message.error("删除失败")
        this.getUserList()
        this.$message.success("删除成功")
      }
    }
  }
</script>
<style scoped>
</style>
