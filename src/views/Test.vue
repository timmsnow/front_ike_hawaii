<template>
  <div class="test">
    <div>
      <label class="typo__label">Simple select / dropdown</label>
      <multiselect
        v-model="options"
        :options="options"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Pick some"
        label="name"
        track-by="name"
        :preselect-first="true"
      >
        <template slot="selection" slot-scope="{ values, search, isOpen }">
          <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">
            {{ values.length }} options selected
          </span>
        </template>
      </multiselect>
      <pre class="language-json"><code><div v-for="option in options" v-bind:key="option">
{{option.name}}
        </div>

        </code></pre>
    </div>
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
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: [],
      options: [
        { name: "Vue.js", language: "JavaScript" },
        { name: "Adonis", language: "JavaScript" },
        { name: "Rails", language: "Ruby" },
        { name: "Sinatra", language: "Ruby" },
        { name: "Laravel", language: "PHP" },
        { name: "Phoenix", language: "Elixir" },
      ],
    };
  },
};
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
