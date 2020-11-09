<template>
  <div id="app">
    <Table :options="tableOptions"/>
  </div>
</template>

<script>
import Table from "./components/Table";
export default {
  name: 'app',
  components: {
    Table
  },
  data () {
    return {
      tableOptions: {
        width: '',
        background: '',
        defaultConfig: {},
        config: [
          {
            label: '日期',
            prop: 'quantity'
          },
          {
            label: '配送信息',
            prop: 'quantity',
            children: [
              {
                label: '姓名',
                prop: 'quantity',
              },
              {
                label: '地址',
                prop: 'quantity'
              },
            ]
          },
        ],
        data: [
          {
            prop: 'ff',
            value: 'hh'
          },
          {
            prop: 'quantity',
            value: '453'
          },
        ]
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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
