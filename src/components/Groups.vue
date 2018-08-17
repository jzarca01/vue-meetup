<template>
<div class="container">

  <!--<el-row class="search-wrapper" :gutter="10">
    <el-col :lg="12" :md="12" :sm="12" :xs="24">
      <el-input placeholder="Filter by Name" icon="search" v-model="filter" />
    </el-col>
  </el-row>-->

  <el-row :gutter="10">
    <el-col v-for="(group, index) in groups" :xs="24" :sm="12" :md="8" :key="index">
      <div class="box" @click="onClick(group.urlname)"> 
        <avatar :image="group.group_photo.thumb_link" v-if="group.group_photo"></avatar>
        <div> {{ group.name }} </div>
        <div class="box__subtitle"> {{ group.members }} membres </div>
      </div>
    </el-col>

    <el-col v-if="groups.length === 0" :xs="24" :sm="24" :md="24">
      <div class="box box__empty">Aucun groupe</div>
    </el-col>

  </el-row> <!-- results -->

 </div> <!-- container -->
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import Avatar from 'vue-avatar-component';

@Component({
  components: {
    Avatar
  }
})
export default class Groups extends Vue {
    @Prop()
    groups

    data() {
        return {
            filter: ''
        }
    }

    onClick(urlName) {
        console.log("el", urlName)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .image {
    display: block;
  }
  .search-wrapper {
  margin: 10px 0;
}

.col-space {
  content: '&nbsp;';
  @media screen and (max-width: 767px) { display: none; }
}

.container {
  max-width: 980px;
  margin: 20px auto;
  @media screen and (max-width: 1050px) { 
    width: 95%; 
  }
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: $material-shadow;
  min-height: 150px;
  border-radius: 5px;
  background-color: white;
  margin-bottom: 10px;
  &__subtitle { 
    color: lighten(grey, 15%); 
  }
  &__empty {
    background-color: transparent; box-shadow: none 
  }
  &:hover { cursor: pointer; }
}

.el-select {
  width: 100%;
}
</style>