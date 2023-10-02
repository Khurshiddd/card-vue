<template>
    <div>
        <form action="">
        <div class="form-group">
            <label for="emailLabel" class="form-label">Email</label>
            <input type="email" id="emailLabel" v-model="email" class="form-control" placeholder="example@mail.com">
        </div>
        <div class="form-group">
            <label for="emailInput" class="form-label">Password</label>
            <input type="password" id="emailInput" v-model="password" class="form-control" placeholder="***********">
        </div>
        <button class="btn btn-primary mt-5" @click.prevent="login">Login</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Login',
    data(){
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login(){
            axios.post('http://127.0.0.1:8000/login',{email: this.email, password: this.password})
            .then(response => {
                console.log(response);
            })
        }
    }
}
</script>
<style>
    
</style>