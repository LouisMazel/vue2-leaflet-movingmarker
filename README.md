# vue2-leaflet-movingmarker

This is a [movingmarker plugin](https://gitlab.com/IvanSanchez/Leaflet.Marker.SlideTo) extension for [vue2-leaflet package](https://github.com/KoRiGaN/Vue2Leaflet)

## Install
```bash
npm install --save vue2-leaflet-movingmarker
```

## Demo

[Enjoy here](https://louismazel.github.io/vue2-leaflet-movingmarker/)
You can see the demo code in the file [Map.vue](./src/Map/index.vue)

## Usage

### on &lt;template&gt; add

something like this
```html
<l-map :zoom=10 :center="initialLocation">
  <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
  <l-moving-marker
      v-for="driver in drivers"
      :key="driver.uuid"
      v-if="driver.location"
      :lat-lng="getLocation(driver)"
      :icon="getIcon(driver.uuid)"
      @click="setCurrentDriver(driver)"
      ref="driverMarker"
      :duration="2000"
  />
</l-map>
```
### on &lt;script&gt; add

#### option 1

In the same template file, at `<script>` part, this will make the component available only to the template in this file

```js
import LMovingMarker from 'vue2-leaflet-movingmarker'
...
export default {
  ...
  components: {
    LMovingMarker
    ...
  },
  ...
}
```
#### option 2

At main Vue configuration, this will make the component available to all templates in your app
```js
import Vue from 'vue'
import LMovingMarker from 'vue2-leaflet-movingmarker'
...
Vue.component('l-moving-marker', LMovingMarker)
```

## Access movingmarker layer directly

If you need to access other movingmarker methods, like [slideTo()](https://gitlab.com/movingmarker/Leaflet.Marker.SlideTo), you can do it with a ref on the movingmarker vue element and using the `mapObject` property

```html
...
<l-moving-marker ref="movingMarkerRef">
  ...
</l-moving-marker>
...
```
```js
...
this.$refs.movingMarkerRef.mapObject.slideTo()
...
```


## Develop and build

    npm install
    npm run build

## Author

[Mazuel Loïc](https://github.com/LouisMazel)

## License

MIT
