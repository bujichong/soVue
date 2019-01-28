<style scoped>
.mainSide{position: absolute;top:0px;left:0;bottom:0;background-color: #363e4f;border-right:1px solid #ddd;}
.menu-main{border-top:2px solid #555;}
.menu-main>li,.menu-main>a{border-bottom: 1px solid #4d5569;background-color:#363e4f;}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{background-color:#282f3e;}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{background-color:#353e52;}
</style>
<template>
<div>
    <Sider class="mainSide" hide-trigger>
        <Menu class="menu-main" :active-name="activeName" theme="dark" width="auto" :open-names="openNames">
            <template v-for="item in items">
                <template v-if="item.subs">
                    <Submenu :name="item.index" :index="item.index" :key="item.index">
                        <template slot="title">
                            <Icon :type="item.icon" />{{ item.title }}
                        </template>
                        <MenuItem v-for="(subItem,i) in item.subs" :to="subItem.index" :key="i" :name="subItem.index">
                            {{ subItem.title }}
                        </MenuItem>
                    </Submenu>
                </template>
                <template v-else>
                    <MenuItem :to="item.index"  :name="item.index" :key="item.index">
                        <Icon :type="item.icon" />{{ item.title }}
                    </MenuItem>
                </template>
            </template>
        </Menu>
    </Sider>
</div>
</template>
<script>
import bus from "../libs/bus";
export default {
  data() {
    return {
      // activeName : '',
    };
  },
  props : ['items','activeName','openNames'],
  created() {
    // bus.$on("active", name => {
    //   this.activeName = name.replace("/", "");
    // });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。

    bus.$on("tags", msg => {
        let arr = [];
        // window.console&&console.log(msg);
        for (let i = 0, len = msg.length; i < len; i++) {
            msg[i].name && arr.push(msg[i].name);
        }
        this.tagsList = arr;
    });

  }
};
</script>
