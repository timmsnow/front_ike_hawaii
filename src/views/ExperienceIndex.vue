<template>
  <div class="experience-index">
    <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>
    <h2>Select a Location to Search</h2>
    <select v-model="location">
      <option valeu="Hilo Area">Hilo Area</option>
      <option valeu="Puna">Puna</option>
      <option valeu="Waimea/North Coast">Waimea/North Coast</option>
      <option valeu="Kailua-Kona">Kailua-Kona</option>
      <option valeu="Captain Cook + South">Captain Cook + South</option>
    </select>
    <div class="container">
      <div class="row">
        <div
          class="card"
          style="width: 18rem"
          id="index"
          v-for="experience in filterByLocation"
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
                {{ currentExperience.time }}
              </p>
              <p>
                Important Information:
                {{ currentExperience.info }}
              </p>
              <img v-bind:src="experience.image_url" v-bind:alt="experience.name" />
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
import axios from "axios";

export default {
  data: function () {
    return {
      experiences: [],
      errors: [],
      currentExperience: {},
      location: "",
    };
  },
  created: function () {
    this.indexExperiences();
  },
  computed: {
    filterByLocation: function () {
      return this.experiences.filter((experience) => !experience.location.indexOf(this.location));
    },
  },
  methods: {
    indexExperiences: function () {
      axios.get("api/experiences").then((response) => {
        console.log(response.data);
        this.experiences = response.data;
      });
    },
    showExperience: function (experience) {
      console.log(experience);
      this.currentExperience = experience;
      document.querySelector("#experience-show").showModal();
      localStorage.setItem("experience_id", experience.id) === true;
    },
    createListItem: function () {
      console.log("adding a list item");
      var params = {
        user_id: localStorage.getItem("user_id"),
        experience_id: localStorage.getItem("experience_id"),
      };
      axios
        .post("api/list_items", params)
        .then(() => {
          this.$router.push("/lists/");
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
  max-width: 100%;
}

.card {
  box-shadow: 1px 2px 5px gray;
  margin-bottom: 2%;
}

.card h4 {
  text-align: center;
}
</style>
