<template>
    <div class="container">
        <div class="form-group">
            <input type="text" v-model="desk" class="form-control">
            <button class="btn btn-primary mt-3" @click.prevent="saveName">update</button>
        </div>
        <form class="mt-3">
            <div class="form-group">
                <label for="nameint" class="label-group">Desk list</label>
                <input type="text" id="nameint" class="form-control my-3" v-model="desk_list_name" required>
                <div v-if="errorMessage" class="text-danger" >
                    {{ errorMessage }}
                </div>
            </div>
            <button type="submit" @click.prevent="addDeskList" class="btn btn-primary my-3">Add Desk list</button>
        </form>
        <div class="alert alert-danger" role="alert" v-if="errored">
            error loading data
        </div>
        <div class="d-flex justify-content-center" v-if="isLoading">
            <div class="text-center spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>     
            </div>
            <h2 class="text-primary">Loading...</h2>
        </div>
        <div class="row">
            <div class="col-lg-4" v-for="desk_list in desk_lists">
                <div class="card bg-light mt-3">
                    <div class="card-body">
                        <form @submit.prevent="updateDeskList(desk_list.id, desk_list.name)" v-if="desk_list_input_id == desk_list.id" class="d-flex justify-content-between align-items-center">
                            <input type="text" class="form-control my-3" v-model="desk_list.name" required>
                            <button type="button" @click="desk_list_input_id = null" class="close border-0" area-label="Close">
                                <span area-hidden="true">&times;</span>
                            </button>
                        </form>
                        <h5 v-else class="card-title d-flex justify-content-between align-items-center" style="cursor: pointer;" @click="desk_list_input_id = desk_list.id">{{ desk_list.name }}<i class="fas fa-pencil-alt" style="font-size: 15px;"></i></h5>
                    </div>
                    <button type="button" class="btn btn-danger" @click="deleteDeskList(desk_list.id)">Delete</button>
                    <div>
                        <div class="card m-3 bg-success" v-for="card in desk_list.cards">
                            <div class="card-body p-2">
                                <h5 class="card-title">{{ card.name }}</h5>
                            </div>
                            <button type="button" class="btn btn-danger w-50 m-auto ">Delete</button>
                        </div>
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="cardNames[desk_list.id]">
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '@/sevice/axios'
export default {
    name: 'Show',
    props: [
    'deskId'
    ],
    data(){
        return {
            desk_list_name: '',
            desk: null,
            errored: false,
            isLoading: false,
            desk_lists: '',
            errorMessage: false,
            desk_list_input_id: null,
            cardNames: []
        }
    },
    mounted(){
        this.getDesk()
        this.getDeskLists()
    },
    methods: {
        updateDeskList(id, name){
            this.isLoading = true
            axios.post('/desk-lists/'+id, {
                _method: 'PUT',
                name
            }).then(response => {
                this.isLoading = false
                this.desk_list_input_id = null
            })
        },
        getDeskLists(){
            axios.get('/desk-lists', {
                params: {
                    'desk_id': this.deskId
                }
            }).then(response => {
                this.desk_lists = response.data.data
                this.desk_lists.array.forEach(element => {
                    this.cardNames[element.id] = ''
                });
            })
        },
        async getDesk(){
            this.isLoading = true
            await axios.get('/desks/'+this.deskId).then(response => {
                this.desk = response.data.data.name
                this.isLoading = false
            }).catch(error => {
                this.errored = true
                this.isLoading = false
            })
        },
        saveName(){
            this.isLoading = true
            axios.post('/desks/'+this.deskId, {
                _method: 'PUT',
                name: this.desk
            }).then(response => {
                alert(response.data.message);
                this.isLoading = false
                this.$router.push({name: 'desks'})
            })
        },
        addDeskList(){
            this.isLoading = true
            axios.post('/desk-lists',{name: this.desk_list_name, desk_id: this.deskId})
            .then(response => {
                this.isLoading = false
                alert(response.data.message);
                this.desk_list_name = ''
                this.getDeskLists()
            })   
            .catch (error => {
                this.errorMessage = error.response.data.message
                this.isLoading = false
            })
            .finally((event)=>{
                setTimeout(() => {
                    this.errorMessage = false
                }, 5000);
            })
        },
        deleteDeskList(id){
            this.isLoading = true
            if(confirm('Are you sure you want to delete')){
                axios.post(`/desk-lists/${id}`,{
                    _method: 'DELETE'
                }).then(
                response => {
                    this.isLoading = false
                    alert(response.data.message)
                },
                ).catch(error => {
                    this.isLoading = false
                    alert('desk don`t delete something went wrong!')
                }).finally(()=>{ 
                    this.getDeskLists()
                })
            }
        }
    },
}
</script>
<style>

</style>