<template>
  <div class="home">
    <h1>{{count}}</h1>
    <button @click="handleClick">set count</button>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      count: 0,
    }
  },
  created() {
    this.count = window.count || 0;
  },
  methods: {
    handleClick() {
      window.count = this.count += 1;
    }
  }
}
</script>
