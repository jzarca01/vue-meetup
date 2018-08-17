<template>
  <div class="hello" v-loading.fullscreen.lock="state.isInProgress">
    <Hello :user="state.userInfos" v-if="state.userInfos" />
    <el-alert title="Une erreur est survenue" type="error" v-if="state.isError" closable></el-alert>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Mes meetups" :params="{events: state.calendarEvents, isMine: true}" name="CalendarEvents" :disabled="!state.calendarEvents"></el-tab-pane>
        <el-tab-pane label="Prochains meetups" :params="{events: state.upcomingEvents, isMine: false}" name="UpcomingEvents" :disabled="!state.upcomingEvents"></el-tab-pane>
        <el-tab-pane label="Mes groupes" :params="{groups: state.userGroups}" name="Groups" :disabled="!state.userGroups"></el-tab-pane>
      </el-tabs>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';

import Hello from '@/components/Hello.vue';

@Component({
    components: {
        Hello
    }
})
export default class Dashboard extends Vue {
    @State(state => state) state
    @Action('fetchUserInfos') fetchUserInfos
    @Action('fetchUserGroups') fetchUserGroups
    @Action('fetchUpcomingEvents') fetchUpcomingEvents
    @Action('fetchCalendarEvents') fetchCalendarEvents

    data() {
      return {
        activeName: ''
      }
    }

    handleClick(tab, event) {
      this.$router.push({name: tab.name, params: tab.$attrs.params});
    }

    async mounted() {
      try {
        this.fetchUserInfos()
        this.fetchUserGroups()
        this.fetchUpcomingEvents()
        this.fetchCalendarEvents()
      }
      catch(err) {
        console.log(err)
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  router-link {
    border-right: 1px solid black;
  }
  router-link:last-of-type {
    border-right: 0;
  }
  .hello {
    overflow-y: hidden;
  }
</style>
