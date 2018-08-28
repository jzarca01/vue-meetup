<template>
    <div class="hello" v-loading.fullscreen.lock="state.isInProgress">
        <header class="nav">
            <span class="nav-link nav-left" @click="back()"><i class="el-icon-arrow-left"></i></span>
            <h1>{{state.selectedEvent.name}}</h1>
        </header>
        <el-button plain type="primary" class="emarge-button" v-if="state.selectedEvent.hosting && isSameDay()">Emarger les participants</el-button>
        <el-collapse v-if="state.selectedEvent.description" v-model="activePanel" accordion>
                <el-collapse-item title="Description" name="Description">
                    <div v-html="state.selectedEvent.description"></div>
                </el-collapse-item>
                <el-collapse-item v-if="state.selectedEvent.attendance.length" :title="'Liste des participants ('+state.selectedEvent.attendance.length+')'" name="RSVP" class="rsvp-container">
                    <template v-for="attendance in state.selectedEvent.attendance">
                        <div v-bind:key="attendance.member.id" class="rsvp-item">
                            <div class="image-name">
                                <avatar :image="attendance.member.photo.thumb_link" v-if="attendance.member.photo"></avatar>
                                <avatar :fullname="attendance.member.name" v-if="!attendance.member.photo"></avatar>
                                <p>{{ attendance.member.name }}</p>
                            </div>
                            <div class="attendance">
                                80%
                            </div>
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

    data() {
        return {
            activePanel: "Description"
        }
    }

    isSameDay() {
        return this.$moment().isSame(this.state.selectedEvent.local_date, 'day')
    }
    

    async mounted() {
        this.setSelectedEvent({selectedEvent: this.$route.params})
        await this.fetchEventDetails()
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
.emarge-button {
    margin: 10% 2%;
    font-weight: bold;
}
.rsvp-container {
    display: block;
}
.rsvp-item {
    display: flex;
    padding: 5%;
}
.image-name {
    display: inline-flex;
    width: 70%
}
.image-name.avatar, p {
    margin: 5px;
    display: inline;
}
.attendance {
    display: inline-flex;
    width: 25%;
    justify-content: flex-end;
}

</style>
