<template>
  <l-map
    :zoom="14"
    :center="initialLocation"
  >
    <l-icon-default />
    <l-tile-layer
      :url="mapData.url"
      :attribution="mapData.attribution"
    />
    <l-moving-marker
      v-for="l in locations"
      :key="l.id"
      :lat-lng="l.latlng"
      :duration="duration"
      :keep-at-center="keepAtCenter"
      :icon="icon"
    >
      <l-popup :content="l.text" />
    </l-moving-marker>
  </l-map>
</template>

<script>
  import L from 'leaflet'
  import { LMap, LTileLayer, LIconDefault, LPopup } from 'vue2-leaflet'
  import LMovingMarker from '../../lib/index.vue'

  function rand(n) {
    const max = n + 0.01
    const min = n - 0.01
    return Math.random() * (max - min) + min
  }

  const locations = []
  for (let i = 0; i < 10; i++) {
    locations.push({
      id: i,
      latlng: L.latLng(rand(48.8929425), rand(2.3821873)),
      text: 'Moving Marker #' + i,
    })
  }

  const icon = L.icon({
    iconUrl:
      'https://s3-eu-west-1.amazonaws.com/ct-documents/emails/A-static.png',
    iconSize: [21, 31],
    iconAnchor: [10.5, 31],
    popupAnchor: [4, -25],
  })

  export default {
    components: {
      LMap,
      LTileLayer,
      LIconDefault,
      LPopup,
      LMovingMarker,
    },
    props: {
      duration: { type: Number, default: 2000 },
      keepAtCenter: { type: Boolean, default: false }
    },
    data () {
      return {
        locations,
        icon,
        initialLocation: L.latLng(48.8929425, 2.3821873),
        mapData: {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
          url:
            'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        },
        interval: null
      }
    },
    watch: {
      duration: {
        handler (value, oldValue) {
          if (value !== oldValue) {
            clearInterval(this.interval)
            const setRandomLatLng = () => {
              this.locations.forEach((location) => {
                location.latlng = L.latLng(rand(48.8929425), rand(2.3821873))
              })
            }
            this.interval = setInterval(() => {
              setRandomLatLng()
            }, value)
            setRandomLatLng()
          }
        },
        immediate: true
      },
    }
  }
</script>

<style>
@import "~leaflet/dist/leaflet.css";
</style>
