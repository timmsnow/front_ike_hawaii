<template>
  <div class="calendar-container">
    <div class="container" v-for="list_item in filterByUser" v-bind:key="list_item.id">
      <div class="row">
        <p>Experience: {{ list_item.experience_info.name }}</p>
      </div>
      <div class="row">
        <p>Recommended Length of Stay: {{ list_item.experience_info.length }}</p>
      </div>
      <div class="row">
        <br />
        <p>Best Time of Day: {{ list_item.experience_info.time }}</p>
      </div>
      <button v-on:click="destroyListItem(list_item)">Remove Experience</button>
      <hr />
    </div>
    <router-link to="/experiences">
      <button class="button">Add another Experience</button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      user: {},
      errors: [],
      user_id: localStorage.getItem("user_id"),
      list_items: [],
      experiences: [],
    };
  },
  created: function () {
    axios.get(`/api/users/${this.user_id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
      console.log(this.user);
    });
    this.indexListItems();
    this.indexExperiences();
  },
  mounted: function () {
    axios.get(`/api/users/${this.user_id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  computed: {
    filterByUser: function () {
      var current_user = localStorage.getItem("user_id");
      return this.list_items.filter((list_item) => list_item.user_id == current_user);
    },
  },
  methods: {
    indexExperiences: function () {
      axios.get("api/experiences").then((response) => {
        this.experiences = response.data;
      });
    },
    indexListItems: function () {
      axios.get("api/list_items").then((response) => {
        this.list_items = response.data;
      });
    },
    destroyListItem: function (list_item) {
      axios.delete("/api/list_items/" + list_item.id).then(() => {
        console.log("destroyed!");
        this.$router.go();
      });
    },
  },
};
</script>
