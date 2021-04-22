<template>
  <div id="day-show">
    <h1>{{ date }}</h1>

    <!-- ---MAP VIEW--- -->
    <div class="item-container" v-for="list_item in filterByUserAndDate" v-bind:key="list_item.id">
      <div class="filter" v-if="list_item.date == date">
        <div id="list-item-container">
          <div>
            <h2>Experience: {{ list_item.experience_info.name }}</h2>
            <p>Location: {{ list_item.experience_info.location }}</p>
            <p>Recommended Length of Time: {{ list_item.experience_info.length }}</p>
            <p>Best Time to Visit: {{ list_item.experience_info.time }}</p>
            <p>Description: {{ list_item.experience_info.info }}</p>
            <p>Relevant Links: {{ list_item.experience_info.links }}</p>
          </div>
          <img v-bind:src="list_item.experience_info.image_url" v-bind:alt="list_item.name" />
        </div>

        <button v-on:click="destroyListItem(list_item)">Remove Experience</button>
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
      });
    },
    removeDate: function () {
      localStorage.removeItem("date");
    },
  },
};
</script>

<style scoped>
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
</style>
