<template>
  <div class="list-index">
    <h1>Your Trip Calendar</h1>
    <div class="slider">
      <div class="full hide-scroll">
        <ul class="hs">
          <li class="item">
            <h2>June 4</h2>
            <br />
            <div v-for="list_item in filterByUser" v-bind:key="list_item.id">
              <p>experience: {{ list_item.experience_id }} user: {{ list_item.user_id }}</p>
            </div>
            <router-link to="/experiences">
              <button>Add another Experience</button>
            </router-link>
          </li>
          <li class="item">June 5</li>
          <li class="item">June 6</li>
          <li class="item">June 7</li>
          <li class="item">June 8</li>
          <li class="item">June 9</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      list_items: [],
      errors: [],
      current_user: localStorage.getItem("user_id"),
    };
  },
  created: function () {
    this.listExperiences();
  },
  computed: {
    filterByUser: function () {
      var current_user = localStorage.getItem("user_id");
      return this.list_items.filter((list_item) => list_item.user_id == current_user);
    },
  },
  methods: {
    listExperiences: function () {
      axios.get("api/list_items").then((response) => {
        console.log(response.data);
        this.list_items = response.data;
      });
    },
  },
};
</script>
