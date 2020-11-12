<template>
<div class="ai-popover" :class="[theme]">
  <p class="ai-popover--content">{{data.content}}</p>
</div>
</template>

<script>
export default {
  name: "Popover",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {return {}}
    },
    theme: {
      type: String,
      default: 'light'
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
.ai-popover {
  width: 200px;
}
.light {
  background: #ffffff;
}

.dark {
  background: #2E3033;
}
</style>
