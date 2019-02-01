<style scoped>
.wrap{padding:40px;width:700px;}
.fl{float: left;margin-right: 10px;}
</style>
<template>
    <div class="wrap">
        <Form ref="formI" :model="formItem" :rules="ruleItem" :label-width="80">
            <formItem label="姓名：" prop="name">
                <Input v-model="formItem.name" placeholder="请输入..."></Input>
            </FormItem>
            <FormItem label="地区：" prop="city">
                <Select v-model="formItem.city">
                    <Option value="beijing">北京</Option>
                    <Option value="shanghai">上海</Option>
                    <Option value="shenzhen">深圳</Option>
                </Select>
            </FormItem>
            <FormItem label="生日">
                <FormItem prop="date" class="fl"><DatePicker type="date" placeholder="请选择日期" v-model="formItem.date" format="yyyy-MM-dd"></DatePicker></FormItem>
                <FormItem prop="time" class="fl"><TimePicker type="time" placeholder="请选择时间" v-model="formItem.time"></TimePicker></FormItem>
            </FormItem>
            <FormItem label="性别：" prop="sex">
                <RadioGroup v-model="formItem.sex">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="爱好：" prop="checkbox">
                <CheckboxGroup v-model="formItem.checkbox">
                    <Checkbox label="eat">吃</Checkbox>
                    <Checkbox label="sleep">睡</Checkbox>
                    <Checkbox label="run">运动</Checkbox>
                    <Checkbox label="movie">电影</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="开启：" prop="switch">
                <i-switch v-model="formItem.switch" size="large">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
            </FormItem>
            <FormItem label="工作年限：" prop="slider">
                <Slider v-model="formItem.slider" range></Slider>
            </FormItem>
            <FormItem label="备注：" prop="remark">
                <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="备注..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formI')">提交</Button>
                <Button style="margin-left: 8px" @click="handleReset('formI')">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                formItem: {
                    name: '',
                    city: '',
                    sex: 'male',
                    checkbox: ['sleep','movie'],
                    switch: false,
                    date: '',
                    time: '',
                    slider: [1, 10],
                    remark: ''
                },
                ruleItem : {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { type: 'string', min: 2, message: '姓名最少为2个字符', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择地址', trigger: 'change' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    date: [
                        { required: true,type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: '请选择时间', trigger: 'change' }
                    ],
                },
            }
        },
        methods: {
            handleSubmit(name) {
                // window.console&&console.log(this.$refs[name]);
                this.$refs[name].validate((valid) => {
                    window.console&&console.log(valid);
                    if (valid) {
                        this.$Message.success('提交成功!');
                        window.console&&console.log(this.formItem);
                    }
                })
            },
            handleReset (name){
                this.$refs[name].resetFields();
            }
        }
    }
</script>