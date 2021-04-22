<template>
  <div id="day-show">
    <h1>{{ date }}</h1>
    <div id="map"></div>

    <!-- ---MAP VIEW--- -->
    <div class="item-container" v-for="list_item in filterByUserAndDate" v-bind:key="list_item.id">
      <div class="filter" v-if="list_item.date == date">
        <div id="list-item-container">
          <div>
            <h2>Experience: {{ list_item.experience_info.name }}</h2>
            <p>Location: {{ list_item.experience_info.location }}</p>
            <p>Description: {{ list_item.experience_info.description }}</p>
            <p>Recommended Length of Time: {{ list_item.experience_info.length }}</p>
            <p>Best Time to Visit: {{ list_item.experience_info.time }}</p>
            <p>Important Information: {{ list_item.experience_info.info }}</p>
            <!-- <p>
              Relevant Links:
              <a href="https://umaumaexperience.com/">{{ list_item.experience_info.links }}</a>
            </p> -->
          </div>
          <img v-bind:src="list_item.experience_info.image_url" v-bind:alt="list_item.name" />
        </div>

        <!-- <button v-on:click="destroyListItem(list_item)">Remove Experience</button> -->
        <hr />

        <!-- DRIVING TIME -->
        <hr />
      </div>
    </div>
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
    };
  },
  created: function () {
    axios.get(`/api/users/${this.user_id}`).then((response) => {
      this.user = response.data;
    });
    this.indexListItems();
  },
  computed: {
    filterByUserAndDate: function () {
      var current_user = localStorage.getItem("user_id");
      //add logic to filter by date?
      return this.list_items.filter((list_item) => list_item.user_id == current_user);
    },
  },
  methods: {
    indexListItems: function () {
      axios.get("api/list_items").then((response) => {
        this.list_items = response.data;
        var currentDate = localStorage.getItem("date");
        this.list_items.map((item) => {
          if (item.date == currentDate) {
            this.experiences.push(item.experience_info);
          }
        });
        this.setUpMap();
        // var current = this.list_items.where(this.list_items.date === localStorage.getItem("date"));
        console.log(this.experiences);
      });
    },
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
      console.log(this.experiences.length);
      for (var i = 0; i < this.experiences.length; i++) {
        var marker = new mapboxgl.Marker().setLngLat([this.experiences[i].lat, this.experiences[i].lng]).addTo(map);
        console.log(marker);
        console.log(popup);
        var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 35 })
          .setLngLat([this.experiences[i].lat, this.experiences[i].lng])
          .setHTML(this.experiences[i].name)
          .addTo(map);
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

#map {
  margin-left: auto;
  margin-right: auto;
}
</style>
