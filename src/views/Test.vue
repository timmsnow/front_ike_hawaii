<template>
  <div class="test">
    <h3>Filter By Category</h3>
    <select v-model="category">
      <option valeu="Accessories">Accessories</option>
      <option valeu="Laptop">Laptop</option>
      <option valeu="Stationary">Stationary</option>
    </select>
    <ul>
      <li v-for="product in filterProductsByCategory" v-bind:key="product">
        Product Name : {{ product.name }} - Price : {{ product.price }} ({{ product.category }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      category: "",
    products: [
      { name: "Keyboard", price: 44, category: "Accessories" },
      { name: "Mouse", price: 20, category: "Accessories" },
      { name: "Monitor", price: 399, category: "Accessories" },
      { name: "Dell XPS", price: 599, category: "Laptop" },
      { name: "MacBook Pro", price: 899, category: "Laptop" },
      { name: "Pencil Box", price: 6, category: "Stationary" },
      { name: "Pen", price: 2, category: "Stationary" },
      { name: "USB Cable", price: 7, category: "Accessories" },
      { name: "Eraser", price: 2, category: "Stationary" },
      { name: "Highlighter", price: 5, category: "Stationary" },
    ],
    };
  },
  computed: {
    filterProductsByCategory: function () {
      return this.products.filter((product) => !product.category.indexOf(this.category));
    },
  },
};
</script>
