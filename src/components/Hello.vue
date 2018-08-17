<template>
  <div class="hello">
    <avatar :image="user.photo.photo_link" fullname="My Sticker" size=200 v-if="user && user.photo"></avatar>
    <h1>Bonjour {{ user.name }}</h1>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import Avatar from 'vue-avatar-component';

@Component({
  components: {
    Avatar
  }
})
export default class Hello extends Vue {
    @Prop()
    user
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

</style>
