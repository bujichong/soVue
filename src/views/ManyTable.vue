<template>
<div>表格页面</div>

</template>

<script>
    export default {
        name: 'ManyTable',
        data() {
            return {
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
