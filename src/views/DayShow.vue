<template>
  <div class="day-show">
    <div class="container">
      <div class="top-padding">
        <div id="oval">
          <h1>{{ date }}</h1>
        </div>
      </div>
      <div class="item-container" v-for="(experience, index) in experiences" v-bind:key="index">
        <div class="filter">
          <div id="list-item-container">
            <div>
              <h2>{{ experience.name }}</h2>
              <img v-bind:src="experience.image_url" v-bind:alt="experience.name" class="TextWrap" />
              <p>
                Where?
                <br />
                <span style="font-weight: bold">{{ experience.location }} District</span>
              </p>
              <p>
                How Long?
                <br />
                <span style="font-weight: bold">{{ experience.length }}</span>
              </p>
              <p>
                Best Time to Visit?
                <br />
                <span style="font-weight: bold">{{ experience.time }}</span>
              </p>
              <p>
                Important Information:
                <br />
                <span style="font-weight: bold">{{ experience.info }}</span>
              </p>
              <p>
                <span style="font-weight: bold">{{ experience.description }}</span>
              </p>
            </div>
          </div>

          <!-- <button v-on:click="destroyListItem(experience)">Remove Experience</button> -->
          <hr />
          <div v-if="drivingTimes[index] != null" class="text">
            Approximate driving time between {{ experiences[index].name }} and {{ experiences[index + 1].name }} is
            {{ drivingTimes[index] }} minutes
            <hr />
          </div>
        </div>
      </div>
      <div class="time-tracker-container">
        <h2>Time Tracker</h2>
        <div id="map"></div>
        <div class="time-tracker">
          <div id="time">
            <form v-on:submit.prevent="getCoordinates(string)">
              <label>enter your starting address</label>
              <input type="text" placeholder="Hotel Address?" />
              <input type="submit" class="btn-primary" />
            </form>
            {{ hotel_coordinates }}

            <label>enter your ending address</label>
            <input type="text" placeholder="Hotel Address?" />
            <h3>How long would you like to stay?</h3>
            <!-- <form v-on:submit.prevent="storeTimes(times)"> -->
            <div v-for="experience in experiences" :key="experience.id">
              <label class="time-label">
                {{ experience.name }}
                <br />
                <span style="font-style: italic">(recommended: {{ experience.length }})</span>
              </label>
              <input type="text" placeholder="hours/minutes" />
            </div>
            <input type="submit" class="btn-primary" />
            <!-- </form> -->
          </div>
          <div id="time">
            <h3>Approximate Driving Times</h3>
            <p v-for="(time, index) in drivingTimes" :key="index">
              Driving time between {{ experiences[index].name }} and {{ experiences[index + 1].name }} is
              {{ drivingTimes[index] }} minutes
            </p>
          </div>
        </div>
        <h3>Total Time:</h3>
      </div>
      <router-link to="/calendar">
        <button ref="button" class="bg-info" v-on:click="removeDate(date)">Return to Calendar</button>
      </router-link>
    </div>
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
      hotel_coordinates: [],
      input_times: [],
      string: localStorage.getItem("address"),
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
    getCoordinates: function () {
      var string = "11-3815 5th St Volcano Hi 96785";
      var url = encodeURIComponent(string);
      // console.log(hotel_coordinates);
      axios
        .get(
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            `${url}` +
            ".json" +
            "?access_token=" +
            `${mapboxgl.accessToken}` +
            "&limit=1"
        )
        .then((response) => {
          this.hotel_coordinates.push(response.data);
        });
      var parsedyourElement = JSON.parse(JSON.stringify(this.hotel_coordinates));
      console.log(parsedyourElement);
      return this.hotel_coordinates;
      // console.log(url);
      // console.log(this.hotel_coordinates);
    },
  },
};
</script>

<style scoped>
h1 {
  color: rgb(254, 207, 52);
  text-shadow: 1px 0px 2px black;
  text-align: center;
}

h2 {
  text-align: center;
  padding: 5% 0;
}
h3 {
  text-align: center;
  padding: 5% 0;
}

p {
  color: gray;
}

input[type="submit"] {
  display: block;
  margin-top: 8%;
  margin-left: auto;
  margin-right: auto;
}

#oval {
  width: 40%;
  height: auto;
  background: #fff;
  border-radius: 300px / 150px;
  box-shadow: 1px 1px 4px gray;
  margin-left: auto;
  margin-right: auto;
}
.TextWrap {
  float: right;
  margin: 2%;
}

.day-show {
  background-image: url("../assets/pineapplewallpaper3.jpg");
  padding-bottom: 10%;
  padding-top: 10%;
}

#list-item-container {
  justify-content: center;
  margin: 5%;
  background: white;
  padding: 5%;
  box-shadow: 1px 1px 4px gray;
  height: auto;
}

.text {
  font-size: 0.8rem;
  color: rgb(145, 144, 144);
  text-align: center;
  background: rgb(255, 255, 255);
  box-shadow: 1px 1px 4px gray;
  margin-left: 5%;
  margin-right: 5%;
  font-style: italic;
  padding-top: 2%;
}

.time-tracker-container {
  background: white;
  margin-left: 5%;
  margin-right: 5%;
  box-shadow: 1px 1px 4px gray;
  margin-bottom: 2%;
}

.time-tracker {
  display: flex;
  gap: 5%;
}

#time {
  padding: 2%;
}

#map {
  margin: 10% auto;
  justify-content: center;
  box-shadow: 1px 1px 4px gray;
}

.time-label {
  margin-top: 10%;
}
</style>
