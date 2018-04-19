<!-- —————————————↓SCSS———————分界线————————————————————————— -->
<style lang="scss">
.my-input {
  margin: 20px 0;
  input{
    height: 36px;
    border: 1px solid #919191;
    padding: 0 16px;
    border-radius: 18px;
    width: 300px;
  }
  .label{
    margin-left: 16px;
    margin-bottom: 2px;
    font-weight: bold;

  }
  &.err__  input{
    border: 1px solid red;
  }
  &.succ__ input {
    border: 1px solid green;
  }
  .err__msg {
    color: red;
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>

<!-- —————————————↓HTML————————分界线———————————————————————— -->
<template lang="pug">
.my-input(data-type="input")
  label
    div.label {{label}}
    div: input(:value="value",:placeholder="placeholder",spellcheck="false",:type="type")

</template>

<!-- ——————————————↓JS—————————分界线———————————————————————— -->
<script>

export default {
  name: 'my-input',
  props: ['value', 'label', 'placeholder','type'],
  data() {
    return {
      msg: 'this is from my-input.vue'
    }
  },
}
</script>
