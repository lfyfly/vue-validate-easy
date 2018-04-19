<!-- —————————————↓SCSS———————分界线————————————————————————— -->
<style lang="scss">
.code-tab {
  li {
    list-style: none;
  }
  ul,
  li {
    margin: 0;
    padding: 0;
  }
  .nav {
    & > * {
      display: inline-block;
      padding: 4px 10px;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: border-color 0.3s, color 0.3s;
      &.active {
        border-color: green;
        color: green;
      }
    }
  }
}
</style>

<!-- —————————————↓HTML————————分界线———————————————————————— -->
<template lang="pug">
.code-tab
  ul.nav
    li.nav-item(v-for="(v,i) in nav",:class="{active:i==activeIndex}",@click="activeIndex=i") {{v.text?v.text:v.name}}
  .content
    .content-item(v-for="(v,i) in nav",v-show="i==activeIndex")
      slot(:name="v.name")


</template>

<!-- ——————————————↓JS—————————分界线———————————————————————— -->
<script>
//import XXX from './components/XXX'

export default {
  name: "code-tab",
  props: ["nav"], // nav: [{name,text}]
  data() {
    return {
      msg: "this is from code-tab.vue",
      activeIndex: 0
    };
  },
  methods: {
    test(i) {
      alert(i);
    }
  }
};
</script>
