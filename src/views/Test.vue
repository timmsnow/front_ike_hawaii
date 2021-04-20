<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- MAP -->
    <div id="map"></div>
  </div>
</template>

<script>
/* global mapboxgl */
export default {
  mounted: function () {
    this.setUpMap();
  },
  methods: {
    setUpMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-155.2329, 19.4425], // starting position [lng, lat]
        zoom: 8, // starting zoom
      });
      var marker = new mapboxgl.Marker().setLngLat([-154.9291, 19.3947]).addTo(map);
      console.log(popup);
      console.log(marker);
      var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 50 })
        .setLngLat([-87.6298, 41.8781])
        .setHTML("Home of the deep dish!")
        .addTo(map);
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#map {
  height: 300px;
  width: auto;
  border: 1px solid black;
}
</style>
