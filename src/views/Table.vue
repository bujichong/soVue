<style scoped>
.handle-box {margin-bottom: 20px;}
.handle-select {width: 120px;}
.handle-input {width: 300px;display: inline-block;}
.del-dialog-cnt{font-size: 16px;text-align: center;}
.pagewrap{text-align: center;padding:10px 0 0;}
</style>

<template>
    <div class="table">
        <!-- <Table border ref="userInfo" :columns="columns" :data="tableData"></Table> -->

        <Table border ref="userInfo2" :columns="columns" :data="tableData" stripe highlight-row @on-current-change="selectRow" @on-selection-change="checkedRow">
            <template slot-scope="{ row }" slot="date">
                <strong>{{ row.date  }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="opiton">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                <Button size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>
        <div class="pagewrap">
            <Page :total="total" show-total @on-change="changePage" @on-page-size-change="changePageSize" show-sizer />
        </div>

    <Modal v-model="showEdit" title="编辑" @on-ok="updateItem('formItem')">
        <Form ref="formItem" :model="formItem" :rules="ruleItem" :label-width="80">
            <Row>
            <Col span="12">
                <formItem label="姓名" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入姓名"></Input>
                </formItem>
            </Col>
            <Col span="12">
                <formItem label="日期" prop="date">
                    <DatePicker :value="formItem.date" format="yyyy-MM-dd" type="date" @on-change="(d)=>{formItem.date = d}" placeholder="请输入日期"></DatePicker>
                </formItem>
            </Col>
            </Row>
            <Row>
                <Col span="24">
                    <formItem label="地址" prop="address">
                        <Input v-model="formItem.address" placeholder="请输入地址"></Input>
                    </formItem>
                </Col>
            </Row>
        </Form>
    </Modal>

    </div>

</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                tableData :[],
                cur_page :1,
                pageSize : 10,
                showEdit : false,
                formItem : {
                    name:null,
                    date:null,
                    address:null
                },
                ruleItem : {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { type: 'string', min: 2, message: '姓名最少为2个字符', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, message: '请选择时间', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                },
                total : null,
                columns : [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '日期',
                        slot: 'date',
                        sortable : true
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        slot: 'opiton'
                    }
                ],
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            getData() {
                this.$http.post('/tableData', {
                    params:{page: this.cur_page,pageSize:this.pageSize}
                }).then((res) => {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                })
            },
            updateItem(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.get('/true',{params:this.formItem}).then((res) => {
                            this.getData();
                            this.$Message.success('Success!');
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            selectRow (currentRow,oldRow){
                window.console&&console.log(currentRow);
            },
            checkedRow (currentRow){
                window.console&&console.log(currentRow);
            },
            changePage(cur_page){
                this.cur_page = cur_page;
                this.getData();
            },
            changePageSize (pageSize){
                this.cur_page = 1;
                this.pageSize = pageSize;
                this.getData();
            },
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.tableData[index].name}<br>Date：${this.tableData[index].date}<br>Address：${this.tableData[index].address}`
                })
            },
            edit(row){
                this.showEdit = true;
                this.$refs['formItem'].resetFields();
                this.formItem = row;
            },
            remove (index) {
                this.$Modal.confirm({
                    title :'你确定删除此记录？',
                    // content: '你确定删除此记录？',
                    width:300,
                    // loading: true,
                    onOk: () => {
                        this.tableData.splice(index, 1);
                        this.$Message.info('删除成功！');
                    }
                });

            }
        }
    }

</script>
