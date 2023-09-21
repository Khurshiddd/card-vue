<template>
    <div class="container">
        <div class="form-group">
            <input type="text" v-model="desk" class="form-control">
            <!-- <div class="invalid-feedback">
                please choose a name
            </div> -->
            <button class="btn btn-primary mt-3" @click.prevent="saveName">update</button>
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
import axios from '@/sevice/axios'
export default {
    name: 'Show',
    props: [
    'deskId'
    ],
    data(){
        return {
            desk: null,
            errored: false,
            isLoading: false
        }
    },
    mounted(){
        this.getDesk()
    },
    methods: {
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
            })// .catch(error => {
            //     console.log(error);
            // })
        }
    },
}
</script>
<style>

</style>