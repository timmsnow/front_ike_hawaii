<template>
  <div class="home">
    <header class="masthead">
      <div class="welcome">
        <div class="masthead-subheading">Welcome to</div>
        <div class="masthead-heading text-uppercase">
          'ike Hawaii
          <!-- <img src="../assets/ike-logo-7.png" class="smaller" /> -->
        </div>
        <div class="inline">
          <button class="bg-primary" id="signup" v-if="x === ''" v-on:click="showForm()">GET STARTED</button>
          <p v-if="x === ''" class="text-white">OR</p>
          <a href="/login"><button class="bg-primary" v-if="x === ''" style="font-style: italic">LOG IN</button></a>
        </div>
        <form id="myDIV" v-on:submit.prevent="submit()" v-if="x === 'x'">
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <div class="form-group">
            <!-- <label>Name:</label> -->
            <input type="text" class="form-control" v-model="name" placeholder="name" />
          </div>
          <div class="form-group">
            <!-- <label>Email:</label> -->
            <input type="email" class="form-control" v-model="email" placeholder="email" />
          </div>
          <div class="form-group">
            <!-- <label>Password:</label> -->
            <input type="password" class="form-control" v-model="password" placeholder="password" />
          </div>
          <div class="form-group">
            <!-- <label>Password confirmation:</label> -->
            <input
              type="password"
              class="form-control"
              v-model="passwordConfirmation"
              placeholder="re-enter password"
            />
          </div>
          <input
            type="submit"
            class="btn-primary"
            style="background-color: rgb(248, 212, 52) !important"
            value="Sign Up"
          />
        </form>
      </div>
    </header>
  </div>
</template>

<style scoped>
.masthead {
  background: url("../assets/pineapplewallpaper3.jpg");
}
.welcome {
  background: url("../assets/ferns.jpg");
  background-size: cover;
  box-shadow: 0px 0px 3px rgb(85, 85, 85);
}
@media (max-width: 768px) {
  #signup {
    margin-top: 20%;
  }
}

.text-white {
  margin-top: 2%;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to 'IKE HAWAII'",
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      x: "",
    };
  },
  created: function () {},
  methods: {
    submit: function () {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    showForm: function () {
      console.log(this.x);
      return (this.x = "x");
    },
  },
};
</script>
