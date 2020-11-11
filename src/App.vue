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
        fontSize: '16px',
        initRows: 5,
        config: [
          {
            label: '摘要',
            prop: 'abstract',
            width: '240px',
            tip: '摘要',
            canEdit: true,
          },
          {
            label: '会计科目',
            prop: 'subject',
            width: '240px',
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
        ]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      // this.tableOptions.config.push({
      //   label: '摘要33',
      //   prop: 'abstract',
      //   width: '240px',
      //   tip: '摘要',
      //   canEdit: true,
      // })
    }, 3000)
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
