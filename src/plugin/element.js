import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Input, Form, FormItem, Container,
          Header, Aside, Main, Menu,
        MenuItem, Submenu, Breadcrumb, BreadcrumbItem,
        Card, Row, Col, Table, TableColumn, Switch, Tooltip,
        Pagination, Dialog } from 'element-ui'
import { Message, MessageBox } from 'element-ui'

// 挂载组件
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox
// 使用其他组件
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
