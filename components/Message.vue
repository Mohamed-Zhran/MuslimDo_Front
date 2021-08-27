<template>
  <v-col cols = "12">
    <v-alert :color = "messageType" class = "text-capitalize text-center white--text">
      {{ message }}
    </v-alert>
  </v-col>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: {type: String, default: null},
    messageType:{type:String,default:'success'}
  }
}
</script>

<style scoped lang="scss">

</style>
