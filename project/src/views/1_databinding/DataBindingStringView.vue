<template>
  <div>
    <h1>Hello {{ userName }}</h1>
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: 'Noah',
      message: 'Welcome SME Bootcamp',
      arr: [],
      obj: {}
    }
  }
}
</script>
