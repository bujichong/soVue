
<style>
.tags{position:relative;height:39px;background:#f0f0f0;padding-right:120px;z-index:9;padding-left: 2px;border-bottom: 1px solid #e9e9e9;}
.tags ul{box-sizing:border-box;width:100%;height:100%;}
.tags-li{float:left;margin:3px 2px 2px;border-radius:3px;font-size:12px;overflow:hidden;cursor:pointer;height:32px;line-height:32px;border:1px solid #e9eaec;background:#fff;padding:0 9px 0 17px;vertical-align:middle;color:#666;}
.tags-li:not(.active):hover{background:#f8f8f8;}
.tags-li.active{color:#fff;background-color:#2d8cf0;}
.tags-li-title{float:left;max-width:80px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin-right:5px;color:#666;}
.tags-li.active .tags-li-title{color:#fff;}
.tags-close-box{position:absolute;right:0;top:0;box-sizing:border-box;padding-top:7px;text-align:center;width:90px;height:38px;border-left:1px solid #e3e3e3;background-color: #f9f9f9;z-index:9;}
</style>

<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index" @dblclick="closeTags(index)">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span v-if="item.path!==indexTag.path" class="tags-li-icon" @click="closeTags(index)"><Icon type="ios-close"></Icon></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <Dropdown @on-click="handleTags" trigger="hover">
                <Button size="small" type="primary">
                    标签选项
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="other">关闭其他</DropdownItem>
                    <DropdownItem name="all">关闭所有</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>

<script>
import bus from "../libs/bus";
import * as $u from "../libs/util";
    export default {
        data() {
            return {
                tagsList: [],
                indexTag : {},
            }
        },
        methods: {
            isActive(path) {
                this.activeSide();
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
                $u.setTagInLocal(this.tagsList);
            },
            activeSide(){
                var thisPath = this.$route.fullPath;
                // window.console&&console.log(thisPath);
                bus.$emit('active', thisPath);
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [this.indexTag];
                this.$router.push('/');
                $u.setTagInLocal(this.tagsList);
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                });
                this.tagsList = curItem[0].path===this.indexTag.path?curItem:[this.indexTag,...curItem];//保留首页
                $u.setTagInLocal(this.tagsList);
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                });
                !isExist && this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                })
                $u.setTagInLocal(this.tagsList);
                bus.$emit('tags', this.tagsList);
            },
            handleTags(name){
                name === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.indexTag = $u.indexTag;
            this.tagsList = $u.getTagFromLocal();
            this.activeSide();
            this.setTags(this.$route);
        }
    }

</script>

