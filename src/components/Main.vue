<style scoped>
.ivu-menu-vertical.ivu-menu-light:after{width:0;}
.layout-main{position: absolute;left:0;right:0;top:64px;bottom:0;}
.content-box{position: absolute;top:0px;right:0;left:200px;bottom:0;padding:0;}

.crumb-main{padding:15px 0;}
.content-main{position: absolute;top:39px;right:0;left:0;bottom:0;background-color: #fff;overflow-x: hidden;overflow-y: auto;}
</style>
<template>
<div class="wrapper">
    <v-head></v-head>
    <div class="layout-main">

        <v-sidebar :items="items" :activeName="activeName" :openNames="openNames"></v-sidebar>

        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content-main">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>

    </div>
</div>
</template>
<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "../libs/bus";
export default {
    components: {
        vHead,
        vSidebar,
        vTags
    },
    data() {
        return {
            tagsList: [],
            collapse: false,
            openNames : [],
            activeName : 'dashboard',
            items: []
        };
    },
    created() {

        this.$http.post('/mainnav').then((res) => {
            // window.console && console.log(res);
            this.items = res.data;
            this.openNames = ['formList'];
        });

        bus.$on("active", name => {
            this.activeName = name.replace("/", "");
        });

        bus.$on("collapse", msg => {
            this.collapse = msg;
        });
  }
}
</script>