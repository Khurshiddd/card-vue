<template>
    <div class="row">
        <form class="col-lg-5 text-center m-auto">
            <h3>Register</h3>
            <div class="form-group">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" v-model="name" class="form-control" required placeholder="John">
            </div>
            <div class="form-group">
                <label for="emailLabel" class="form-label">Email</label>
                <input type="email" id="emailLabel" v-model="email" class="form-control" required placeholder="example@mail.com">
            </div>
            <div class="form-group">
                <label for="emailInput" class="form-label">Password</label>
                <input type="password" id="emailInput" v-model="password" class="form-control" required placeholder="***********">
            </div>
            <button class="btn btn-primary mt-3" :disabled="isLoading" @click.prevent="register">register</button>
        </form>
    </div>
</template>
<script> 
import axios from '@/service/axios';
export default {
    name: 'Register',
    data(){
        return {
            name: null,
            email: null,
            password: null,
            isLoading: null
        }
    },
    methods: {
        register(){
            this.isLoading = true
            axios.post('/auth/register', {
                name: this.name,
                email: this.email,
                password: this.password,
            }).then(response => {
                console.log(response);
                this.isLoading = false
                this.$router.push({name: 'login'})
            }).catch(error => { 
                this.isLoading = false
                console.log(error);
            }).finally(()=>{
                this.name = '',
                this.email = '',
                this.password = ''
            })
        }
    }
}
</script>
<style>
    
</style>