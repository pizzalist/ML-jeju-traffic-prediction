import {createWebHistory, createRouter} from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import ("./components/Profile.vue")
const BoardAdmin = () => import ("./components/BoardAdmin.vue")
const BoardModerator = () => import ("./components/BoardModerator.vue")
const BoardUser = () => import ("./components/BoardUser.vue")
const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    }, {
        path: "/home",
        component: Home
    }, {
        path: "/login",
        component: Login
    }, {
        path: "/register",
        component: Register
    }, {
        path: "/profile",
        name: "profile",
        // lazy-loaded
        component: Profile
    }, {
        path: "/admin",
        name: "admin",
        // lazy-loaded
        component: BoardAdmin
    }, {
        path: "/mod",
        name: "moderator",
        // lazy-loaded
        component: BoardModerator
    }, {
        path: "/user",
        name: "user",
        // lazy-loaded
        component: BoardUser
    }
];
const router = createRouter({history: createWebHistory(), routes});
    // 로그안 안되면 초기화면으로 돌아가게
router.beforeEach((to, _from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});
export default router;
