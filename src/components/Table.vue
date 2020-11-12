<template>
  <div class="ai-table-wrapper">
    <div class="ai-table-header">
      <table class="ai-table-header-body" cellspacing="0" cellpadding="0" border="0">
        <colgroup>
          <col class="ai-table-left">
          <col v-for="(item, index) in config" :key="index" :style="setColStyle(item)">
        </colgroup>
        <!--  表头  -->
        <thead>
        <tr>
          <th class=""></th>
          <th v-for="(item, index) in config" :key="index" class="border-top-left border-bottom">
            <div class="table-header-cell" :style="setHeaderCellStyle(item)">{{item.label}}</div>
            <div v-if="item.type === TABLE_CELL_TYPE_MAP.MONEY" class="money_unit" :class="['border-top']">
                <span v-for="(unit, unitIndex) in MONEY_UNIT_LIST" :key="unitIndex"
                      class="money_unit_item">{{unit}}</span>
            </div>
          </th>
        </tr>
        </thead>
        <!--  表体  -->
        <tbody>
        <tr v-for="(item, index) in tableData" :key="index" class="table-body-tr" @mouseover="handlerMouseOver(index)">
          <td colspan="1" rowspan="1" class="table-body-operation">
            <div v-if="mouseoverIndex === index" class="operation">
              <img class="icon" src="../assets/add.png" alt="" @click="handlerRowAdd(index)">
              <img class="icon" src="../assets/del.png" alt="" @click="handlerRowDel(index)">
            </div>
          </td>
          <td v-for="(cell, i) in transformToArray(item)" :key="i" colspan="1" rowspan="1"
              class="table-body-td border-left border-bottom" @click="handlerCellClick($event, index, i)">
            <div class="table-body-cell" :class="[moneyIndexs.includes(i) ? 'money_unit' : '']">
              <input v-if="cellClickIndex.row === index && cellClickIndex.col === i" ref="ai-table-body-cell-input"
                     class="table-body-cell-input" :style="getEditStyle()"
                     autofocus type="text" :value="cell" @input="handlerCellInput" @keyup.enter="handlerCellInputEnter">
              <!--              <template v-else>-->
              <!--       金额         -->
              <div v-if="config[i] && config[i].type === TABLE_CELL_TYPE_MAP.MONEY"
                   class="table-body-cell-main--money"
                   :class="[cell.length > 11 ? 'lspace-none' : '', cell.includes('-') ? 'red' : '']">
                {{cell | formateMoney}}
              </div>
              <!--       正常的单元格         -->
              <div v-else class="table-body-cell-main">{{cell}}</div>
              <!--              </template>-->
              <!--       单元格右侧文案         -->
              <div v-if="mouseoverIndex === index && config[i].tip"
                   class="table-body-cell-tip">{{config[i].tip}}
              </div>
            </div>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr class="table-body-tr-summary">
          <td colspan="1" rowspan="1" class="table-body-operation"></td>
          <td v-for="(item, i) in tableFooter" :key="i" class="table-body-td" :class="[item ? 'border-left border-bottom': 'border-bottom']">
            <div class="table-body-cell" :class="[((item && item.type) === TABLE_CELL_TYPE_MAP.MONEY) ? 'money_unit' : '']">
              <div v-if="item && item.value && (item.type === TABLE_CELL_TYPE_MAP.MONEY)"
                   class="table-body-cell-main--money"
                   :class="[item.value.length > 11 ? 'lspace-none' : '', item.value.includes('-') ? 'red' : '']">
                {{item.value | formateMoney}}
              </div>
              <!--       正常的单元格         -->
              <div v-else class="table-body-cell-main">{{(item && item.value) ? item.value : ''}}</div>
            </div>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
    <Select v-if="showSelect" :select-style="selectStyle"/>
  </div>
</template>

<script>
import {isArray} from "../utils/dataType";
import Thead from "./Thead";
import Select from "./Select";
import {MONEY_UNIT_LIST, TABLE_CELL_TYPE_MAP, TABLE_ROW_DATA} from "../constant";
import {getStyle} from "../utils";

