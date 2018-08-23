<template>
    <div class="hello" v-loading.fullscreen.lock="state.isInProgress">
        <header class="nav">
            <span class="nav-link nav-left" @click="back()"><i class="el-icon-arrow-left"></i></span>
            <h1>{{state.selectedEvent.name}}</h1>
        </header>
        <el-collapse v-if="state.selectedEvent.description">
                <el-collapse-item title="Description" name="Description">
                    <div v-html="state.selectedEvent.description"></div>
                </el-collapse-item>
                <el-collapse-item v-if="state.selectedEvent.attendance.length" title="RSVP" name="RSVP" style="display: block">
                    <template v-for="attendance in state.selectedEvent.attendance">
                        <div v-bind:key="attendance.member.id" class="rsvp_item">
                            <avatar :image="attendance.member.photo.thumb_link" v-if="attendance.member.photo"></avatar>
                            <p>{{ attendance.member.name }}</p>
                        </div>
                    </template>
                </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action, Getter, State, Mutation } from 'vuex-class';

import Avatar from 'vue-avatar-component';

@Component({
  components: {
    Avatar
  }
})
export default class EventDetails extends Vue {
    @Prop()
    urlname

    @Prop()
    id

    @Prop()
    hosting

    @State(state => state) state
    @Mutation('setSelectedEvent') setSelectedEvent
    @Action('fetchEventDetails') fetchEventDetails

    async mounted() {
        this.setSelectedEvent({selectedEvent: this.$route.params})
        this.fetchEventDetails()
    }

    back() {
        this.$router.push({name: "Dashboard"})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
el-header {
    margin: 0;
    padding: 0 0 0 5px;
}
.nav {
    color: #333;
    font-size: 14px;
    min-height: 3rem;
    height: auto;
}
.nav-left {
    float: left;
    margin-left: -4px;
}
.nav-link {
    cursor: pointer;
    transition: .3s;
}
header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;
    letter-spacing: .02em;
    font-weight: 400;
    box-sizing: border-box;
    float: left;
}
.rsvp_item {
    display: flex;
}
.rsvp_item .avatar, p {
    margin: 5px;
    display: inline;
}

</style>
