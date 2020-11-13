<template>
  <div ref="ai-table" class="ai-table" :style="tableContainerStyle">
    <!--  表头  -->
    <div class="ai-table_content ai-table_header" :style="tableHeaderStyle">
      <table ref="ai-table-header" class="ai-table_content--body" cellspacing="0" cellpadding="0" border="0"
             :style="tableStyle">
        <thead>
        <tr>
          <td colspan="1" rowspan="1" class="ai-table_operation">
            <div class="operation"></div>
          </td>
          <th v-for="(item, index) in headList" :key="index" class="ai-table-header-th border-top-left border-bottom" :style="item.style">
            <div class="table-header_cell" :style="item.style">
              <span class="ai-table_header_cell--text">{{item.label}}</span>
              <img v-if="item.help && item.help.content" class="icon" src="../assets/add.png" alt=""
                   @mouseenter="handlerHelpMouseOver(item.help)"
                   @mouseleave="handlerHelpMouseOut">
            </div>
            <div v-if="item.isMoney" class="money-unit border-top">
                <span v-for="(unit, unitIndex) in MONEY_UNIT_LIST" :key="unitIndex"
                      class="money-unit_item">{{unit}}</span>
            </div>
          </th>
        </tr>
        </thead>
      </table>
    </div>
    <!--  表体  -->
    <div class="ai-table_content" @mouseleave="handlerMouseOut">
      <table class="ai-table_content--body" cellspacing="0" cellpadding="0" border="0" :style="tableStyle">
        <tbody>
        <tr v-for="(item, index) in tableData" :key="index" class="table-body-tr"
            @mouseover="handlerMouseOver(index)"
        >
          <td colspan="1" rowspan="1" class="ai-table_operation">
            <div class="operation">
              <template v-if="mouseoverIndex === index">
                <img class="icon" src="../assets/add.png" alt="" @click="handlerRowAdd(index)">
                <img class="icon" src="../assets/del.png" alt="" @click="handlerRowDel(index)">
              </template>
            </div>
          </td>
          <td v-for="(cell, i) in transformToArray(item)" :key="i" colspan="1" rowspan="1"
              class="ai-table-header-td border-left border-bottom" :style="headList[i].style"
              :class="[moneyIndexs.includes(i) ? 'money-unit' : '']"
              @click="handlerCellClick($event, index, i)">
            <div class="table-body-cell"
                 :style="headList[i].style">
              <input v-if="cellClickIndex.row === index && cellClickIndex.col === i" ref="ai-table-body-cell-input"
                     class="table-body-cell-input" :class="[(cellClickIndex.row === index && cellClickIndex.col === i) ? 'pr30' : '']" :style="getEditStyle(headList[i].style)"
                     autofocus type="tel" :value="cell" @input="handlerCellInput" @keyup.enter="handlerCellInputEnter">
              <!--       金额         -->
              <div v-if="headList[i] && headList[i].type === TABLE_CELL_TYPE_MAP.MONEY"
                   class="table-body-cell-base table-body-cell-main--money"
                   :class="[cell.length > 11 ? 'lspace-none' : '', cell.includes('-') ? 'red' : '']">
                {{cell | formateMoney}}
              </div>
              <!--       正常的单元格         -->
              <div v-else class="table-body-cell-base table-body-cell-main" :style="headList[i].style">{{cell}}</div>
              <!--       单元格右侧文案         -->
              <div v-if="mouseoverIndex === index && headList[i].tip"
                   class="table-body-cell-tip">
                <span>{{headList[i].tip}}</span>
              </div>
            </div>
            <Select v-if="showSelect" :options="selectOptions" :select-style="selectStyle" @select="handlerSelect"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--  表尾  -->
    <div class="ai-table_content">
      <table class="ai-table_content--body" cellspacing="0" cellpadding="0" border="0" :style="tableStyle">
        <tfoot>
        <tr class="table-body-tr-summary">
          <td colspan="1" rowspan="1" class="ai-table_operation">
            <div class="operation"></div>
          </td>
          <td v-for="(item, i) in tableFooter" :key="i" class="ai-table-header-td"
              :class="[item ? 'border-left border-bottom': 'border-left-white border-bottom']"
              :style="headList[i].style">
            <div class="table-body-cell"
                 :class="[moneyIndexs.includes(i) ? 'money-unit' : '']"
                 :style="headList[i].style">
              <div v-if="item && item.value && (item.type === TABLE_CELL_TYPE_MAP.MONEY)"
                   class="table-body-cell-base table-body-cell-main--money"
                   :class="[item.value.length > 11 ? 'lspace-none' : '', hasMinus(item) ? 'red' : '']">
