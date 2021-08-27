export default {
  data()
  {
    return {
      responseMessage: '',
      isSuccess: false,
      isFailed: false,
      search: '',
      headers: [
        {text: 'Name', value: 'name'},
        {text: 'Image', value: 'image'},
        {text: 'Quantity', value: 'quantity'},
        {text: 'Price', value: 'price'},
        {text: 'Category', value: 'category'},
        {text: 'Actions', value: 'actions'},
      ],
      items: []
    }
  },
  methods: {
    onSuccess(res)
    {
      this.responseMessage = res.data.message
      this.isSuccess = true
      this.isFailed = false
    },
    onFailed(err)
    {
      this.responseMessage = err.response.data.message
      this.isSuccess = false
      this.isFailed = true
    }
  }
}

