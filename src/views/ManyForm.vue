<template>
    <div>
        其他表单页面

    </div>
</template>

<script>
    export default {
        name: 'ManyForm',
        data: function(){
            return {
                 form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: ['步步高'],
                    resource: '小天才',
                    desc: '',
                    options: []
                }
            }
        },
        methods: {
            onSubmit() {
                window.console&&console.log(this.form);
                this.$message.success('提交成功！');
            }
        }
    }
</script>