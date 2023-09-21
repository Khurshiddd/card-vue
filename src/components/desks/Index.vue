<template>
    <div class="container">
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
            desks: [],
            errored: false,
            isLoading: false
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
                }).finally(()=>{ 
                    this.getDesks()
                })
            }
        }
    },
}
</script>
<style>

</style>