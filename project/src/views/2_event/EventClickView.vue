<template>
  <div>
    <button @click="increseCounter">Add 1</button>
    <p>{{ counter }}</p>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      counter: 0
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {
    increseCounter() {
      this.counter += 1
    }
  }
}
</script>
