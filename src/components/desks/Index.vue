<template>
    <div class="container">
        <form>
            <div class="form-group">
                <label for="namein" class="label-group">Name Desk</label>
                <input type="text" id="namein" class="form-control my-3" v-model="name">
                <div v-if="errorMessage" class="text-danger">
                    {{ errorMessage }}
                </div>
            </div>
            <button type="submit" @click.prevent="addDesk" class="btn btn-primary my-3">Add Desk</button>
        </form>
        <div class="row">
            <div class="col-lg-4" v-for="desk in desks">
                <div class="card mt-3">
                    <router-link :to="{name: 'show', params: {deskId: desk.id}}" class="card-body">
                        <h5 class="card-title text-center">{{ desk.name }}</h5>
                    </router-link>
                    <button type="button" class="btn btn-danger" @click="deleteDesk(desk.id)">Delete</button>
                </div>
            </div>
        </div>
        <div class="alert alert-danger" role="alert" v-if="errored">
            error loading data
        </div>
        <div class="d-flex justify-content-center" v-if="isLoading">
            <div class="text-center spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>     
            </div>
            <h2 class="text-primary">Loading...</h2>
        </div>
    </div>
</template>
<script>
import axios from '@/sevice/axios';
export default {
    name: 'Index',
    data(){
        return {
            name: '',
            desks: [],
            errored: false,
            isLoading: false,
            errorMessage: null
        }
    },
    mounted(){
        this.getDesks()
    },
    methods: {
        async getDesks(){
            this.isLoading = true
            await axios.get('/desks').then(response => {
                this.desks = response.data.data
                this.isLoading = false
            }).catch(error => {
                this.errored = true
                this.isLoading = false
            })
        },
        deleteDesk(id){
            if(confirm('Are you sure you want to delete')){
                axios.post(`/desks/${id}`,{
                    _method: 'DELETE'
                }).then(
                response => {
                    alert(response.data.message)
                },
                ).catch(error => {
                    console.log(error);
                    alert('desk don`t delete something went wrong!')
                }).finally(()=>{ 
                    this.getDesks()
                })
            }
        },
        addDesk(){
            axios.post('/desks',{name: this.name})
            .then(response => {
                alert(response.data.message);
                this.name = ''
                this.getDesks()
            })   
            .catch (error => {
                this.errorMessage = error.response.data.message
            })
        }
    },
}
</script>
<style>

</style>