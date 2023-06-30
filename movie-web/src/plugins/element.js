import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Footer,
  Carousel,
  CarouselItem,
  Menu,
  MenuItem,
  Submenu,
  Form,
  FormItem,
  Input,
  Button,
  Message,
  MessageBox,
  Tabs,
  TabPane,
  Row,
  Col,
  Card,
  Pagination,
  Backtop,
  Icon,
  Table,
  TableColumn,
  Select,
  Option,
  RadioGroup,
  RadioButton,
  Image,
  Upload,
  Avatar,
  Popover,
  Drawer,
  Dialog

} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Pagination)
Vue.use(Backtop)
Vue.use(Icon)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Image)
Vue.use(Upload)
Vue.use(Avatar)
Vue.use(Popover)
Vue.use(Drawer)
Vue.use(Dialog)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
