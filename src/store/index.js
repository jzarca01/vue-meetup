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
        error: {
            isError: false,
            message: null
        },
        userInfos: {},
        userGroups: [],
        upcomingEvents: [],
        calendarEvents: [],
        selectedEvent: null
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
        },
        getSelectedEvent (state) {
            return state.selectedEvent
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
            state.error = payload.error
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
        },
        setSelectedEvent (state, payload) {
            state.selectedEvent = payload.selectedEvent
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
                error: payload.error
            })
        },
        setLoading({commit, payload}) {
            commit('setLoading', {
                isInProgress: payload.isInProgress
            })
        },
        async attendEvent({commit, actions}, selectedEvent) {
            try {
                commit('setError', {
                    error: {
                        isError: false,
                        message: null
                    }
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const response = await this._vm.axios({
                    method: 'POST',
                    url: `http://localhost:4000/api/${selectedEvent.group.urlname}/events/${selectedEvent.id}/rsvps`,
                    params: {
                        agree_to_refund: true,
                        guests: 0,
                        opt_to_pay: true,
                        pro_email_share_optin: false,
                        response: "yes"
                    }
                })
                actions.fetchCalendarEvents()
                commit('setLoading', {
                    isInProgress: false
                })
            }
            catch(err) {
                if(err.response && err.response.data.errors[0].code === "member_error") {
                    console.log("member error")
                    commit('setError', {
                        error: {
                            isError: true,
                            message: "Vous ne pouvez pas participer à un meetup d'un groupe dont vous n'êtes pas membre"
                        }
                    })
                }
                else {
                    commit('setError', {
                        error: {
                            isError: true,
                            message: "Une erreur est survenue"
                        }
                    })
                }
                commit('setLoading', {
                    isInProgress: false
                })
            }
        },
        async fetchUserInfos({commit}) {
            try {
                commit('setError', {
                    error: {
                        isError: false,
                        message: null
                    }
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const response = await this._vm.axios.get('http://localhost:4000/api/2/member/self')
                commit('setUserInfos', response.data)
                commit('setLoading', {
                    isInProgress: false
                })
            }
            catch(err) {
                console.log(err)
                commit('setError', {
                    error: {
                        isError: true
                    }
                })
                commit('setLoading', {
                    isInProgress: false
                })
            }
        },
        async fetchUserGroups({commit}) {
            try {
                commit('setError', {
                    error: {
                        isError: false,
                        message: null
                    }
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const response = await this._vm.axios.get('http://localhost:4000/api/self/groups')
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
        async fetchUpcomingEvents({commit}) {
            try {
                commit('setError', {
                    error: {
                        isError: false,
                        message: null
                    }
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const response = await this._vm.axios.get('http://localhost:4000/api/find/upcoming_events')
                commit('setUpcomingEvents', response.data.events)
                commit('setLoading', {
                    isInProgress: false
                })
            }
            catch(err) {
                console.log(err)
                commit('setError', {
                    error: {
                        isError: true
                    }
                })
                commit('setLoading', {
                    isInProgress: false
                })
            }
        },
        async fetchCalendarEvents({commit}) {
            try {
                commit('setError', {
                    error: {
                        isError: false,
                        message: null
                    }
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const calendarEvents = await this._vm.axios.get('http://localhost:4000/api/self/calendar')
                const hostedEvents = await Promise.all(calendarEvents.data.map(async calendarEvent => {
                    const hosts = await this._vm.axios.get(`http://localhost:4000/api/${calendarEvent.group.urlname}/events/${calendarEvent.id}/hosts`)

                    if(hosts.data.find(host => parseInt(host.id) === parseInt("14259186"))) {
                    // if(hosts.data.find(host => parseInt(host.id) === getters.getUserId )) {
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
                    error: {
                        isError: true
                    }
                })
                commit('setLoading', {
                    isInProgress: false
                })
            }
        },
        async fetchEventDetails({commit, getters}) {
            try {
                const selectedEvent = getters.getSelectedEvent
                commit('setError', {
                    error: {
                        isError: false,
                        message: null
                    }
                })
                commit('setLoading', {
                    isInProgress: true
                })
                const response = await Promise.all([
                    this._vm.axios.get(`http://localhost:4000/api/${selectedEvent.urlname}/events/${selectedEvent.id}`),
                    this._vm.axios.get(`http://localhost:4000/api/${selectedEvent.urlname}/events/${selectedEvent.id}/rsvps`)
                ])
                console.log(response)
                commit('setSelectedEvent', {selectedEvent : {...response[0].data, attendance: response[1].data, ...selectedEvent}})
                commit('setLoading', {
                    isInProgress: false
                })
            }
            catch(err) {
                console.log(err)
                commit('setError', {
                    error: {
                        isError: true
                    }
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
