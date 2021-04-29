<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <!-- <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="assets/img/navbar-logo.svg" alt="" /></a> -->
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars ml-1"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ml-auto">
            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Home</a></li>
            <li class="nav-item" v-if="!ifLoggedIn()"><a class="nav-link js-scroll-trigger" href="/login">Login</a></li>
            <li class="nav-item" v-if="ifLoggedIn()">
              <a class="nav-link js-scroll-trigger" href="/logout">Logout</a>
            </li>
            <li class="nav-item" v-if="ifLoggedIn()">
              <a class="nav-link js-scroll-trigger" href="/calendar">Trip Calendar</a>
            </li>
            <!-- <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#contact">Contact</a></li> -->
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
    <footer class="footer py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-4 text-lg-left">Copyright © 'Ike Hawaii 2021</div>
          <div class="col-lg-4 my-3 my-lg-0">
            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
          </div>
          <div class="col-lg-4 text-lg-right">
            <a class="mr-3" href="#!">Privacy Policy</a>
            <a href="#!">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
li {
  list-style: none;
}

img {
  max-width: 300px;
}

footer {
  border-top: 2px solid rgb(170, 168, 168);
  /* background: rgb(254, 207, 52); */
}

router-link {
  text-decoration: none;
}

input {
  box-shadow: none;
}

#example-datepicker__dialog_ {
  padding: 2%;
  box-shadow: 1px 1px 4px gray;
}
.b-calendar-grid {
  padding: 0 20% !important;
  text-shadow: none;
}

.welcome {
  width: 60%;
  border: 4px solid #fed136;
  padding: 5rem 0 5rem 0;
  margin: 0 auto;
  border-radius: 5%;
  background: rgb(37, 37, 37, 0.6);
}
.text-white {
  color: white;
  text-shadow: 1px 1px 1px black, 1px 2px 4px gray;
}

.masthead-heading {
  text-shadow: 1px 1px 1px black, 1px 2px 4px gray;
}
.masthead-subheading {
  text-shadow: 1px 1px 1px black, 1px 2px 4px gray;
}

#example-datepicker__value_ {
  color: rgb(224, 222, 222) !important;
}

#example-datepicker-2__value_ {
  color: rgb(224, 222, 222) !important;
}

.remove-button {
  color: white;
  background: rgb(16, 160, 243);
  border: 1px solid gray;
  padding: 5px;
  box-shadow: 1px 2px 4px gray;
  margin: auto;
}

.solo-button {
  border-radius: 2%;
  color: white;
  text-shadow: 1px 1px 2px black, 1px 1px 5px gray;
  background: rgb(254, 207, 52);
  border: 1px solid gray;
  padding: 7px;
  box-shadow: 1px 2px 4px gray;
  margin: 3% auto;
  font-size: 1.5rem;
}

#edit-dates {
  padding: 10% 5% 10% 5%;
}

.dates {
  margin: 5% 20% 0 20%;
  background-color: white;
  border: 2px solid rgb(254, 207, 52);
  border-radius: 2%;
  padding: 5%;
}

.dates,
h1 {
  color: white;
  text-shadow: 0px 1px 1px black, 1px 1px 5px gray;
}
.dates,
p {
  color: black;
  text-shadow: none;
}

.b-calendar-grid {
  padding-left: 22%;
  padding-right: 22%;
}

.buttons {
  width: 40%;
  margin: 5% auto;
}

#buttons {
  display: flex;
  gap: 2%;
  justify-content: center;
  margin: 5% 0;
}

#footer-margin {
  text-align: center;
  padding: 5% 0 5% 0;
}
.row {
  grid-gap: 4%;
  display: inline-flex;
  justify-content: center;
}

.container-one {
  background-color: rgb(255, 255, 255);
  margin: 0 5% 0 5%;
  border: 4px solid rgb(254, 207, 52);
  border-radius: 0.5%;
}

#image {
  max-width: 300px;
}

.card {
  box-shadow: 1px 2px 5px gray;
  margin-bottom: 2%;
}

.card h4 {
  text-align: center;
}

#map {
  height: 300px;
  width: 300px;
}

#experience-show {
  margin-left: 10%;
  margin-right: 10%;
}

.section-subheading {
  background: rgb(254, 207, 52);
}

#pic-container {
  display: flex;
  justify-content: center;
}

#district {
  height: 50px;
}

#tags {
  padding-left: 10%;
}

#tag-and-button {
  display: block;
  margin-top: 2%;
  margin-bottom: 5%;
  text-align: center;
}

.form-group {
  margin: 3% 15%;
}
</style>

<script>
export default {
  methods: {
    ifLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
