<template>
  <div class="calendar">
    <form v-on:submit.prevent="updateUser(user)">
      <h1>When will you be coming to our island?</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Start Date:</label>
        <input type="text" class="form-control" v-model="user.tripStart" />
      </div>
      <div class="form-group">
        <label>End Date:</label>
        <input type="text" class="form-control" v-model="user.tripEnd" />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>

    <h1>Your Trip Calendar</h1>
    <div class="slider">
      <div class="full hide-scroll">
        <ul class="hs">
          <router-link to="/experiences">
            <li class="item"><h2>June 4</h2></li>
          </router-link>
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
  grid-template-columns: 10px repeat(6, calc(50% - var(--gutter) * 2)) 10px;
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
  height: 270px;
}

router-link {
  text-decoration: none;
}

</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      errors: [],
    };
  },
  created: function () {
    axios.get("/api/users/" + this.$route.params.id).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function (user) {
      console.log("updating user trip info");
      var params = {
        tripStart: user.trip_start,
        tripEnd: user.trip_end,
      };
      axios
        .patch("/api/users/" + this.$route.params.id, params)
        // .then(() => {
        //   this.$router.push("/posts/" + this.post.id);
        // })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>
