<template>
  <div class="calendar-page">
    <!-- <header class="masthead"> -->
    <div class="dates" v-if="noDates()">
      <div class="page-section">
        <form class="container" v-on:submit.prevent="updateUser(user)">
          <h1 class="text-center">When will you be coming to our island?</h1>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <label for="example-datepicker">Arrival</label>
          <b-form-datepicker id="example-datepicker" v-model="inputTripStart" class="mb-2"></b-form-datepicker>
          <div>
            <label for="example-datepicker">Departure</label>
            <b-form-datepicker id="example-datepicker-2" v-model="inputTripEnd" class="mb-2"></b-form-datepicker>
          </div>
          <input type="submit" class="solo-button" value="Submit" />
        </form>
      </div>
    </div>

    <dialog class="edit-dates">
      <div class="container">
        <form v-on:submit.prevent="updateUser(user)">
          <h1>When will you be coming to our island?</h1>
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <div>
            <label for="example-datepicker">Arrival</label>
            <b-form-datepicker id="example-datepicker" v-model="inputTripStart" class="mb-2"></b-form-datepicker>
          </div>
          <div>
            <label for="example-datepicker">Departure</label>
            <b-form-datepicker id="example-datepicker-2" v-model="inputTripEnd" class="mb-2"></b-form-datepicker>
          </div>
          <div class="buttons">
            <div class="inline">
              <input type="submit" class="btn-primary" value="Submit" />
            </div>
            <div class="inline">
              <button class="btn-primary">Close</button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
    <!-- </div> -->

    <div class="calendar" v-if="!noDates()">
      <div class="text-center">
        <img id="surf" src="../assets/surf3.png" />
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
    <div id="footer-margin">
      <button v-if="!noDates()" v-on:click="editDates()" class="bg-info">Edit Trip Dates</button>
    </div>
  </div>
</template>

<style scoped>
dialog {
  border: 3px solid rgb(21, 102, 252);
  border-radius: 1%;
  padding: 8%;
}

.calendar-page {
  background-image: url("../assets/pineapplewallpaper3.jpg");
}

#surf {
  width: 70%;
  max-width: 700px;
  margin: 7% auto 5% auto;
}

:root {
  --gutter: 20px;
}

.slider {
  padding: var(--gutter) 0;
  display: grid;
  grid-gap: var(--gutter) 0;
  /* grid-template-columns: var(--gutter) 1fr var(--gutter); */
  grid-template-columns: var(--gutter) 1fr var(--gutter);
  align-content: start;
  width: auto;
  height: auto;
  /* background: rgb(253, 220, 111); */
  background: rgb(209, 209, 209, 0.8);
  border: 4px solid rgb(247, 200, 46);
  border-radius: 2%;
  margin-left: 5%;
  margin-right: 5%;
  overflow-y: scroll;
  box-shadow: 1px 1px 4px gray;
}

.slider > * {
  grid-column: 2 / -2;
}

.slider > .full {
  grid-column: 1 / -1;
}

.hs {
  display: grid;
  grid-gap: calc(var(--gutter) / 2);
  /* grid-template-columns: 10px repeat(6, calc(50% - var(--gutter) * 2)) 10px; */
  grid-template-columns: 10px repeat(6, auto) 10px;
  grid-template-rows: minmax(300px, 1fr);
  overflow-x: scroll;
  scroll-snap-type: x proximity;
  padding-bottom: calc(0.75 * var(--gutter));
  margin-bottom: calc(-0.5 * var(--gutter));
}

.hs:before,
.hs:after {
  content: "";
}

/* Hide scrollbar */
.hide-scroll {
  overflow-y: hidden;
  margin-bottom: calc(-0.1 * var(--gutter));
}

.hs > li,
.item {
  /* scroll-snap-align: center; */
  /* padding: calc(var(--gutter) / 2 * 1.5); */
  margin: 2%;
  padding: 3%;
  list-style-type: none;
  justify-content: start;
  align-items: center;
  background: white;
  border: 2px solid rgb(254, 207, 52);
  border-radius: 8px;
  height: auto;
  width: auto;
  min-width: 300px;
  font-size: 12px;
  box-shadow: 1px 1px 4px gray;
}

.flex {
  display: flex;
  align-items: center;
}

.flex button {
  margin: 2% auto;
}

h5 {
  text-align: center;
  color: black;
  padding-bottom: 10%;
}
</style>

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
      inputTripStart: "",
      inputTripEnd: "",
      dates: [],
      list_item: {},
      selectedListItem: {},
    };
  },
  created: function () {
    axios.get(`/api/users/${this.user_id}`).then((response) => {
      this.user = response.data;
    });
    this.indexListItems();
  },
  mounted: function () {
    axios.get(`/api/users/${this.user_id}`).then((response) => {
      this.user = response.data;
      let initialDate = new Date(this.user.trip_start),
        endDate = new Date(this.user.trip_end);
      for (let q = initialDate; q <= endDate; q.setDate(q.getDate() + 1)) {
        var d = q.toUTCString();
        var array = d.split(" ");
        var e = array[1];
        var h = array[0];
        var f = array[2];
        var g = array[3];
        var a = h + " " + e + " " + f + " " + g;
        this.dates.push(a);
      }
    });
  },
  computed: {
    filterByUserAndDate: function () {
      var current_user = localStorage.getItem("user_id");
      //add logic to filter by date?
      return this.list_items.filter((list_item) => list_item.user_id == current_user);
    },
  },
  methods: {
    updateUser: function () {
      console.log("updating user trip info");
      var params = {
        trip_start: this.inputTripStart,
        trip_end: this.inputTripEnd,
      };
      console.log(this.user);
      axios.patch("/api/users/" + this.user_id, params).catch((error) => console.log(error.response));
      this.$router.go();
    },
    noDates: function () {
      if (this.user.trip_start === null) {
        return true;
      }
    },
    editDates: function () {
      if (
        confirm("Are you sure? Changing dates can result in deleted experiences if original dates arent included...")
      ) {
        document.querySelector(".edit-dates").showModal();
      }
    },
    storeDate: function (date) {
      localStorage.setItem("date", date) === true;
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
