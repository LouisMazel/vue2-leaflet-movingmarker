<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
  import L from 'leaflet'
  import 'leaflet.marker.slideto'

  import { findRealParent, propsBinder } from 'vue2-leaflet'

  const props = {
    draggable: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    },
    latLng: {
      type: [Object, Array],
    },
    icon: {
      required: false,
      default: () => new L.Icon.Default()
    },
    zIndexOffset: {
      type: Number
    },
    options: {
      type: Object,
      default: Object
    },
    duration: {
      type: Number,
      required: true
    },
    keepAtCenter: {
      type: Boolean,
      default: false
    }
  }

  export default {
    name: 'LMovingMarker',
    props: props,
    data () {
      return {
        ready: false
      }
    },
    mounted () {
      const options = this.options
      if (this.icon) {
        options.icon = this.icon
      }
      options.draggable = this.draggable
      this.mapObject = L.marker(this.latLng, options)
      this.mapObject.on('move', (ev) => {
        if (Array.isArray(this.latLng)) {
          this.latLng[0] = ev.latlng.lat
          this.latLng[1] = ev.latlng.lng
        } else {
          this.latLng.lat = ev.latlng.lat
          this.latLng.lng = ev.latlng.lng
        }
      })
      L.DomEvent.on(this.mapObject, this.$listeners)
      propsBinder(this, this.mapObject, props)
      this.ready = true
      this.parentContainer = findRealParent(this.$parent)
      this.parentContainer.addLayer(this, !this.visible)
    },
    beforeDestroy () {
      this.parentContainer.removeLayer(this)
    },
    methods: {
      setDraggable (newVal) {
        if (this.mapObject.dragging) {
          newVal ? this.mapObject.dragging.enable() : this.mapObject.dragging.disable()
        }
      },
      setVisible (newVal, oldVal) {
        if (newVal === oldVal) return
        if (this.mapObject) {
          if (newVal) {
            this.parentContainer.addLayer(this)
          } else {
            this.parentContainer.removeLayer(this)
          }
        }
      },
      setLatLng (newVal) {
        if (newVal == null) {
          return
        }

        if (this.mapObject) {
          const oldLatLng = this.mapObject.getLatLng()
          const newLatLng = {
            lat: newVal[0] || newVal.lat,
            lng: newVal[1] || newVal.lng
          }
          if (newLatLng.lat !== oldLatLng.lat || newLatLng.lng !== oldLatLng.lng) {
            this.mapObject.slideTo(newLatLng, {
              duration: this.duration,
              keepAtCenter: this.keepAtCenter
            })
          }
        }
      }
    }
  }
</script>
