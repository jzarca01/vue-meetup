<template>
    <el-row v-if="events" type="flex" class="row-bg" justify="space-around">
        <el-collapse>
            <template v-for="event in events">
                <el-collapse-item :title="event.name" :name="event.name" :key="event.id" @click="getGroup(event.link)" class="title" v-bind:class="{ hosting: event.isHosting}">
                    <div>{{event.local_date}} - {{event.local_time}}</div>
                    <div v-if="event.venue">@ {{event.venue.name }} - {{event.venue.address_1}} {{event.venue.city}}</div>
                    <div v-html="event.description"></div>
                    <el-button v-if="!isMine" @click="attend(event.id)">Participer</el-button>
                </el-collapse-item>
            </template>
        </el-collapse>
    </el-row>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Avatar from 'vue-avatar-component';

@Component({
  components: {
    Avatar
  }
})
export default class Events extends Vue {
    @Prop()
    events

    @Prop()
    isMine

    @Action("attendEvent") attendEvent

    getGroup(urlName) {
        console.log("group infos", urlName)
        this.$router.push({name: "Dashboard"})
    }

    async attend(eventId) {
        this.attendEvent(eventId)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>