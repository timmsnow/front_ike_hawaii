<template>
  <div class="calendar-page">
    <!-- <div v-on:submit.prevent="calendarAppear()" class="inputs"> -->
    <form v-on:submit.prevent="updateUser(user)" v-if="noDates()">
      <h1>When will you be coming to our island?</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Start Date:</label>
        <input type="text" class="form-control" v-model="input_trip_start" />
      </div>
      <div class="form-group">
        <label>End Date:</label>
        <input type="text" class="form-control" v-model="input_trip_end" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>

    <dialog id="edit-dates">
      <form v-on:submit.prevent="updateUser(user)">
        <h1>When will you be coming to our island?</h1>
        <ul>
          <li class="text-danger" v-for="error in errors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="form-group">
          <label>Start Date:</label>
          <input type="text" class="form-control" v-model="input_trip_start" />
        </div>
        <div class="form-group">
          <label>End Date:</label>
          <input type="text" class="form-control" v-model="input_trip_end" />
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </dialog>
    <!-- </div> -->

    <div class="calendar" v-if="!noDates()">
      <h1>Your Trip Calendar</h1>
      <div class="slider">
        <div class="full hide-scroll">
          <ul class="hs">
            <li class="item">
              <h2>June 4</h2>
              <br />
              <div class="container" v-for="list_item in filterByUser" v-bind:key="list_item.id">
                <div class="row">
                  <div class="col-4">Experience:</div>
                  <div class="col-8">{{ list_item.experience_info.name }}</div>
                </div>
                <div class="row">
                  <div class="col-4">Recommended Length of Stay:</div>
                  <div class="col-8">{{ list_item.experience_info.length }}</div>
                </div>
                <div class="row">
                  <div class="col-4">Best Time of Day:</div>
                  <div class="col-8">{{ list_item.experience_info.time }}</div>
                </div>
                <button v-on:click="destroyListItem(list_item)">Remove Experience</button>
                <hr />
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
    <button v-if="!noDates()" v-on:click="editDates()" class="hidden-button">Edit Trip Dates</button>
  </div>
</template>

<style>
:root {
  --gutter: 20px;
}

.slider {
  padding: var(--gutter) 0;
  display: grid;
  grid-gap: var(--gutter) 0;
  grid-template-columns: var(--gutter) 1fr var(--gutter);
  align-content: start;
  width: auto;
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

.slider {
  width: auto;
  height: auto;
  background: #dbd0bc;
  overflow-y: scroll;
  margin-left: 10%;
  margin-right: 10%;
}

.hs > li,
.item {
  scroll-snap-align: center;
  padding: calc(var(--gutter) / 2 * 1.5);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  height: auto;
  width: auto;
  font-size: 12px;
}

router-link {
  text-decoration: none;
}

.hidden-button {
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
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
      input_trip_start: "",
      input_trip_end: "",
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
  computed: {
    filterByUser: function () {
      var current_user = localStorage.getItem("user_id");
      return this.list_items.filter((list_item) => list_item.user_id == current_user);
    },
  },
  methods: {
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
    noDates: function () {
      if (this.user.trip_start === null || this.user.trip_start === null) {
        return true;
      }
    },
    editDates: function () {
      document.querySelector("#edit-dates").showModal();
    },
    // calendarAppear: function () {
    //   var x = document.querySelector(".inputs");
    //   var y = document.querySelector(".calendar");
    //   var z = document.querySelector(".hidden-button");
    //   if (x.style.display === "none") {
    //     x.style.display === "block";
    //   } else {
    //     x.style.display = "none";
    //     y.style.display = "block";
    //     z.style.display = "block";
    //   }
    // },
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
