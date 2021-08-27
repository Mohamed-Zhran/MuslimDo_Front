<template>
  <div>
    <NuxtLink to="/">Back to Products</NuxtLink>
    <h1 class = "text-capitalize mt-5 text-center">your order is placed successfully</h1>
    <div class = "text-right text-center mt-5 total-cost">Total Cost: {{ totalPrice }}</div>
    <v-row justify = "center">
      <v-col cols = "8" class = "mt-10">
        <v-simple-table class = "order-table">
          <template #default>
            <thead>
            <tr>
              <th class = "text-left">
                Name
              </th>
              <th class = "text-left">
                Quantity
              </th>
              <th class = "text-left">
                Price
              </th>
              <th class = "text-left">
                Category
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for = "item in items"
              :key = "item.name"
            >
              <td>{{ item.product.name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.product.price }}</td>
              <td>{{ item.product.category }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import purchases from '~/mixins/purchases'

export default {

  name: "PlaceOrder",
  mixins: [purchases],
  data()
  {
    return {
      items: [],
      totalPrice: 0
    }
  },
  mounted()
  {
    this.getCartItem()
  },
  methods: {}
}
</script>

<style lang = "scss" scoped>
.total-cost
{
  font-size: 1.5em;
  font-weight: 300;
}

.order-table
{
  border: 1px solid rgba(0, 0, 0, 0.30);
}
</style>
