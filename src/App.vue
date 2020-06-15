<template>
  <div id="app">
    <div class="options">
      <label
        for="duration"
        class="duration"
      >Duration</label>
      <input
        id="duration"
        v-model="duration"
        type="number"
        name="duration"
      >
      <div class="flex">
        <label
          for="duration"
          class="duration"
        >Keep at center</label>
        <input
          id="duration"
          v-model="keepAtCenter"
          type="checkbox"
          name="keepAtCenter"
        >
      </div>
    </div>

    <Map
      :duration="durationInteger"
      :keep-at-center="keepAtCenter"
    />
  </div>
</template>

<script>
  import Map from './Map'

  export default {
    name: 'App',
    components: {
      Map
    },
    data() {
      return {
        duration: 2000,
        keepAtCenter: false
      }
    },
    computed: {
      durationInteger () {
        return parseInt(this.duration)
      }
    }
  }
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
}

label {
  margin-top: 20px;
  margin-bottom: 10px;
}

.options {
  padding: 20px;
  min-width: 300px;
  box-shadow: 2px 5px 8px rgba(0,0,0, .1);

  display: flex;
  flex-direction: column;
  z-index: 9999;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  z-index: 2000;
}

</style>