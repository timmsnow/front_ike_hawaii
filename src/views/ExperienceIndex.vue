<template>
  <div class="experience-index">
  <ul>
      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
    </ul>

    <div class="container">
      <div class="row">
        <div class="card" style="width: 18rem" id="index" v-for="experience in experiences" v-bind:key="experience.id">
          <img v-bind:src="experience.image_url" v-bind:alt="experience.name" class="card-img-top" />
          <div class="card-body">
            <router-link v-bind:to="`/experiences/${experience.id}`">
              <h4>{{ experience.name }}</h4>
            </router-link>
            <p class="card-text">
              {{ experience.location }}
            </p>
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

export default {
  data: function () {
    return {
      experiences: [],
      errors: [],
    };
  },
  created: function () {
    this.indexExperiences();
  },
  methods: {
    indexExperiences: function () {
      axios.get("api/experiences").then((response) => {
        console.log(response.data);
        this.experiences = response.data;
      });
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


