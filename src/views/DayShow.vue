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
        <div class="row">
          <div class="col-lg-3 col-sm-6 mb-4" id="time">
            <div class="sm" id="map"></div>
          </div>
          <div class="col-lg-4 col-sm-6 mb-4">
            <h3>Your Info</h3>
            <form class="form-group no-margin" v-on:submit.prevent="updateUser()">
              <div class="form-row">
                <label class="col-form-label">From where will you start?</label>
                <input type="text" placeholder="Hotel Name or Address" v-model="hotel_start" />
              </div>
              <label class="col-form-label">Where are you sleeping?</label>
              <span class="form-row">
                <input type="text" placeholder="Hotel Name or Address" v-model="hotel_end" />
                <button class="btn-info small col-form-label" v-on:click.prevent="autoPopulateHotel()">
                  (Same as Above)
                </button>
              </span>
              <input type="submit" class="btn-primary" />
            </form>
          </div>
          <div class="col-lg-3 col-sm-6 mb-4" id="time">
            <h3>Approximate Driving Times</h3>
            <p v-if="hotel_start !== ''">
              Driving time between {{ hotel_start }} and {{ experiences[index].name }} is
              <span style="font-weight: bold">{{ updatedDrivingTimes[index] }} minutes.</span>
            </p>
            <p v-for="(time, index) in drivingTimes" :key="index">
              {{ experiences[index].name }} to {{ experiences[index + 1].name }} will take
              <span style="font-weight: bold">{{ drivingTimes[index] }} minutes</span>
            </p>
            <p v-if="hotel_end != ''">
              {{ experiences[experiences.length - 1].name }} and {{ hotel_end }} is
              <span style="font-weight: bold">{{ updatedDrivingTimes[updatedDrivingTimes.length - 1] }} minutes.</span>
            </p>
          </div>
          <!-- <h3>How long would you like to stay?</h3>
            <form v-on:submit.prevent="storeTimes(times)">
            <div v-for="experience in experiences" :key="experience.id">
              <label class="time-label">
                {{ experience.name }}
                <br />
                <span style="font-style: italic">(recommended: {{ experience.length }})</span>
              </label>
              <input type="text" placeholder="hours/minutes" />
            </div>
            <input type="submit" class="btn-primary" />
            </form> -->
        </div>
        <div class="no-margin" v-if="totalDrivingTime !== ''">
          <h3 class="no-marg">Total Driving Time: {{ totalDrivingTime }} minutes</h3>
          <p class="text-center" style="font-style: italic">({{ drivingHours }} hours)</p>
        </div>
      </div>
      <router-link to="/calendar">
        <div class="text-center">
          <button ref="button" class="bg-info" v-on:click="removeDate(date)">Return to Calendar</button>
        </div>
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
      updatedDurations: [],
      drivingTimes: [],
      updatedDrivingTimes: [],
      index: 0,
      hotel_start_coords: [],
      hotel_end_coords: [],
      hotel_start_coordinates: [],
      hotel_end_coordinates: [],
      input_times: [],
      hotel_start: "",
      hotel_end: "",
      totalDrivingTime: "",
      drivingHours: "",
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
  mounted: function () {
    this.setUpMap();
    this.getDriveTime();
  },
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
    updateUser: function () {
      console.log("updating user trip info");
      var params = {
        hotel_start: this.hotel_start,
        hotel_end: this.hotel_end,
      };
      // console.log(this.user);
      axios.patch("/api/users/" + this.user_id, params).catch((error) => console.log(error.response));
      this.getCoordinates();
      console.log("whaaaat");
      // this.$router.go();
    },
    getCoordinates: function () {
      var start = this.hotel_start;
      var startingUrl = encodeURIComponent(start);
      var end = this.hotel_end;
      var endingUrl = encodeURIComponent(end);
      // console.log(hotel_coordinates);
      axios
        .get(
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            `${startingUrl}` +
            ".json" +
            "?access_token=" +
            `${mapboxgl.accessToken}` +
            "&limit=1"
        )
        .then((response) => {
          this.hotel_start_coords.push(response.data);
          this.hotel_start_coordinates = this.hotel_start_coords[0].features[0].center;
          axios
            .get(
              "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                `${endingUrl}` +
                ".json" +
                "?access_token=" +
                `${mapboxgl.accessToken}` +
                "&limit=1"
            )
            .then((response) => {
              this.hotel_end_coords.push(response.data);
              this.hotel_end_coordinates = this.hotel_end_coords[0].features[0].center;
              console.log(this.hotel_end_coordinates);
              var newCoordinates = [];
              for (var x = 0; x < this.hotel_start_coordinates.length; x++) {
                newCoordinates.push(String(this.hotel_start_coordinates[x]));
              }
              for (var i = 0; i < this.experiences.length; i++) {
                newCoordinates.push(this.experiences[i].lat, this.experiences[i].lng);
              }
              for (var y = 0; y < this.hotel_end_coordinates.length; y++) {
                newCoordinates.push(String(this.hotel_end_coordinates[y]));
              }
              for (var k = 0, j = 1; j < newCoordinates.length; k = k + 2, j = j + 2) {
                newCoordinates.join(",");
                newCoordinates[k] = newCoordinates[k] + ",";
                newCoordinates[j] = newCoordinates[j] + ";";
              }
              var newCoordinateString = newCoordinates.join("").slice(0, -1);
              if (newCoordinates.length >= 4) {
                axios
                  .get(
                    "https://api.mapbox.com/directions-matrix/v1/mapbox/driving/" +
                      `${newCoordinateString}` +
                      "?access_token=" +
                      `${mapboxgl.accessToken}`
                  )
                  .then((response) => {
                    this.updatedDurations = response.data;
                    var matrix = this.updatedDurations.durations;
                    for (var i = 0, j = 1; j < newCoordinates.length / 2; i++, j++) {
                      this.updatedDrivingTimes.push((matrix[i][j] / 60) | 0);
                    }
                    this.updatedDrivingTimes;
                    console.log(this.updatedDrivingTimes);
                    for (var z = 0, time = 0; z < this.updatedDrivingTimes.length; z++) {
                      time += this.updatedDrivingTimes[z];
                    }
                    this.totalDrivingTime = time;
                    const roundToHundredth = (value) => {
                      return Number(value.toFixed(2));
                    };
                    this.drivingHours = roundToHundredth(time / 60);
                  });
              }
            });
        });

      // mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
    },
    autoPopulateHotel: function () {
      this.hotel_end = this.hotel_start;
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

.no-margin {
  margin: 0 0 0 10% !important;
  padding-right: 10% !important;
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
.no-marg {
  padding: 0% !important;
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

#map {
  margin: 10% auto;
  justify-content: center;
  box-shadow: 1px 1px 4px gray;
}

.time-label {
  margin-top: 10%;
}

.small {
  font-size: 50%;
  margin-left: 2%;
}

.sm {
  margin: 5%;
}
</style>
