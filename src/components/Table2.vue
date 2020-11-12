<template>
  <div class="ai-table">
    <TableHead></TableHead>
    <TableBody></TableBody>
    <TableFoot></TableFoot>
  </div>
</template>

<script>
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableFoot from './TableFoot'
import {isArray} from "../utils/dataType";

export default {
  name: "Table",
  components: {
    TableHead,
    TableBody,
    TableFoot,
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
    return {}
  },
  computed: {
    // 配置
    config() {
      return this.options.config
    },
    // table
  },
  watch: {},
  filters: {},
  created() {
  },
  methods: {},
}
</script>

<style scoped>

</style>
