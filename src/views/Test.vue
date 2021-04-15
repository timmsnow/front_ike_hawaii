<template>
  <div></div>
  <!-- <div>
    <label class="typo__label">Simple select / dropdown</label>
    <multiselect
      v-model="value"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      label="name"
      track-by="code"
      :options="experiences"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
          {{ values.length }} options selected
        </span>
      </template>
    </multiselect>
    <pre class="language-json"><code>{{ value  }}</code></pre>
  </div> -->
  <!-- <h3>Filter By Category</h3>
    <select v-model="category">
      <option valeu="Accessories">Accessories</option>
      <option valeu="Laptop">Laptop</option>
      <option valeu="Stationary">Stationary</option>
    </select>
    <ul>
      <li v-for="product in filterProductsByCategory" v-bind:key="product">
        Product Name : {{ product.name }} - Price : {{ product.price }} ({{ product.category }})
      </li>
    </ul> -->

  <!-- <button v-on:click="createDates()">do it</button> -->
  <!-- <ul></ul> -->
</template>

<script>
// import Multiselect from "vue-multiselect";
// import axios from "axios";

// export default {
//   components: {
//     Multiselect,
//   },
//   data() {
//     return {
//       value: [],
//       options: [
//         { name: "Vue.js", language: "JavaScript" },
//         { name: "Adonis", language: "JavaScript" },
//         { name: "Rails", language: "Ruby" },
//         { name: "Sinatra", language: "Ruby" },
//         { name: "Laravel", language: "PHP" },
//         { name: "Phoenix", language: "Elixir" },
//       ],
//       experiences: [],
//       tags: [],
//     };
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
//         console.log(response.data);
//         this.tags = response.data;
//       });
//     },
//   },
//   addTag(newTag) {
//     const tag = {
//       name: newTag,
//       code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
//     };
//     this.options.push(tag);
//     this.value.push(tag);
//   },
// };
// import axios from "axios";
// import moment from "moment";
// moment().format();

// export default {
//   created: function () {
//     axios.get(`/api/users/${this.user_id}`).then((response) => {
//       console.log(response.data);
//       this.user = response.data;
//       let initialDate = new Date(this.user.trip_start),
//         endDate = new Date(this.user.trip_end);
//       console.log(initialDate);
//       console.log(this.user.trip_start);
//       for (let q = initialDate; q <= endDate; q.setDate(q.getDate() + 1)) {
//         this.dates.push(q.toDateString());
//       }
//       console.log(this.dates);
//       this.createDates();
//     });
//   },
//   data: function () {
//     return {
//       category: "",
//       products: [
//         { name: "Keyboard", price: 44, category: "Accessories" },
//         { name: "Mouse", price: 20, category: "Accessories" },
//         { name: "Monitor", price: 399, category: "Accessories" },
//         { name: "Dell XPS", price: 599, category: "Laptop" },
//         { name: "MacBook Pro", price: 899, category: "Laptop" },
//         { name: "Pencil Box", price: 6, category: "Stationary" },
//         { name: "Pen", price: 2, category: "Stationary" },
//         { name: "USB Cable", price: 7, category: "Accessories" },
//         { name: "Eraser", price: 2, category: "Stationary" },
//         { name: "Highlighter", price: 5, category: "Stationary" },
//       ],
//       dates: [],
//       user_id: localStorage.getItem("user_id"),
//     };
//   },
//   computed: {
//     filterProductsByCategory: function () {
//       return this.products.filter((product) => !product.category.indexOf(this.category));
//     },
//   },
//   methods: {
//     createDates: function () {
//       var ul = document.querySelector("ul");
//       for (var i = 0; i < this.dates.length; i++) {
//         var date = this.dates[i];
//         var listItem = document.createElement("li");
//         listItem.textContent = date;
//         ul.appendChild(listItem);
//       }
//     },
//   },
// };
</script>
