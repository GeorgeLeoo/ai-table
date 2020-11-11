<template>
  <div class="ai-select" :style="postion">
    <div>
      <input type="text">
    </div>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Select",
  components: {},
  props: {
    postion: {
      type: Object,
      defaut: () => {
        return {}
      }
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

<style scoped lang="scss">
.ai-select {
  position: absolute;
  z-index: 99999;
  border: 1px solid #42b983;
  background: #fff;
}
</style>