export default {
  name: "Table",
  components: {
    Thead,
    Select
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      },
      validator: (value) => {
        // 是否满足条件
        let isMeetConditions = false
        // 是否是正确的config配置
        let isRightConfig = isArray(value.config) && value.config.length > 0
        // 是否是正确的data配置
        let isRightData = isArray(value.data)
        // 还要验证config和data的结构是否正确
        if (isRightConfig && isRightData) {
          isMeetConditions = true
        }
        return isMeetConditions
      }
    }
  },
  data() {
    return {
      TABLE_CELL_TYPE_MAP,
      MONEY_UNIT_LIST,
      // 默认cell宽度
      defaultWidth: '150px',
      defaultFontSize: '22px',
      mouseoverIndex: -1,
      cellClickIndex: {
        row: -1,
        col: -1
      },
      moneyColorStyle: {},
      selectStyle: {},
      showSelect: false,
      tableData: [],
      tableFooter: [],
      tableFooterProps: []
    }
  },
  computed: {
    // 配置
    config() {
      return this.options.config
    },
    summary() {
      return this.options.summary
    },
    tableHeadProp() {
      const props = {}
      for (const ele of this.options.config) {
        props[ele.prop] = ele.prop
      }
      return props
    },
    moneyIndexs() {
      const indexs = []
      this.options.config.forEach((item, index) => {
        if (item.type === TABLE_CELL_TYPE_MAP.MONEY) {
          indexs.push(index)
        }
      })
      return indexs
    },
  },
  watch: {
    tableData: {
      handler(val) {

      },
      deep: true
    }
  },
  filters: {
    formateMoney(money) {
      let times = Math.pow(10, 2)
      money = money / 1
      let res = 0
      if (isNaN(money)) {
        res = '0.00'
      } else {
        res = Math.round(money * times) / times + ''
      }
      res = res.replace('.', '')
      if (res.includes('-')) {
        // this.moneyColorStyle = { color: 'red' }
        res = res.replace('-', '')
      }
      if (res !== '0') {
        return res
      }
    }
  },
  created() {
  },
  mounted() {
    this.tableData = this.getTableData()
    this.tableFooter = this.getTableFooter()
  },
  methods: {
    calcSummaryData() {
      this.tableData.forEach(row => {
        this.tableFooter.forEach(value => {
          if (value.calc) {
            console.log(value)
            // this.$set(value, 'value', Number(row[value.prop]))
          }
        })
      })
    },
    getTableFooter() {
      const final = []
      for (const summaryKey in this.summary) {
        if (summaryKey === 'title') {
          final.push({
            prop: summaryKey,
            value: this.summary[summaryKey],
            type: this.summary[summaryKey].type,
          })
        } else if (summaryKey === 'value') {
          if (isArray(this.summary[summaryKey])) {
            this.summary[summaryKey].forEach(item => {
              this.tableFooterProps.push(item.prop)
              let propIndexInConfig = this.config.findIndex(value => value.prop === item.prop)
              final[propIndexInConfig] = {
                prop: item.prop,
                value: item.value ? item.value : '',
                type: item.type,
                calc: true
              }
            })
          } else {
            throw Error('summary.value should be array')
          }
        }
      }
      return final
    },
    handlerCellInputEnter() {
      this.cellClickIndex = {
        row: -1,
        col: -1,
      }
      this.calcSummaryData()
    },
    isNumber(value) {
      return /^[1-9]\d*$/.test(value)
    },
    handlerCellInput({target}) {
      let value = target.value
      const {row, col} = this.cellClickIndex
      if (this.config[this.cellClickIndex.col].type === this.TABLE_CELL_TYPE_MAP.MONEY && !this.isNumber(value)) {
        let final = ''
        if (value.charAt(0) === '-') {
          final += '-'
        }
        for (let i = 0; i < value.length; i++) {
          let v = value.charAt(i)
          if (!Number.isNaN(v / 1)) {
            final += v
          }
        }
        value = final
      }
      let item = this.config[col]
      this.$set(this.tableData[row], item.prop, value)
    },
    getEditStyle() {
      let item = this.config[this.cellClickIndex.col]
      const style = {}
      if (item.canEdit) {
        style.textAlign = item.editPosition
        style.fontSize = item.editSize
      }
      return style
    },
    handlerCellClick(e, row, col) {
      // console.log(e.target.getBoundingClientRect())
      const {top, left} = e.target.getBoundingClientRect()
      const elLeft = getStyle(e.target, 'left')
      this.selectStyle = {
        left: left - parseInt(elLeft) + 'px',
        top: top + 'px',
        width: e.target.offsetWidth + 'px',
      }
      if (this.config[col].canEdit) {
        this.cellClickIndex = {
          row,
          col
        }
        this.$nextTick(() => {
          this.$refs['ai-table-body-cell-input'][0].focus()
        })
        this.showSelect = !!(this.config[col] && this.config[col].canSelect);
      }
      this.$emit('cell-click', {row, column: col, cell: this.tableData[row], value: this.tableData[row][this.config[col].prop], event: e})
    },
    getTableData() {
      const initRows = this.options.initRows
      let data = []
      if (this.options.data.length < initRows) {
        for (let i = 0; i < initRows; i++) {
          if (this.options.data[i] && Object.keys(this.options.data[i]).length > 0) {
            data.push(this.options.data[i])
          } else {
            data.push(this.getInitObject())
          }
        }
      } else {
        data = this.options.data
      }
      return data
    },
    handlerRowAdd(index) {
      this.tableData.splice(index, 0, this.getInitObject())
    },
    handlerRowDel(index) {
      this.tableData.splice(index, 1)
    },
    getInitObject() {
      const final = {}
      for (const item of this.config) {
        final[item.prop] = ''
      }
      return final
    },
    handlerMouseOver(index) {
      this.mouseoverIndex = index
    },
    transformToArray(object) {
      let final = []
      for (const objectKey in object) {
        if (this.tableHeadProp[objectKey]) {
          final.push(object[objectKey])
        }
      }
      return final
    },
    /**
     * col 的宽度
     * @param item
     * @returns {{}}
     */
    setColStyle(item) {
      const style = {}
      if (item.width) {
        style.width = item.width
      } else {
        style.width = this.defaultWidth
      }
      return style
    },
    /**
     * 设置 表头的 cell
     * @param item
     * @returns {{}}
     */
    setHeaderCellStyle(item) {
      const style = {}
      const {fontSize} = item
      if (fontSize) {
        style.fontSize = fontSize
      } else if (this.options.fontSize) {
        style.fontSize = this.options.fontSize
      } else {
        style.fontSize = this.defaultFontSize
      }
      return style
    },
  }
  ,
}
</script>
<style scoped lang="scss">
.ai-table-wrapper {
  position: relative;
  display: table;

  .ai-table-header {
    .ai-table-header-body {
      //border-bottom: 1px solid #333;
      border-right: 1px solid #333;
    }

    .table-header-cell {
      position: relative;
      word-wrap: normal;
      vertical-align: middle;
      width: 100%;
      font-size: 16px;
    }
  }

  .money_unit {
    background: url("../assets/money_rp.png") repeat-y;
    font-size: 14px;
    font-weight: normal;
    height: 22px;
    line-height: 22px;
    text-align: right;
    min-width: 220px;
    box-sizing: border-box;

    .money_unit_item {
      float: left;
      display: inline;
      width: 19px;
      height: 100%;
      margin-right: 1px;
      background-color: #fff;
    }
  }

  .table-body-operation {
    background: #fff;
  }

  .table-body-tr:hover {
    background-color: #eeeeee;
  }

  .ai-table-left {
    width: 30px;
  }

  .operation {
    .icon {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }

  .table-body-cell {
    position: relative;
    word-wrap: normal;
    vertical-align: middle;
    width: 100%;
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    //padding: 4px;

    .table-body-cell-input {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
      width: 100%;
      height: 100%;
      //height: 60px;
      line-height: 60px;
      outline: none;
      border: 1px solid #42b983;
      box-sizing: border-box;
      font-size: 14px;
      color: #2E3033;
      font-weight: normal;
    }

    .table-body-cell-main {
      position: relative;
      text-align: left;
      box-sizing: border-box;
      font-size: 14px;
      color: #2E3033;
      font-weight: normal;
      padding: 1px 3px;
      padding-right: 30px;
    }

    .table-body-cell-main--money {
      overflow: hidden;
      font-weight: bold;
      font-size: 15px;
      letter-spacing: 11px;
      position: relative;
      right: -4px;
      text-align: right;
      box-sizing: border-box;
    }

    .lspace-none {
      letter-spacing: 0;
      right: 5px;
    }

    .table-body-cell-tip {
      position: absolute;
      right: 12px;
      top: 0px;
      z-index: 9999;
      font-size: 12px;
      color: #777;
      cursor: pointer;
      user-select: none;

      &:hover {
        color: #333;
        text-decoration: underline;
      }
    }
  }

  .border-top-left {
    border-top: 1px solid #333;
    border-left: 1px solid #333;
  }

  .border-bottom-right {
    border-bottom: 1px solid #333;
    border-right: 1px solid #333;
  }

  .border-top {
    border-top: 1px solid #333;
  }

  .border-left {
    border-left: 1px solid #333;
  }

  .border-bottom {
    border-bottom: 1px solid #333;
  }

  .pr30 {
    padding-right: 30px;
  }

  .red {
    color: red;
  }
}

</style>
