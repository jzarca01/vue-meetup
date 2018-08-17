import Vue from 'vue';
import Vuex from 'vuex';
import VueAxios from 'vue-axios'
import axios from 'axios';

Vue.use(Vuex);
Vue.use(VueAxios, axios)

const rootStore = {
    state: {
        isAuthenticated: false,
        isInProgress: false,
        isError: false,
        userInfos: {},
        userGroups: [],
        upcomingEvents: [],
        calendarEvents: [],
    },
    getters: {
        isAuthenticated (state) {
            return state.isAuthenticated
        },
        getUser (state) {
            return state.userInfos
        },
        getUserId (state) {
            return state.userInfos.id
        }
    },
    mutations: {
        setAuthenticated (state, payload) {
            state.isAuthenticated = payload.isAuthenticated
            return state
        },
        setUserInfos (state, payload) {
            state.userInfos = payload.data
            return state
        },
        setError (state, payload) {
            state.isError = payload.isError
            return state
        },
        setLoading (state, payload) {
            state.isInProgress = payload.isInProgress
            return state
        },

        setUserInfos (state, payload) {
            state.userInfos = payload
            return state
        },
        setUserGroups (state, payload) {
            state.userGroups = payload
            return state
        },
        setUpcomingEvents (state, payload) {
            state.upcomingEvents = payload
            return state
        },
        setCalendarEvents (state, payload) {
            state.calendarEvents = payload
            return state
        }
    },
    actions: {
        setAuth({commit}) {
            commit('setAuthenticated', {
                isAuthenticated: true
            })
        },
        setError({commit, payload}) {
            commit('setError', {
                isError: payload.isError
            })
        },
        setLoading({commit, payload}) {
            commit('setLoading', {
                isInProgress: payload.isInProgress
            })
        },
        async fetchUserInfos({commit}) {
            try {
                commit('setError', {
                    isError: false
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const response = await this._vm.axios.get('http://localhost:4000/api/2/member/self?provider=meetup')
                commit('setUserInfos', response.data)
                commit('setLoading', {
                    isInProgress: false
                })
            }
            catch(err) {
                console.log(err)
                commit('setError', {
                    isError: true
                })
                commit('setLoading', {
                    isInProgress: false
                })
            }
        },
        async fetchUserGroups({commit}) {
            try {
                commit('setError', {
                    isError: false
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const response = await this._vm.axios.get('http://localhost:4000/api/self/groups?provider=meetup')
                commit('setUserGroups', response.data)
                commit('setLoading', {
                    isInProgress: false
                })
            }
            catch(err) {
                console.log(err)
                commit('setError', {
                    isError: true
                })
                commit('setLoading', {
                    isInProgress: false
                })
            }
        },
        async fetchUpcomingEvents({commit, getters}) {
            try {
                commit('setError', {
                    isError: false
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const response = await this._vm.axios.get('http://localhost:4000/api/find/upcoming_events?provider=meetup')
                commit('setUpcomingEvents', response.data.events)
                commit('setLoading', {
                    isInProgress: false
                })
            }
            catch(err) {
                console.log(err)
                commit('setError', {
                    isError: true
                })
                commit('setLoading', {
                    isInProgress: false
                })
            }
        },
        async fetchCalendarEvents({commit, getters}) {
            try {
                commit('setError', {
                    isError: false
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const calendarEvents = await this._vm.axios.get('http://localhost:4000/api/self/calendar?provider=meetup')
                const hostedEvents = await Promise.all(calendarEvents.data.map(async calendarEvent => {
                    const hosts = await this._vm.axios.get(`http://localhost:4000/api/${calendarEvent.group.urlname}/events/${calendarEvent.id}/hosts?provider=meetup`)

                    if(hosts.data.find(host => parseInt(host.id) === parseInt("14259186"))) {
                        return {...calendarEvent, isHosting: true}
                    }
                    return {...calendarEvent, isHosting: false}
                }))
                await commit('setCalendarEvents', hostedEvents)
                await commit('setLoading', {
                    isInProgress: false
                })
            }
            catch(err) {
                console.log(err)
                commit('setError', {
                    isError: true
                })
                commit('setLoading', {
                    isInProgress: false
                })
            }
        }
    }
}

const store = new Vuex.Store(rootStore)

export default store;
