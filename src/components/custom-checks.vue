<!-- —————————————↓SCSS———————分界线————————————————————————— -->
<style lang="scss">
.custom-checks {
  overflow: hidden;
  .check-item {
    margin: 10px;
    padding-left: 10px;
    cursor: pointer;
    border: 1px solid transparent;

    &.checked {
      border-radius: 4px;
      border: 1px solid green;
    }
  }
}
</style>

<!-- —————————————↓HTML————————分界线———————————————————————— -->
<template lang="pug">
.custom-checks(data-type="custom")
  h4.question {{question}}
  .checks-container
    .check-item(
      v-for="(v,i) in innerData",
      :class="{checked:v.checked}",
      @click="checkFn($event,i)"
      ) {{v.text}}

</template>

<!-- ——————————————↓JS—————————分界线———————————————————————— -->
<script>

export default {
  name: 'custom-checks',
  props: {
    data: {
      type: Array,
      default: [{ text: 'text', value: 'value' }]
    },
    scope: String,
    name: String,
    question:String
  },
  data() {
    return {
      msg: 'this is from custom-checks.vue',
      innerData: this.data.map(v => {
        v.checked = false
        return v
      }),
    }
  },
  computed: {
    value() {
      var value = []
      this.innerData.forEach(v => {
        if (v.checked) {
          value.push(v.value ? v.value : v.text)
        }
      })
      return value
    }
  },
  methods: {
    checkFn(e, i) {
      this.innerData[i].checked = !this.innerData[i].checked
      this.$el.value = this.value
    },
    bindEvent(validate) {
      this.$el.onclick = ()=> {
        // console.log(this.$el.binding)
        validate(this.$el, this.$el.value)
      }
    },
    reset() {
      this.$el.value = []
      this.innerData = this.data.map(v => {
        v.checked = false
        return v
      })
    },
    getValue() {
      return this.$el.value
    }
  },
  mounted() {
    this.$el.bindEvent = this.bindEvent
    this.$el.reset = this.reset
    this.$el.getValue = this.getValue
  }
}
</script>
