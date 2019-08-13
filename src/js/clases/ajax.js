export class Ajax{
    saludo(){
        axios.get('http://geminigold.com/api/admin/results')
            .then( ({data}) => {
                console.log(data)
            })
            .catch((error)=>{
                console.log(error.response.data)
            })
        ;
    }

    vue(){
        
    }
}