<!--                (item && item.value && item.value.includes('-')) ? 'red' : ''-->
                {{item.value | formateMoney}}
              </div>
              <!--       正常的单元格         -->
              <div v-else class="table-body-cell-base table-body-cell-main">{{(item && item.value) ? item.value : ''}}</div>
            </div>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
    <!--    <Popover v-if="popOverContent.content" :data="popOverContent"></Popover>-->
  </div>
</template>

<script>
import {isArray} from "../utils/dataType";
import Thead from "./Thead";
import Select from "./Select";
// import Popover from "./Popover";
import {MONEY_UNIT_LIST, TABLE_CELL_TYPE_MAP, TABLE_ROW_DATA} from "../constant";
import {getStyle} from "../utils";

export default {
  name: "Table",
  components: {
    Thead,
    Select,
    // Popover
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
        // 是否是正确的headList配置
        let isRightHeadList = isArray(value.headList) && value.headList.length > 0
        // 是否是正确的data配置
        let isRightData = isArray(value.data)
        // 还要验证headList和data的结构是否正确
        if (isRightHeadList && isRightData) {
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
      defaultWidth: '222px',
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
      tableFooterProps: [],
      popOverContent: '',
    }
  },
  computed: {
    selectOptions() {
      let selectOptions = {}
      if (this.options.select) {
        selectOptions = this.options.select
      }
      return selectOptions
    },
    tableStyle() {
      let sumWidth = 30 + this.headColList.length
      for (const ele of this.headColList) {
        if (ele.width) {
          sumWidth += parseInt(ele.width.replace('px', ''))
        } else {
          sumWidth = parseInt(this.defaultWidth.replace('px', ''))
        }
      }
      return {
        minWidth: sumWidth + 'px'
      }
    },
    /**
     * table 的样式
     */
    tableContainerStyle() {
      const style = {}
      if (this.options.height) {
        style.height = this.options.height
      }
      if (this.options.fixed) {
        style.position = 'sticky'
      }
      return style
    },
    // 表头配置
    headList() {
      const headList = this.options.headList
      const final = []
      for (const item of headList) {
        final.push({
          ...item,
          style: this.setHeaderCellStyle(item),
          isMoney: item.type === TABLE_CELL_TYPE_MAP.MONEY
        })
      }
      return final
    },
    /**
     * 表头col渲染
     */
    headColList() {
      const final = []
      for (const item of this.headList) {
        final.push({
          key: item.prop,
          width: this.setColWidth(item),
          _origin: item
        })
      }
      return final
    },
    /**
     * table 表头 的样式
     */
    tableHeaderStyle() {
      const style = {}
      if (this.options.fixed) {
        style.position = 'sticky'
      }
      return style
    },
    summary() {
      return this.options.summary
    },
    tableHeadProp() {
      const props = {}
      for (const ele of this.options.headList) {
        props[ele.prop] = ele.prop
      }
      return props
    },
    moneyIndexs() {
      const indexs = []
      this.options.headList.forEach((item, index) => {
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
    // this.resize()
    this.addListenerClick()
    this.calcSummaryData()
  },
  methods: {
    handlerSelect(item) {
      let data = this.headList[this.cellClickIndex.col]
      this.$set(this.tableData[this.cellClickIndex.row], data.prop, item.value)
    },
    hasMinus(item) {
      return item && (item.value + '').includes('-')
    },
    addListenerClick() {
      window.addEventListener('click', (e) => {
        const className = e.target.className
        if (!className.includes('table-body-cell-base') && !className.includes('table-body-cell')) {
          this.cellClickIndex = {
            row: -1,
            col: -1,
          }
          this.showSelect = false
        }
      })
    },
    resize() {
      window.addEventListener('resize', () => {
        this.calcRestWidth()
      })
    },
    calcRestWidth() {
      const aiTableEl = this.$refs['ai-table-header']
      let elWidth = aiTableEl.offsetWidth
      let sumWidth = 30
      for (const ele of this.headList) {
        if (ele.width) {
          sumWidth += parseInt(ele.width.replace('px', ''))
        } else if (ele.type === TABLE_CELL_TYPE_MAP.MONEY) {
          sumWidth += 200
        }
      }
      return elWidth - sumWidth
    },
    handlerHelpMouseOut() {
      // this.popOverContent = ''
    },
    handlerHelpMouseOver(help) {
      // this.popOverContent = help
    },
    calcSummaryData() {
      const map = {}
      this.tableFooterProps.forEach(footer => {
        this.tableData.forEach(row => {
          if (map[footer]) {
            map[footer] += Number(row[footer])
          } else {
            map[footer] = Number(row[footer])
          }
        })
      })
      this.tableFooter.forEach(item => {
        for (const key in map) {
          if (item && key === item.prop) {
            this.$set(item, 'value', map[key])
            break
          }
        }
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
              let propIndexInheadList = this.headList.findIndex(value => value.prop === item.prop)
              final[propIndexInheadList] = {
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
      this.showSelect = false
      this.calcSummaryData()
    },
    isNumber(value) {
      return /^[1-9]\d*$/.test(value)
    },
    handlerCellInput({target}) {
      let value = target.value
      const {row, col} = this.cellClickIndex
      if (this.headList[this.cellClickIndex.col].type === this.TABLE_CELL_TYPE_MAP.MONEY && !this.isNumber(value)) {
        let final = ''
        if (value.charAt(0) === '-') {
          final += '-'
        }
        if (value.charAt(0) === '.') {
          final += '.'
        }
        for (let i = 0; i < value.length; i++) {
          let v = value.charAt(i)
          if (!Number.isNaN(v / 1)) {
            final += v
          }
        }
        value = final
      }
      let item = this.headList[col]
      this.$set(this.tableData[row], item.prop, value)
    },
    getEditStyle(s) {
      let item = this.headList[this.cellClickIndex.col]
      const style = {...s}
      if (item.canEdit) {
        style.textAlign = item.editPosition
        style.fontSize = item.editSize
      }
      return style
    },
    handlerCellClick(e, row, col) {
      const className = e.target.className
      console.log(className)
      if (className.includes('ai-custom-el')) {
        return
      }
      const l = this.$refs['ai-table'].getBoundingClientRect()
      const {top, left} = e.target.getBoundingClientRect()
      const elLeft = getStyle(e.target, 'left')
      this.selectStyle = {
        left: left - parseInt(elLeft) + 'px',
        top: top + l.top + 'px',
        width: e.target.offsetWidth + 'px',
      }
      if (this.headList[col].canEdit) {
        this.cellClickIndex = {
          row,
          col
        }
        this.$nextTick(() => {
          this.$refs['ai-table-body-cell-input'][0].focus()
        })
        this.showSelect = !!(this.headList[col] && this.headList[col].canSelect);
      }
      this.$emit('cell-click', {
        row,
        column: col,
        cell: this.tableData[row],
        value: this.tableData[row][this.headList[col].prop],
        event: e
      })
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
      for (const item of this.headList) {
        final[item.prop] = ''
      }
      return final
    },
    handlerMouseOver(index) {
      this.mouseoverIndex = index
    },
    handlerMouseOut(index) {
      this.mouseoverIndex = -1
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
     * @param index
     * @returns {number}
     */
    setColStyle(index) {
      let item = this.headColList[index]
      const style = {}
      if (item.width) {
        style.width = item.width
      } else {
        style.width = this.defaultWidth
      }
      return style
    },
    /**
     * 设置col 的宽度
     * @param item
     * @returns {{}}
     */
    setColWidth(item) {
      let width = ''
      if (item.type === TABLE_CELL_TYPE_MAP.MONEY) {
        // money 类型
        if (!item.width && item.type === TABLE_CELL_TYPE_MAP.MONEY) {
          width = this.defaultWidth
        }
      } else {
        // 其它类型
        if (item.width) {
          width = item.width
        } else {
          // 平分剩余无宽度的
          // width = this.calcColWidth()
          width = this.defaultWidth
        }
      }

      return width
    },
    calcColWidth() {

    },
    /**
     * 设置 表头的 cell
     * @param item
     * @returns {{}}
     */
    setHeaderCellStyle(item) {
      const style = {}
      const {fontSize, width} = item
      if (fontSize) {
        style.fontSize = fontSize
      } else if (this.options.fontSize) {
        style.fontSize = this.options.fontSize
      } else {
        style.fontSize = this.defaultFontSize
      }
      if (item.width) {
        style.width = width
      } else {
        if (item.type === TABLE_CELL_TYPE_MAP.MONEY) {
          style.width = this.defaultWidth
        }
      }
      return style
    },
  }
  ,
}
</script>
<style scoped lang="scss">
.ai-table {
  //position: relative;
  //top: 0;
  height: 500px;
  overflow: auto;
  box-sizing: border-box;

  .ai-table_main {
    position: relative;
    overflow: hidden;
  }

  .ai-table_content {
    background: #ffffff;

    .ai-table_content--body {
      width: 100%;
      border-right: 1px solid #333;
    }

    .table-header_cell {
      position: relative;
      word-wrap: normal;
      vertical-align: middle;
      width: 100%;
      font-size: 16px;

      .ai-table_header_cell--text {
        vertical-align: middle;
      }

      .icon {
        width: 18px;
        height: 18px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }

  .money-unit {
    background: url("../assets/money_rp.png") repeat-y;
    font-size: 0;
    height: 22px;
    line-height: 22px;
    text-align: right;
    box-sizing: border-box;

    .money-unit_item {
      float: left;
      display: inline;
      width: 17px;
      height: 100%;
      margin-right: 3px;
      background-color: #fff;
      font-size: 14px;
      font-weight: normal;
    }
  }

  .ai-table_operation {
    background: #fff;
    width: 30px;

    .operation {
      width: 30px;

      .icon {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
  }

  .table-body-tr:hover {
    background-color: #eeeeee;
  }

  .ai-table_col--operation {
    width: 30px;
  }


  .table-body-cell {
    display: table;
    position: relative;
    word-wrap: normal;
    vertical-align: middle;
    width: 100%;
    font-size: 16px;
    height: 60px;
    box-sizing: border-box;
    //line-height: 60px;
    //padding: 15px 0;

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
      display: table-cell;
      vertical-align: middle;
      height: 100%;
      position: absolute;
      right: 16px;
      //top: 0;
      z-index: 99;
      font-size: 12px;
      color: #777;
      cursor: pointer;
      user-select: none;
      text-align: center;

      &:hover {
        color: #333;
        text-decoration: underline;
      }

      span {
        width: 30px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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

  .border-left-white {
    border-left: 1px solid transparent;
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

  .ai-table_header {
    position: relative;
    top: 0;
    z-index: 999;
  }
  .ai-table-header-th {
    width: 100%;
  }
  .ai-table-header-td {
    width: 100%;
  }
  .table-body-cell-base {
    width: 100%;
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    word-break: break-all;
  }
}

</style>
