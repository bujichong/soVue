<template>
<div>文本编辑器页面</div>

</template>

<script>
    export default {
        name: 'editor',
        data() {
            return {
                url: './static/vuetable.json',
                updateUrl: './static/true.json',
                tableData :[]
            }
        },
        created() {
            // this.getData();
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
