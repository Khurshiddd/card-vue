<template>
    <div class="row">
        <form class="col-lg-5 text-center m-auto">
            <h3>Login</h3>
            <div class="form-group">
                <label for="emailLabel" class="form-label">Email</label>
                <input type="email" id="emailLabel" v-model="email" class="form-control" required placeholder="example@mail.com">
            </div>
            <div class="form-group">
                <label for="emailInput" class="form-label">Password</label>
                <input type="password" id="emailInput" v-model="password" class="form-control" required placeholder="***********">
            </div>
            <button class="btn btn-primary mt-3" :disabled="isLoading" @click.prevent="login">Login</button>
        </form>
    </div>
</template>
<script>
import {setItem} from '@/helpers/storage'; 
import axios from '@/service/axios';
export default {
    name: 'Login',
    data(){
        return {
            email: null,
            password: null,
            isLoading: null
        }
    },
    methods: {
        login(){
            this.isLoading = true
            axios.post('/auth/login',{email: this.email, password: this.password})
            .then(response => {
                console.log(response);
                setItem('token',response.data.access_token)
                this.isLoading = false
            })
            .catch(error => {
                console.log(error);
                this.isLoading = false
            })
            .finally(()=>{
                this.email = '',
                this.password = ''
                this.$router.push({name: 'home'})
            })
        }
    }
}
</script>
<style>

</style>