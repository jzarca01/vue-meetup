<template>
    <div class="hello" v-loading.fullscreen.lock="state.isInProgress">
        <el-header class="nav">
            <span class="nav-link nav-left" @click="back()"><i class="el-icon-arrow-left"></i></span>
        </el-header>
        <el-collapse v-if="state.selectedEvent.description">
                <el-collapse-item :title="state.selectedEvent.name" :name="state.selectedEvent.name">
                    <div v-html="state.selectedEvent.description"></div>
                </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter, State, Mutation } from 'vuex-class';


@Component
export default class EventDetails extends Vue {
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
    height: 50px;
    padding: 0 0 0 5px;
}
.nav {
    color: #333;
    font-size: 14px;
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
</style>
