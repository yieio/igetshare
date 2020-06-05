<template>
  <div id="app">  
    <router-view></router-view>
  </div>
</template>

<script> 
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #2c3e50; 
  
  border-bottom:solid 1px #ededed;
  background-color:#ededed;
  min-height:100%;
}
</style>
