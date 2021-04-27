<template>
  <div class="experience-index">
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
    <div id="filter-search">
      <img src="../assets/big-island-regional.png" usemap="#big-isle-map" id="image" />
      <map name="big-isle-map">
        <area
          target=""
          id="hamakua"
          shape="poly"
          coords="coords=“95,33,116,48,176,68,159,99,141,112,122,177,108,162,91,150,107,130,111,106,107,102,120,86,119,61,113,56,102,55,103,46,93,44,94,41”"
          @mouseover="hamakuaImage()"
          @mouseout="hawaiiImage()"
          v-on:click="filterByHamakua()"
          alt="hamakua"
          href="#"
        />
        <area
          target=""
          id="kohala"
          shape="poly"
          coords="“53,16,63,15,77,19,86,25,92,32,90,46,101,50,99,55,103,59,112,59,117,64,118,86,105,102,108,107,107,111,106,125,88,144,86,132,64,102,51,94,61,80,65,79,66,68,52,47,50,24,”"
          @mouseover="kohalaImage()"
          @mouseout="hawaiiImage()"
          v-on:click="filterByKohala()"
          alt="kohala"
          href="#"
        />
        <area
          target=""
          id="hilo"
          shape="poly"
          coords="“181,71,220,108,220,135,239,138,185,171,170,168,169,186,151,171,140,168,127,178,140,134,148,129,146,117,154,106,165,105,176,87”"
          @mouseover="hiloImage()"
          @mouseout="hawaiiImage()"
          v-on:click="filterByHilo()"
          alt="hilo"
          value="hilo"
        />
        <area
          target=""
          id="puna"
          shape="poly"
          coords="“244,142,245,157,278,181,277,191,222,230,193,209,193,201,171,180,172,176,190,179”"
          @mouseover="punaImage()"
          @mouseout="hawaiiImage()"
          v-on:click="filterByPuna()"
          alt="puna"
          href="#"
        />
        <area
          target=""
          id="kau"
          shape="poly"
          coords="“214,235,194,239,185,235,122,274,99,314,51,280,89,251,88,237,113,200,107,198,114,182,128,185,140,175,153,178,173,196,179,197,189,204,187,211”"
          @mouseover="kauImage()"
          @mouseout="hawaiiImage()"
          v-on:click="filterByKau()"
          alt="kau"
          href="#"
        />
        <area
          target=""
          id="kona"
          shape="poly"
          coords="“49,99,61,105,82,133,86,148,87,158,100,165,109,179,108,190,102,200,106,203,82,235,83,247,47,276,55,224,32,155,23,150,19,125,37,109,45,109”"
          @mouseover="konaImage()"
          @mouseout="hawaiiImage()"
          v-on:click="filterByKona()"
          alt="kona"
          href="#"
        />
      </map>
      <span id="tags">
        <div v-for="tag in tags" :key="tag.id">
          <input type="checkbox" id="toggle" :value="tag" v-model="selectedTags" />
          <label for="tag">{{ tag.name }}</label>
        </div>
      </span>
    </div>
    <p v-if="location.length > 0">Experiences in {{ location | capitalize }}</p>
    <button v-if="location || selectedTags.length > 0" v-on:click="clearFilter()">Clear Filter</button>
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
                Description:
                {{ currentExperience.description }}
              </p>
              <p>
                Recommended Length of Stay:
                {{ currentExperience.length }}
              </p>
              <p>
                Important Information:
                {{ currentExperience.info }}
              </p>
              <div id="pic-container">
                <div id="map"></div>
                <img v-bind:src="currentExperience.image_url" v-bind:alt="experience.name" />
              </div>
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
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  data: function () {
    return {
      experiences: [],
      errors: [],
      currentExperience: {},
      location: "",
      experiencesByLocation: [],
      tags: [],
      selectedTags: [],
      selectedTagNames: [],
      searchQuery: "",
      kohala: require("../assets/big-island-regional-kohala.png"),
      hamakua: require("../assets/big-island-regional-hamakua.png"),
      hilo: require("../assets/big-island-regional-hilo.png"),
      puna: require("../assets/big-island-regional-puna.png"),
      kau: require("../assets/big-island-regional-kau.png"),
      kona: require("../assets/big-island-regional-kona.png"),
      hawaii: require("../assets/big-island-regional.png"),
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
    filterByHilo: function () {
      console.log(document.querySelector("#hilo").id);
      this.location = document.querySelector("#hilo").id;
    },
    filterByHamakua: function () {
      console.log(document.querySelector("#hamakua").id);
      this.location = document.querySelector("#hamakua").id;
    },
    filterByPuna: function () {
      console.log(document.querySelector("#puna").id);
      this.location = document.querySelector("#puna").id;
    },
    filterByKau: function () {
      console.log(document.querySelector("#kau").id.substring(0, 2) + "ʻū");
      this.location = document.querySelector("#kau").id.substring(0, 2) + "ʻū";
    },
    filterByKona: function () {
      console.log(document.querySelector("#kona").id);
      this.location = document.querySelector("#kona").id;
    },
    filterByKohala: function () {
      console.log(document.querySelector("#kohala").id);
      this.location = document.querySelector("#kohala").id;
    },
    clearFilter: function () {
      this.location = "";
      this.selectedTags = [];
    },
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
        center: [-155.5765, 19.5364], // starting position [lng, lat]
        zoom: 6.8, // starting zoom
      });
      console.log(map);
      var marker = new mapboxgl.Marker().setLngLat([this.currentExperience.lat, this.currentExperience.lng]).addTo(map);
      // console.log(popup);
      console.log(marker);
      // var popup = new mapboxgl.Popup({ closeOnClick: false, offset: 35 })
      //   .setLngLat([this.currentExperience.lat, this.currentExperience.lng])
      //   .setHTML(this.currentExperience.name)
      //   .addTo(map);
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
    kohalaImage: function () {
      document.querySelector("#image").src = this.kohala;
    },
    hamakuaImage: function () {
      document.querySelector("#image").src = this.hamakua;
    },
    hiloImage: function () {
      document.querySelector("#image").src = this.hilo;
    },
    punaImage: function () {
      document.querySelector("#image").src = this.puna;
    },
    kauImage: function () {
      document.querySelector("#image").src = this.kau;
    },
    konaImage: function () {
      document.querySelector("#image").src = this.kona;
    },
    hawaiiImage: function () {
      document.querySelector("#image").src = this.hawaii;
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
  max-width: 300px;
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

#experience-show {
  margin-left: 10%;
  margin-right: 10%;
}

#pic-container {
  display: flex;
  gap: 2%;
  justify-content: center;
}

#filter-search {
  display: flex;
  gap: 2%;
  justify-content: center;
}

#tags {
  gap: 1%;
  margin-top: 2%;
  margin-bottom: 2%;
}

image {
  width: 300px;
}
/* polygon.hoverable {
  fill: transparent;
  stroke: none;
  stroke-width: 3;
  cursor: pointer;
}

polygon.hoverable:hover {
  stroke: white;
  filter: url(#f2);
} */
</style>
