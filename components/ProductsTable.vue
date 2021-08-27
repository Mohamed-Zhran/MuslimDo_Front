<template>
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
          <template #[`item.image`] = "{item}">
            <img :src = "'http://localhost:8000/storage/images/'+item.image" alt = "item_image" class = "item-image">
          </template>

          <template #[`item.actions`] = "{item}">
            <v-row>
              <v-col cols = "6">
                <v-text-field :ref = "'item-'+item.id" type = "number" min = "0" placeholder = "Amount">
                </v-text-field>
              </v-col>
              <v-col cols = "6" class = "mt-4">
                <v-btn color = "success" @click = "addToCart(item.id)">Add to Cart</v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import purchases from '~/mixins/purchases'
import products from '~/mixins/products'

export default {
  name: "ProductsTable",
  mixins: [purchases,products],
  data()
  {
    return {
    }
  },
  mounted()
  {
    this.getProducts()
  },
  methods: {
    async getProducts()
    {
      await this.$axios.get('products').then((res) =>
      {
        this.items = res.data
      }).catch(err => {
        this.onFailed(err)
      })
    },
    async addToCart(id)
    {
      await this.$axios.post('cart/', {
        quantity: this.$refs['item-' + id].$data.lazyValue,
        product_id: id
      }).then((res) =>
      {
        this.onSuccess(res)
      }).catch((err) =>
      {
        this.onFailed(err)
      })
    }
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
