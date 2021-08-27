export default {
  data()
  {
    return {
      totalPrice: 0,
      isSuccess:false,
      isFailed:false
    }
  },
  methods: {
    async getCartItem()
    {
      await this.$axios.get('cart').then((res) =>
      {
        this.items = res.data
        this.calculateTotalPrice()
      })
    },
    calculateTotalPrice()
    {
      this.totalPrice = 0
      this.items.forEach((item) =>
      {
        this.totalPrice += item.quantity * item.product.price
      })
    },
  }
}
