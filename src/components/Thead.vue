<template>
  <div class="ai-table-header">
    <table cellspacing="0" cellpadding="0" border="1">
      <colgroup>
        <col v-for="index in config.length" :key="index" :style="cellStyle">
      </colgroup>
      <thead>
        <tr>
          <th v-for="(item, index) in config" :key="index" colspan="1" rowspan="1">
            <div class="cell">{{item.label}}</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  name: "Thead",
  components: {},
  props: {
    config: {
      type: Array,
      default: () => { return [] }
    },
    cellStyle: {
      type: Object,
      default: () => { return {} }
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  filters: {},
  created() {
  },
  methods: {},
}
</script>

<style>

</style>
