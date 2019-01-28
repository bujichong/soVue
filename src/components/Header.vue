<style scoped>
.header{position:relative;box-sizing:border-box;height:64px;background-color:#333;font-size:22px;color:#fff;padding-left:15px;z-index:10}
.collapse-btn{float:left;padding:0 21px;cursor:pointer;line-height:70px}
.header .logo{float:left;width:250px;line-height:70px}
.header-right{float:right;padding-right:20px}
.header-user-con{display:flex;height:64px;align-items:center}
.btn-fullscreen{margin-right:5px;font-size:24px}
.btn-bell,.btn-fullscreen{position:relative;width:30px;height:30px;text-align:center;border-radius:15px;cursor:pointer}
.btn-bell-badge{position:absolute;right:0;top:-2px;width:8px;height:8px;border-radius:4px;background:#f56c6c;color:#fff}
.btn-bell .ios-bell{color:#fff}
.user-name{margin-left:15px;font-size:14px}
.user-avator{margin-left:20px}
.user-avator img{display:block;width:40px;height:40px;border-radius:50%}
.dropdown-link{color:#fff;cursor:pointer}
.dropdown-menu__item{text-align:center}
</style>
<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <!-- <div class="collapse-btn" @click="collapseChage">
            <Icon type="md-appstore" />
        </div> -->
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <Tooltip :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <Icon type="md-qr-scanner" />
                    </Tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <Tooltip :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/table">
                            <Icon type="ios-notifications" />
                        </router-link>
                    </Tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="static/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <Dropdown class="user-name" trigger="click" placement="bottom-end" @on-click="handleCommand">
                    <span class="dropdown-link">
                        {{username}} <Icon type="ios-arrow-down"></Icon>
                    </span>
                    <DropdownMenu slot="list">
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <DropdownItem>项目仓库</DropdownItem>
                        </a>
                        <DropdownItem divided name="loginout">退出登录</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../libs/bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'linxin',
                message: 2
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(name) {// 用户名下拉菜单选择事件
                if(name == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            collapseChage(){// 侧边栏折叠，暂时屏蔽
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            handleFullScreen(){// 全屏事件
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            // if(document.body.clientWidth < 1500){
            //     this.collapseChage();
            // }
        }
    }
</script>

