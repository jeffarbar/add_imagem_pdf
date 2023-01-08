import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import VueMask from 'v-mask'
Vue.use(VueMask);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [

        {
            path: '/',
            name: 'loginboxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/Pages/Pdf/Pdf.vue'),
        },
    ]
})
