export default {
    data(){
        return{
            dataStatus_ready: false
        }
    },
    methods: {
        dataStatus_fetched(){
            this.dataStatus_ready = true;
            this.$emit('ready')
        }
    }
}