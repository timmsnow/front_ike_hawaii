<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <!-- <nav class="navbar navbar-expand-lg navbar-dark" id="mainNav"> -->
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
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="/"><span class="color">Home</span></a>
            </li>
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
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
header.masthead {
  padding: -10%;
}
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

#example-datepicker__dialog_ {
  padding: 2%;
  box-shadow: 1px 1px 4px gray;
}
.b-calendar-grid {
  padding: 0 20% !important;
  text-shadow: none;
}

.welcome {
  width: 70%;
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
  text-shadow: 0px 1px 1px black, 2px 1px 5px gray;
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

#buttons {
  display: flex;
  gap: 2%;
  justify-content: center;
  margin: 5% 0;
}

.buttons {
  display: flex;
  gap: 2%;
  justify-content: center;
}

div.inline {
  float: center;
  margin: 2%;
}
#footer-margin {
  text-align: center;
  padding: 5% 0 5% 0;
}
.row {
  grid-gap: 4%;
  display: flex;
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
  padding-top: 2%;
}

#tags {
  padding-left: 10%;
}

#tag-display {
  margin-top: 2%;
  margin-bottom: 5%;
  text-align: center;
}

.form-group {
  margin: 3% 15%;
}

.mapboxgl-popup-close-button {
  box-shadow: none !important;
  margin-top: 0 !important;
  padding: 0 2% !important;
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
