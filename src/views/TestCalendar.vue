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
