<template>
    <div>
        <ul class="nav d-flex">
            <template v-if="isLoggedIn">
                <li class="nav-item">
                    <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'desks'}" class="nav-link">Desk</router-link>
                </li>
            </template>
            <template v-else class="justify-content-end">
                <li class="nav-item">
                    <router-link :to="{name: 'login'}" class="nav-link">Login</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'register'}" class="nav-link">Register</router-link>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
export default {
    name: "NavbarView",
    data(){
        return {
            isLoggedIn: true
        }
    }
};
</script>
<style></style>
