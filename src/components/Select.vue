<template>
  <div class="ai-custom-el ai-select" :style="selectStyle">
    <!--    <div class="da">-->
    <!--      <input type="text">-->
    <!--    </div>-->
    <ul class="list">
      <li v-for="(item, index) in list" :key="index" class="cell" @click="handlerSelect(item)">{{item.value}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Select",
  components: {},
  props: {
    selectStyle: {
      type: Object,
      defaut: () => {
        return {}
      }
    },
    options: {
      type: Object,
      defaut: () => {
        return {}
      }
    },
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    aiSelectStyle() {
      // let style = {}
      // if (this.options.height) {
      //   style.height = this.options.height
      // }
      // this.style()
      // return style
    }
  },
  watch: {},
  filters: {},
  created() {
  },
  mounted() {
    if (this.options.url && !this.options.list) {

    } else if (!this.options.url && this.options.list) {
      this.list = this.options.list
    } else if (this.options.url && this.options.list) {

    }
  },
  methods: {
    handlerSelect(item) {
      this.$emit('select', item)
    },
  },
}
</script>

<style scoped lang="scss">
.ai-select {
  height: 200px;
  position: absolute;
  z-index: 99999;
  border: 1px solid #42b983;
  background: #fff;
  overflow: auto;

  .list {
    line-height: 30px;
    margin: 0;
    padding: 0;

    .cell {
      text-align: left;
      margin: 0;
      padding: 0 4px;

      &:hover {
        background: #e9e9e9;
      }
    }
  }
}
</style>
