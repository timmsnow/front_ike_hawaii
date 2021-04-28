<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="assets/img/navbar-logo.svg" alt="" /></a>
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
footer {
  border-top: 2px solid rgb(170, 168, 168);
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
