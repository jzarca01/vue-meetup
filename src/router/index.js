import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
import EventDetails from '@/views/EventDetails'

import Groups from '@/components/Groups'
import Events from '@/components/Events'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "Login" }
    },
    {
      path: "/login",
      component: Login,
      name: "Login"
    },
    {
      path: "/Dashboard",
      meta: { auth: true },
      component: Dashboard,
      name: "Dashboard",
      children: [
        {
          path: "upcoming_events",
          name: "UpcomingEvents",
          component: Events,
          props: true
        },
        {
          path: "calendar_events",
          name: "CalendarEvents",
          component: Events,
          props: true
        },
        {
          path:"groups",
          name:"Groups",
          component: Groups,
          props: true
        }
      ]
    },
    {
      path: "/events/:urlname/:id",
      meta: { auth: true },
      component: EventDetails,
      name: "EventDetails"
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.auth) && !store.state.isAuthenticated) {
    next({ name: "Login" })
  } else {
    next()
  }
})

export default router