<template>
    <div>
        <ul class="nav">
            <li class="nav-item">
                <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'desks'}" class="nav-link">Desk</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "NavbarView",
};
</script>
<style></style>
