<template>
  <div class="test">
    <!-- 
    <p>Experience in</p>
    <div>
      <select v-model="location">
        <option valeu="Hilo Area">Hilo Area</option>
        <option valeu="Puna">Puna</option>
        <option valeu="Waimea/North Coast">Waimea/North Coast</option>
        <option valeu="Kailua-Kona">Kailua-Kona</option>
        <option valeu="Captain Cook + South">Captain Cook + South</option>
      </select>
    </div>
    <span id="tags">
      <div v-for="tag in tags" :key="tag">
        <input type="checkbox" id="toggle" :value="tag" v-model="selectedTags" />
        <label for="tag">{{ tag.name }}</label>
      </div>
    </span>

    <div class="container">
      <div class="row">
        <div
          class="card"
          style="width: 18rem"
          id="index"
          v-for="experience in filterBy(filteredByTag, location)"
          v-bind:key="experience.id"
        >
          <img v-bind:src="experience.image_url" v-bind:alt="experience.name" class="card-img-top" />
          <div class="card-body">
            <h4>{{ experience.name }}</h4>
            <p class="card-text">
              {{ experience.location }}
            </p>
            <button v-on:click="showExperience(experience)">More Info</button>
          </div>
        </div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
        <div class="col-sm"></div>
      </div>
    </div> -->
    <div class="slider">
      <div class="full hide-scroll" v-drag-and-drop:options="options">
        <ul class="hs">
          <li v-for="(date, index) in dates" v-bind:key="`vfor-${index}`">
            <!-- <li class="item"> -->
            <h5 class="date" ref="date">
              {{ date }}
            </h5>
            <draggable class="container" :dates="dates" group="day" @change="log" @onDrop="log">
              <div class="box">
                <div class="item-container" v-for="list_item in filterByUserAndDate" v-bind:key="list_item.id">
                  <div class="filter" v-if="list_item.date == date">
                    <div class="flex">
                      <p>{{ list_item.experience_info.name }} | {{ list_item.experience_info.location }}</p>
                      {{ list_item.date }}

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
            </draggable>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import axios from "axios";

export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
  },
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
      userListItems: [],
      options: {
        dropzoneSelector: "ul",
        draggableSelector: "li",
        handlerSelector: null,
        reactivityEnabled: true,
        multipleDropzonesItemsDraggingEnabled: true,
        showDropzoneAreas: true,
        onDrop: function () {
          console.log("what");
        },
        // onDragstart: function(event) {},
        // onDragenter: function(event) {},
        // onDragover: function(event) {},
        // onDragend: function(event) {},
      },
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
    onGroupsChange(e) {
      console.log({ e });
    },
    add: function () {
      this.dates.push({ dates: this.date[this.index] });
    },
    replace: function () {
      this.dates = [{ dates: this.date[this.index + 1] }];
    },
    clone: function (el) {
      return {
        name: el.name + " cloned",
      };
    },
    // move: function () {},
    log: function () {
      this.list_items.forEach((item) => (item.date = "0"));
    },
    updateUser: function () {
      console.log("updating user trip info");
      var params = {
        trip_start: this.inputTripStart,
        trip_end: this.inputTripEnd,
      };
      console.log(this.user);
      axios.patch("/api/users/" + this.user_id, params).catch((error) => console.log(error.response));
      this.$router.go();
      this.trashOldListItems();
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
    trashOldListItems: function () {
      var userListItems = this.list_items.filter((list_item) => list_item.user_id == this.user_id);
      for (let i of userListItems) {
        if (this.dates.includes(i.date)) {
          console.log(i);
        } else {
          this.destroyListItem(i);
        }
      }
    },
  },
};

// import axios from "axios";

// import Vue2Filters from "vue2-filters";
// export default {
//   mixins: [Vue2Filters.mixin],
//   data: function () {
//     return {
//       experiences: [],
//       location: "",
//       tags: [],
//       selectedTags: [],
//     };
//   },
//   computed: {
//     filteredByTag() {
//       return this.getByTag(this.experiences, this.selectedTags);
//     },
//   },
//   created: function () {
//     this.indexExperiences();
//     this.indexTags();
//   },
//   methods: {
//     indexExperiences: function () {
//       axios.get("api/experiences").then((response) => {
//         console.log(response.data);
//         this.experiences = response.data;
//       });
//     },
//     indexTags: function () {
//       axios.get("api/tags").then((response) => {
//         this.tags = response.data;
//       });
//     },
//     getByTag: function (experiences, selectedTags) {
//       if (selectedTags.length === 0) {
//         return experiences;
//       }
//       selectedTags.forEach((tag) => {
//         experiences = this.filterBy(experiences, tag.name);
//       });
//       return experiences;
//     },
//     filterByLocation: function () {
//       return this.experiences.filter((experience) => !experience.location.indexOf(this.location));
//     },
//   },
// };
</script>

<style scoped>
:root {
  --gutter: 20px;
}

.slider {
  margin-top: 50%;
  padding: var(--gutter) 0;
  display: grid;
  grid-gap: var(--gutter) 0;
  /* grid-template-columns: var(--gutter) 1fr var(--gutter); */
  grid-template-columns: var(--gutter) 1fr var(--gutter);
  align-content: start;
  width: auto;
  height: auto;
  /* background: rgb(253, 220, 111); */
  background: rgb(254, 207, 52);
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
  display: inline-grid;
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
  text-align: center;
  /* scroll-snap-align: center; */
  /* padding: calc(var(--gutter) / 2 * 1.5); */
  margin: 2% 6%;
  padding: 3%;
  list-style-type: none;
  justify-content: start;
  align-items: center;
  border-radius: 8px;
  background: rgb(209, 209, 209, 0.8);

  /* background: rgb(254, 207, 52); */
  height: auto;
  width: auto;
  min-width: 300px;
  font-size: 12px;
  color: white;
  text-shadow: 1px 1px 4px gray;
  box-shadow: 1px 1px 4px gray;
}

.box {
  border: 1px solid gold;
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
  min-width: 260px;
  font-size: 12px;
  box-shadow: 1px 1px 4px gray;
}
</style>
