<template>
  <div id="app">
    <header>
      <span>MeetVp - Your Meetup Manager</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
  header {
        display: none;
    }
  body {
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  main {
    text-align: center;
    margin-top: 40px;
  }
</style>
