<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
	this.getData();
  },
methods: {
	getData() {
		this.$http.post('/news/index', {
			params:{page: 1}
		}).then((res) => {
			window.console && console.log(res);
//			this.tableData = res.data.list;
//			this.total = this.tableData.length;
		})

		this.$http.post('/pro/index', {
			params:{page: 1}
		}).then((res) => {
			window.console && console.log(res);
//			this.tableData = res.data.list;
//			this.total = this.tableData.length;
		})
	}
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
