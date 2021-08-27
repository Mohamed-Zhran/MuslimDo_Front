<template>
  <div>
    <NuxtLink to = "/">Back to Products</NuxtLink>
    <div class = "text-right">
      <v-btn color = "success" to = "placeOrder">Place Order</v-btn>
    </div>
    <h1 class = "font-weight-bold text-center my-4">Cart</h1>
    <div class = "text-right mb-4">Total Cost: {{ totalPrice }}</div>
    <v-row>
      <message v-if = "isSuccess" :message = "responseMessage"/>
      <message v-if = "isFailed" :message = "responseMessage" message-type = "error"/>
      <v-col cols = "12">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model = "search"
              append-icon = "mdi-magnify"
              label = "Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers = "headers"
            :items = "items"
            :search = "search"
          >
            <template #[`item.name`] = "{item}">
              {{ item.product.name }}
            </template>
            <template #[`item.price`] = "{item}">
              {{ item.product.price }}
            </template>
            <template #[`item.quantity`] = "{item}">
              <v-text-field :value = "item.quantity" @change = "changeQuantity(item.id,{$event})"></v-text-field>
            </template>
            <template #[`item.actions`] = "{item,index}">
              <v-btn color = "error" @click = "deleteItem(item.id,index)">Delete</v-btn>
            </template>
            <template #[`item.category`] = "{item}">
              {{ item.product.category }}
            </template>
            <template #[`item.image`] = "{item}">
              <img :src = "'http://localhost:8000/storage/images/'+item.product.image" alt = "item_image"
                   class = "item-image">
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import purchases from '~/mixins/purchases'
import products from '~/mixins/products'
export default {
  name: "Cart",
  mixins:[purchases,products],
  data()
  {
    return {
      totalPrice: 0,
    }
  },
  mounted()
  {
    this.getCartItem()
  },
  methods: {
    async changeQuantity(id, e)
    {
      await this.$axios.put(`cart\\${id}`, {
        quantity: e.$event
      }).then((res) =>
      {
        this.onSuccess(res)
      }).catch((err) =>
      {
        this.onFailed(err)
      })
    },
    async deleteItem(id, index)
    {
      const isConfirmed = confirm('Are you sure you want to delete this item?');
      if (isConfirmed)
      {
        await this.$axios.delete(`cart\\${id}`).then((res) =>
        {
          this.onSuccess(res)
          this.items.splice(index, 1)
          this.calculateTotalPrice()
        }).catch((err) =>
        {
          this.onFailed(err)
        })
      }
    },

  }
}
</script>

<style lang = "scss" scoped>
.item-image
{
  max-width: 5em;
  max-height: 5em;
}
</style>

