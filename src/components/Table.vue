<template>
  <div class="ai-table-wrapper">
    <!--  表头  -->
<!--    <Thead :config="config" :cellStyle="cellStyle"/>-->
    <div class="ai-table-header">
      <table cellspacing="0" cellpadding="0" border="1">
        <colgroup>
          <col v-for="index in config.length" :key="index" :style="cellStyle">
        </colgroup>
        <thead>
          <tr v-for="(ele, index) in final" :key="index">
            <th v-for="(item, index) in ele" :key="index" :colspan="item.colspan" :rowspan="item.rowspan">
              <div class="cell">{{item.label}}</div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <!--  表体  -->
    <div class="ai-table-body">
      <table cellspacing="0" cellpadding="0" border="1">
        <colgroup>
          <col v-for="index in config.length" :key="index" :style="cellStyle">
        </colgroup>
        <tbody>
        <tr>
          <td v-for="(item, index) in tableData" :key="index" colspan="1" rowspan="1">
            <div class="cell">{{item.value}}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {isArray} from "../utils/dataType";
import Thead from "./Thead";
export default {
  name: "Table",
  components: {
    Thead
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
        let isRightData = isArray(value.data) && value.data.length > 0
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
      // 默认cell宽度
      defaultWidth: '150px',
      final: [
        [
          {
            label: '日期',
            rowspan: 3,
            colspan: 1,
          },
          {
            label: '配送信息',
            rowspan: 1,
            colspan: 5,
          },
        ],
        [
          {
            label: '姓名',
            rowspan: 2,
            colspan: 1,
          },
          {
            label: '地址',
            rowspan: 1,
            colspan: 4,
          },
        ],
        [
          {
            label: '省份',
            rowspan: 1,
            colspan: 1,
          },
          {
            label: '市区',
            rowspan: 1,
            colspan: 1,
          },
          {
            label: '地址',
            rowspan: 1,
            colspan: 1,
          },
          {
            label: '邮编',
            rowspan: 1,
            colspan: 1,
          },
        ],
      ]
    }
  },
  computed: {
    // 配置
    config() {
      const thConfig = this.options.config
      for (const configElement of thConfig) {
        if (isArray(configElement.children) && configElement.children.length > 0) {
          thConfig.options = {
            colspan: 1,
            rowspan: 3
          }
        }
      }
      return thConfig
    },
    // 数据源
    tableData() {
      return this.options.data
    },
    // cell样式
    cellStyle() {
      const style = {}
      const config = this.options.config
      if (config.width) {
        style.width = config.width
      } else {
        style.width = this.defaultWidth
      }
      return style
    }
  },
  watch: {},
  filters: {},
  created() {
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.ai-table-wrapper {
  .cell {
    position: relative;
    word-wrap: normal;
    vertical-align: middle;
    width: 100%;
  }
}

</style>
