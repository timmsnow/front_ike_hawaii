<template>
  <div class="home">
    <header class="masthead">
      <div class="welcome">
        <div class="masthead-subheading">Welcome to</div>
        <div class="masthead-heading text-uppercase">'Ike Hawaii</div>
        <div class="buttons">
          <button v-if="x === ''" v-on:click="showForm()">GET STARTED</button>
          <br />
          <br />
          <p v-if="x === ''" class="text-white">OR</p>
          <a href="/login"><button v-if="x === ''" style="font-style: italic">Log In</button></a>
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
            class="solo-button"
            style="background-color: rgb(248, 212, 52) !important"
            value="Sign Up"
          />
        </form>
      </div>
    </header>
  </div>
</template>

<style></style>

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
