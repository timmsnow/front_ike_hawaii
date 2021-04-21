<template>
  <div class="experience-index">
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
    <p>Experience in</p>
    <div>
      <select v-model="location">
        <option valeu="Hilo Area">Hilo Area</option>
        <option valeu="Puna">Puna</option>
        <option valeu="Waimea/North Coast">Waimea/North Coast</option>
        <option valeu="Kailua-Kona">Kailua-Kona</option>
        <option valeu="Captain Cook + South">Captain Cook + South</option>
      </select>
    </div>
    <span id="tags">
      <div v-for="tag in tags" :key="tag.id">
        <input type="checkbox" id="toggle" :value="tag" v-model="selectedTags" />
        <label for="tag">{{ tag.name }}</label>
      </div>
    </span>
    <div class="container">
      <div class="row">
        <div
          class="card"
          style="width: 18rem"
          id="index"
          v-for="experience in filterBy(filteredByTag, location)"
          v-bind:key="experience.id"
        >
          <img v-bind:src="experience.image_url" v-bind:alt="experience.name" class="card-img-top" />
          <div class="card-body">
            <h4>{{ experience.name }}</h4>
            <p class="card-text">
              {{ experience.location }}
            </p>
            <button v-on:click="showExperience(experience)">More Info</button>
          </div>
          <dialog id="experience-show">
            <form method="dialog">
              <h1>Name: {{ currentExperience.name }}</h1>
              <p>
                Location on the Island:
                {{ currentExperience.location }}
              </p>
              <p>
                Recommended Length of Stay:
                {{ currentExperience.length }}
              </p>
              <p>
                Important Information:
                {{ currentExperience.info }}
              </p>
              <div id="map"></div>
              <img v-bind:src="currentExperience.image_url" v-bind:alt="experience.name" />
              <br />
              <button>Close</button>
              <button v-on:click="createListItem()">Add to the list</button>
            </form>
          </dialog>
        </div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* global mapboxgl */

import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      experiences: [],
      errors: [],
      currentExperience: {},
      location: "",
      tags: [],
      selectedTags: [],
    };
  },
  created: function () {
    this.indexExperiences();
    this.indexTags();
  },
  computed: {
    filteredByTag() {
      return this.getByTag(this.experiences, this.selectedTags);
    },
    // filterExperiences: function () {
    //   return this.filterByLocation(this.filterByTag(this.experiences));
    // },
  },
  methods: {
    indexExperiences: function () {
      axios.get("api/experiences").then((response) => {
        console.log(response.data);
        this.experiences = response.data;
      });
    },
    indexTags: function () {
      axios.get("api/tags").then((response) => {
        this.tags = response.data;
      });
    },
    filterByLocation: function () {
      return this.experiences.filter((experience) => !experience.location.indexOf(this.location));
    },
    // filterByTag: function () {
    //   console.log(this.tags[3]);
    //   return this.experiences.filter((experience) => !experience.name.indexOf(this.tag));
    // },
    getByTag: function (experiences, selectedTags) {
      if (selectedTags.length === 0) {
        return experiences;
      }
      selectedTags.forEach((tag) => {
        experiences = this.filterBy(experiences, tag.name);
      });
      return experiences;
    },
    showExperience: function (experience) {
      console.log(experience);
      this.currentExperience = experience;
      document.querySelector("#experience-show").showModal();
      localStorage.setItem("experience_id", experience.id) === true;
      this.setUpMap();
    },
    setUpMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-155.2335, 19.4422], // starting position [lng, lat]
        zoom: 7, // starting zoom
      });
      console.log(map);
      var marker = new mapboxgl.Marker().setLngLat([this.currentExperience.lat, this.currentExperience.lng]).addTo(map);
      console.log(popup);
      console.log(marker);
      var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 35 })
        .setLngLat([this.currentExperience.lat, this.currentExperience.lng])
        .setHTML(this.currentExperience.name)
        .addTo(map);
    },
    createListItem: function () {
      console.log("adding experience as a list item");
      var params = {
        user_id: localStorage.getItem("user_id"),
        experience_id: localStorage.getItem("experience_id"),
        date: localStorage.getItem("date"),
      };
      axios
        .post("/api/list_items", params)
        .then(() => {
          localStorage.removeItem("date");
          localStorage.removeItem("experience_id");
          this.$router.push("/calendar");
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>

<style>
.row {
  gap: 1%;
  display: inline-flex;
}
img {
  max-width: 500px;
}

.card {
  box-shadow: 1px 2px 5px gray;
  margin-bottom: 2%;
}

.card h4 {
  text-align: center;
}

#map {
  height: 300px;
  width: 300px;
}
</style>
