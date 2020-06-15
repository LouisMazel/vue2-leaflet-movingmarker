<template>
  <div style="display: none;">
    <slot v-if="ready" />
  </div>
</template>

<script>
  import { marker, DomEvent, Icon } from 'leaflet'
  import { findRealParent, propsBinder } from 'vue2-leaflet'
  import 'leaflet.marker.slideto'

  const props = {
    draggable: {
      type: Boolean,
      custom: true,
      default: false
    },
    visible: {
      type: Boolean,
      custom: true,
      default: true
    },
    latLng: {
      type: [Object, Array],
      custom: true
    },
    icon: {
      custom: false,
      default: () => new Icon.Default()
    },
    zIndexOffset: {
      type: Number,
      custom: false
    },
    options: {
      type: Object,
      default: () => ({})
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
    props,
    data() {
      return {
        ready: false
      }
    },
    mounted() {
      const options = this.options
      if (this.icon) {
        options.icon = this.icon
      }
      options.draggable = this.draggable
      this.mapObject = marker(this.latLng, options)
      this.mapObject.on('move', ev => {
        if (Array.isArray(this.latLng)) {
          this.latLng[0] = ev.latlng.lat
          this.latLng[1] = ev.latlng.lng
        } else {
          this.latLng.lat = ev.latlng.lat
          this.latLng.lng = ev.latlng.lng
        }
      })
      DomEvent.on(this.mapObject, this.$listeners)
      propsBinder(this, this.mapObject, props)
      this.ready = true
      this.parentContainer = findRealParent(this.$parent)
      this.parentContainer.addLayer(this, !this.visible)
    },
    beforeDestroy() {
      this.parentContainer.removeLayer(this)
    },
    methods: {
      setDraggable(newVal) {
        if (this.mapObject.dragging) {
          newVal
            ? this.mapObject.dragging.enable()
            : this.mapObject.dragging.disable()
        }
      },
      setVisible(newVal, oldVal) {
        if (newVal === oldVal) return
        if (this.mapObject) {
          if (newVal) {
            this.parentContainer.addLayer(this)
          } else {
            this.parentContainer.removeLayer(this)
          }
        }
      },
      setLatLng(newVal) {
        if (newVal == null) return

        if (this.mapObject) {
          const oldLatLng = this.mapObject.getLatLng()
          const newLatLng = {
            lat: newVal[0] || newVal.lat,
            lng: newVal[1] || newVal.lng
          }
          if (
            newLatLng.lat !== oldLatLng.lat ||
            newLatLng.lng !== oldLatLng.lng
          ) {
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
