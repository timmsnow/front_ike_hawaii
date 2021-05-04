<template>
  <div class="test-calendar">
    <h1>When will you be coming to our island?</h1>
    <dialog id="open-dates">
      <form method="dialog">
        <label for="example-datepicker">Arrival</label>
        <b-form-datepicker id="example-datepicker" v-model="inputTripStart" class="mb-2"></b-form-datepicker>
      </form>
    </dialog>
    <div>
      <label for="example-datepicker">Departure</label>
      <b-form-datepicker id="example-datepicker" v-model="inputTripEnd" class="mb-2"></b-form-datepicker>
    </div>
    <div class="slider">
      <div class="full hide-scroll">
        <ul class="hs">
          <div class="container" v-for="(date, index) in dates" v-bind:key="`vfor-${index}`">
            <li class="item">
              <h5 class="date" ref="date">
                {{ date }}
              </h5>
              <div class="box">
                <div class="item-container" v-for="list_item in filterByUserAndDate" v-bind:key="list_item.id">
                  <div class="filter" v-if="list_item.date == date">
                    <div class="flex">
                      <p>{{ list_item.experience_info.name }} | {{ list_item.experience_info.location }}</p>

                      <button class="bg-info" v-on:click="destroyListItem(list_item)">Remove</button>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
              <div id="buttons">
                <router-link to="/experiences">
                  <button class="bg-primary" ref="button" v-on:click="storeDate(date)">Add Experience</button>
                </router-link>
                <router-link to="/day-show">
                  <button class="bg-primary" ref="button" v-on:click="storeDate(date)">Show Full Day Details</button>
                </router-link>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputTripStart: "",
      inputTripEnd: "",
    };
  },
  methods: {
    whatsHappening: function () {
      console.log(this.range);
    },
  },
  updateUser: function () {
    console.log("updating user trip info");
    var params = {
      trip_start: this.input_trip_start,
      trip_end: this.input_trip_end,
    };
    console.log(this.user);
    axios.patch("/api/users/" + this.user_id, params).catch((error) => console.log(error.response));
    this.$router.go();
  },
  openDates: function () {
    document.querySelector("#open-dates").showModal();
  },
};
</script>
