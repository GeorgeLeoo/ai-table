<template>
  <div id="app">
    <div style="padding: 60px;">
      <Table :options="tableOptions" @cell-click="handlerCellClick"/>
<!--      <Table :options="tableOptions1" @cell-click="handlerCellClick"/>-->
    </div>
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
        // 表格高度
        height: '600px',
        background: '',
        fontSize: '16px',
        initRows: 7,
        fixed: true,
        headList: [
          {
            label: '摘要',
            prop: 'abstract',
            // 单元格宽度，money类型 不能设置宽度
            width: 440,
            tip: '摘要',
            canEdit: true,
          },
          {
            label: '会计科目',
            prop: 'subject',
            // width: 240,
            tip: '科目',
            canEdit: true,
            canSelect: true,
            help: {
              title: '',
              content: '',
              theme: 'light'
            }
          },
          {
            label: '借方金额',
            prop: 'debtorMoney',
            type: 'money',
            fontSize: '14px',
            canEdit: true,
            editSize: '20px',
            editPosition: 'right',
          },
          {
            label: '贷方金额',
            prop: 'creditorMoney',
            type: 'money',
            fontSize: '14px',
            canEdit: true,
            editSize: '20px',
            editPosition: 'right',
          },
        ],
        data: [
          {
            abstract: '765',
            subject: 'fhyt',
            debtorMoney: '2456',
            creditorMoney: '-66.34',
          },
          {
            abstract: '65466434242343',
            subject: '546',
            debtorMoney: '472',
            creditorMoney: '5345.22',
          },
        ],
        summary: {
          title: '合计',
          value: [
            {
              prop: 'debtorMoney',
              type: 'money',
              value: '124'
            },
            {
              prop: 'creditorMoney',
              type: 'money',
              value: '98767687'
            },
          ],
        }
      },
      tableOptions1: {
        height: '800px',
        background: '',
        fontSize: '16px',
        initRows: 5,
        headList: [
          {
            label: '摘要1',
            prop: 'abstract',
            width: 340,
            tip: '摘要',
            canEdit: true,
          },
          {
            label: '会计科目1',
            prop: 'subject',
            // width: 240,
            tip: '科目',
            canEdit: true,
            canSelect: true,
          },
          {
            label: '借方金额',
            prop: 'debtorMoney',
            type: 'money',
            fontSize: '14px',
            canEdit: true,
            editSize: '20px',
            editPosition: 'right',
          },
          {
            label: '贷方金额',
            prop: 'creditorMoney',
            type: 'money',
            fontSize: '14px',
            canEdit: true,
            editSize: '20px',
            editPosition: 'right',
          },
        ],
        data: [
          {
            abstract: '23',
            subject: 'eqw',
            debtorMoney: '2',
            creditorMoney: '4324323.34',
          },
          {
            abstract: '312321312312314324324232',
            subject: 'ytuu',
            debtorMoney: '72',
            creditorMoney: '42343.22',
          },
        ],
        summary: {
          title: '合计',
          value: [
            {
              prop: 'debtorMoney',
              type: 'money',
              value: '867'
            },
            {
              prop: 'creditorMoney',
              type: 'money',
              value: '23123'
            },
          ],
        }
      },
    }
  },
  mounted() {},
  methods: {
    handlerCellClick(d) {
      console.log(d)
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //margin-top: 30px;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  //display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
p {
  margin: 0;
  padding: 0;
}
</style>
