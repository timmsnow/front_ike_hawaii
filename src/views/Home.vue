<template>
  <div class="home">
    <header class="masthead">
      <div class="masthead-subheading">Welcome to</div>
      <div class="masthead-heading text-uppercase">'Ike Hawaii</div>
      <div id="button-box">
        <button v-if="x === ''" class="form" v-on:click="showForm()">get started</button>
        <p>or</p>
        <a href="/login"><button v-if="x === ''" class="form">log in</button></a>
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
          <input type="password" class="form-control" v-model="passwordConfirmation" placeholder="re-enter password" />
        </div>
        <input type="submit" class="btn btn-primary" value="Sign Up" />
      </form>
    </header>
  </div>
</template>

<style>
form {
  margin-left: 35%;
  margin-right: 35%;
}

input {
  box-shadow: 1px 1px 1px black, 1px 1px 1px gray;
}

.form {
  /* background-color: rgba(252, 250, 250, 0.8); */
  border: 2px solid white;
  margin: -3% 43% 3% 43%;
  font-size: 125%;
  border-radius: 5%;
  color: white;
  text-shadow: 1px 1px 2px black;
  background-color: rgb(254, 207, 52);
  box-shadow: 2px 2px 2px black, 1px 1px 2px gray;
}

.form:hover {
  background-color: #fed136;
  box-shadow: 2px 2px 4px black, 1px 1px 2px gray;
}
.masthead {
  text-shadow: 2px 2px 4px black, 1px 1px 2px gray;
}
#button-box {
  justify-content: center;
}
a {
  color: #fed136 !important;
  text-decoration: none !important;
}

p {
  font-style: italic;
  font-family: "Droid Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-shadow: 2px 2px 4px black;
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
