<template>
  <div class="home">
    <header class="masthead">
      <div class="welcome">
        <div class="masthead-subheading">Welcome to</div>
        <div class="masthead-heading text-uppercase">'Ike Hawaii</div>
        <div class="buttons">
          <button v-if="x === ''" class="form" v-on:click="showForm()">get started</button>
          <p v-if="x === ''">OR</p>
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
            <input
              type="password"
              class="form-control"
              v-model="passwordConfirmation"
              placeholder="re-enter password"
            />
          </div>
          <input
            type="submit"
            class="btn btn-primary"
            style="background-color: rgb(248, 212, 52) !important"
            value="Sign Up"
          />
        </form>
      </div>
    </header>
  </div>
</template>

<style>
.welcome {
  width: 60%;
  border: 4px solid #fed136;
  padding: 5rem 0 5rem 0;
  margin: 0 auto;
  border-radius: 5%;
  background: rgb(37, 37, 37, 0.6);
}
form {
  margin-left: 35%;
  margin-right: 35%;
}

/* input {
  box-shadow: 1px 1px 1px black, 1px 1px 1px gray;
} */
.buttons {
  width: 40%;
  margin: 5% auto;
}
.form {
  border: 2px solid white;
  border-radius: 5%;
  color: white;
  text-shadow: 1px 1px 2px black;
  background-color: rgb(254, 207, 52);
  box-shadow: 2px 2px 2px black, 1px 1px 2px gray;
  margin: 2%;
  font-size: 1rem;
}

.masthead-heading {
  text-shadow: 1px 1px 1px black, 1px 2px 4px gray;
}
.masthead-subheading {
  text-shadow: 1px 1px 1px black, 1px 2px 4px gray;
}

/* p {
  font-style: italic;
  font-family: "Droid Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  text-shadow: 1px 1px 3px gray;
} */
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
