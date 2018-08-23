<template>
    <div>
        <el-dialog
            title="Oops"
            :visible.sync="state.error.isError"
            width="95%">
            <span>{{state.error.message}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setError({
                        error: {
                            isError: false,
                            message: null
                        }
                    })">Ok</el-button>
            </span>
        </el-dialog>

        <el-row v-if="events" type="flex" class="row-bg" justify="space-around">
            <el-collapse>
                <template v-for="event in events">
                    <el-collapse-item :title="event.name" :name="event.name" :key="event.id" class="title" v-bind:class="{ hosting: event.isHosting}">
                        <div>{{event.local_date}} - {{event.local_time}}</div>
                        <div v-if="event.venue">@ {{event.venue.name }} - {{event.venue.address_1}} {{event.venue.city}}</div>
                        <el-button v-if="isMine" @click="getGroup(event.group.urlname, event)">Voir le meetup</el-button>
                        <el-button v-if="!isMine" @click="attendEvent(event)">Participer</el-button>
                    </el-collapse-item>
                </template>
            </el-collapse>
        </el-row>
    </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action, Mutation, State } from 'vuex-class';
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

    @State(state => state) state
    @Action("attendEvent") attendEvent
    @Mutation("setError") setError

    getGroup(urlname, event) {
        this.$router.push({name: "EventDetails", params: { urlname: urlname, id: event.id, hosting: event.isHosting } })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>