<template>
  <div id="day-show">
    <h1>{{ date }}</h1>

    <!-- ---MAP VIEW--- -->
    <div id="map"></div>

    <div class="item-container" v-for="(experience, index) in experiences" v-bind:key="index">
      <div class="filter">
        <div id="list-item-container">
          <div>
            <h2>{{ experience.name }}</h2>
            <p>Location: {{ experience.location }}</p>
            <p>Description: {{ experience.description }}</p>
            <p>Recommended Length of Time: {{ experience.length }}</p>
            <p>Best Time to Visit: {{ experience.time }}</p>
            <p>Important Information: {{ experience.info }}</p>
          </div>
          <img v-bind:src="experience.image_url" v-bind:alt="experience.name" />
        </div>

        <!-- <button v-on:click="destroyListItem(experience)">Remove Experience</button> -->
        <hr />
        <div v-if="drivingTimes[index] != null">
          Approximate driving time between {{ experiences[index].name }} and {{ experiences[index + 1].name }} is
          {{ drivingTimes[index] }} minutes
          <hr />
        </div>
      </div>
    </div>
    <h2>Time Tracker</h2>
    <div id="time-tracker">
      <div id="recommended-time">
        <h3>How long would you like to stay?</h3>
        <div v-for="experience in experiences" :key="experience.id">
          <p>
            {{ experience.name }}
            <input type="text" :placeholder="experience.length" />
          </p>
        </div>
      </div>
      <div id="driving-time">
        <h3>Approximate Driving Times</h3>
        <p v-for="(time, index) in drivingTimes" :key="index">
          Driving time between {{ experiences[index].name }} and {{ experiences[index + 1].name }} is
          {{ drivingTimes[index] }} minutes
        </p>
      </div>
    </div>
    <h3>Total Time:</h3>
    <router-link to="/calendar">
      <button class="button" ref="button" v-on:click="removeDate(date)">Return to Calendar</button>
    </router-link>
  </div>
</template>

<script>
/* global mapboxgl */

import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      errors: [],
      user_id: localStorage.getItem("user_id"),
      date: localStorage.getItem("date"),
      list_items: [],
      experiences: [],
      durations: [],
      drivingTimes: [],
      index: 0,
    };
  },
  created: function () {
    axios.get("api/list_items").then((response) => {
      this.list_items = response.data;
      var currentDate = localStorage.getItem("date");
      var currentUser = localStorage.getItem("user_id");
      this.list_items.map((item) => {
        if (item.date == currentDate && item.user_id == currentUser) {
          this.experiences.push(item.experience_info);
        }
      });
      this.setUpMap();
    });
  },
  computed: {},
  methods: {
    removeDate: function () {
      localStorage.removeItem("date");
    },
    setUpMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-155.5765, 19.5364], // starting position [lng, lat]
        zoom: 6.8, // starting zoom
      });
      for (var i = 0; i < this.experiences.length; i++) {
        var marker = new mapboxgl.Marker().setLngLat([this.experiences[i].lat, this.experiences[i].lng]).addTo(map);
        console.log(marker);
        console.log(popup);
        var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 35 })
          .setLngLat([this.experiences[i].lat, this.experiences[i].lng])
          .setHTML(this.experiences[i].name)
          .addTo(map);
      }
      // console.log(map);
      this.getDriveTime();
    },
    getDriveTime: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var coordinates = [];
      for (var i = 0; i < this.experiences.length; i++) {
        coordinates.push(this.experiences[i].lat, this.experiences[i].lng);
      }
      for (var k = 0, j = 1; j < coordinates.length; k = k + 2, j = j + 2) {
        coordinates.join(",");
        coordinates[k] = coordinates[k] + ",";
        coordinates[j] = coordinates[j] + ";";
      }
      var coordinateString = coordinates.join("").slice(0, -1);
      if (coordinates.length >= 4) {
        axios
          .get(
            "https://api.mapbox.com/directions-matrix/v1/mapbox/driving/" +
              `${coordinateString}` +
              "?access_token=" +
              `${mapboxgl.accessToken}`
          )
          .then((response) => {
            this.durations = response.data;
            var matrix = this.durations.durations;
            for (var i = 0, j = 1; j < this.experiences.length; i++, j++) {
              this.drivingTimes.push((matrix[i][j] / 60) | 0);
            }
            this.drivingTimes;
          });
      }
    },
  },
};
</script>

<style scoped>
/* delete this styling (temp fix),  */
.filter {
  margin-left: 10%;
  margin-right: 10%;
}

#list-item-container {
  display: flex;
  gap: 2%;
  justify-content: center;
  margin-top: 5%;
  margin-bottom: 2%;
}

#time-tracker {
  display: flex;
  gap: 5%;
  margin-left: 5%;
  margin-right: 5%;
}

#map {
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}
</style>
