<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- MAP -->
    <div id="map" v-for="coordinate in coordinates" v-bind:key="coordinate.id"></div>
  </div>
</template>

<script>
/* global mapboxgl */
export default {
  data: function () {
    return {
      coordinates: [
        [-155.2329, 19.4425],
        [-155.9969, 19.64],
        [-155.0868, 19.7241],
      ],
    };
  },
  mounted: function () {
    this.setUpMap();
  },
  methods: {
    setUpMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-155.2335, 19.4422], // starting position [lng, lat]
        zoom: 7, // starting zoom
      });
      var marker = new mapboxgl.Marker().setLngLat(this.coordinates[0]).addTo(map);
      // console.log(popup);
      console.log(marker);
      // var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 50 })
      //   .setLngLat([-154.9291, 19.3947])
      //   .setHTML("Kahena Beach")
      //   .addTo(map);
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
  width: 300px;
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}
</style>
