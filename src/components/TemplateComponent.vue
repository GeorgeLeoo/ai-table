<script>
export default {
  name: 'TemplateComponent',
  props: {
    component: {
      type: Function,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {
    generateScopedSlots() {
      const result = {}
      const {slots} = this.data
      for (const slotName in slots) {
        result[slotName] = () => slots[slotName]
      }
      return result
    },
    generateEvents() {
      const result = {}
      const {events} = this.data
      for (const eventName in events) {
        result[eventName] = events[eventName]
      }
      return result
    },
  },
  render (createElement) {
    return createElement(this.component, {
      props: {...this.data.props},
      on: this.generateEvents(),
      scopedSlots: this.generateScopedSlots(),
    })
  }
}
</script>

<style scoped>

</style>
