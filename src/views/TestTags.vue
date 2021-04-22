<template>
  <div class="test">
    <h2>Select a Location to Search</h2>

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
      <div v-for="tag in tags" :key="tag">
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
        </div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      experiences: [],
      location: "",
      tags: [],
      selectedTags: [],
    };
  },
  computed: {
    filteredByTag() {
      return this.getByTag(this.experiences, this.selectedTags);
    },
  },
  created: function () {
    this.indexExperiences();
    this.indexTags();
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
    getByTag: function (experiences, selectedTags) {
      if (selectedTags.length === 0) {
        return experiences;
      }
      selectedTags.forEach((tag) => {
        experiences = this.filterBy(experiences, tag.name);
      });
      return experiences;
    },
    filterByLocation: function () {
      return this.experiences.filter((experience) => !experience.location.indexOf(this.location));
    },
  },
};
</script>
