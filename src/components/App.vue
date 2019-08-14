<template>
    <div>
        <h2 id='titulo'>Seleccione Departamento</h2>
        <div class="primeSearch">
            <select @click="saludo" class="custom-select" @v-for="departamento in departamentos" ref="selectedDepartament">
                <option v-bind:value="departamento.id" v-for="departamento in departamentos">{{departamento.nombre}}</option>
            </select>
            <select class="custom-select" ref="selectedSurvey">
                <!-- <option v-bind:value="departamento.id" v-for="departamento in departamentos">{{departamento.nombre}}</option> -->
                <option v-bind:value="encuesta.encuesta.id" v-for="encuesta in encuestas">{{encuesta.encuesta.nombre}}</option>
            </select>
            <button @click="getSurveys">Buscar</button>
        </div>
        <!-- <button @click="getResults">Prueba</button> -->
        <div class="selectSurveyContainer">
            <h2>Resultados de las Preguntas del Departamento '{{departamento.nombre}}' de la Encuesta {{encuesta.nombre}}</h2>
            <div class="list-group" ref="sdsd">
                <div class="list-group-item list-group-item-action list-group-item-success lili" v-for="pregunta in preguntas" @click="getNewResults(pregunta.pivot.encuesta_id,pregunta.id)">{{pregunta.pregunta}}</div>
                <!-- <div class="list-group-item list-group-item-action list-group-item-success lili" v-for="pregunta in preguntas" @click="getNewResults(pregunta.pivot.encuesta_id)">{{pregunta.pregunta}}</div> -->
                
            </div>
        </div>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Resultados</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <canvas id="myChart"></canvas>
        <!-- {{resultados}} -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> 
        <!-- <img src="/img/exia.jpg" alt=""> -->
    </div>
</template>

<script>
    export default{
        data:function(){
            return{
                title: 'Hello World',
                departamento:{},
                encuesta: {},
                departamentos:{},
                resultados:[],
                encuestas:[],
                preguntas:[],
                showSurveyTitle: false,
                respuestas:[]
            }
        },
        created: function(){
            let este=this;
            axios.get(raiz+'api/results')
            .then( ({data}) => {
                this.departamentos= JSON.parse(JSON.stringify(data));
                // console.log(this.departamentos[0]);
                let depId= this.departamentos[0].id;
                let depName= this.departamentos[0].nombre;
                // this.departamento=this.departamentos[0]; //AQUI ESTA EL PROBLEMA
                this.departamento={id:depId,nombre:depName}; //AQUI ESTA EL PROBLEMA
                // Machinima
                axios.get(raiz+`api/results/encuestas/${este.departamento.id}`)
                .then( ({data}) => {
                    // console.log(data)
                    este.encuestas= data;
                    este.encuesta= este.encuestas[0].encuesta;
                    axios.get(raiz+`api/results/encuesta/preguntas/${este.encuesta.id}`)
                        .then( ({data}) => {
                            este.preguntas= data;
                            // console.log('Primer peticion de preguntas:')
                            // console.log(data)
                        
                        })
                        .catch((error)=>{
                            console.log(error.response.data)
                        })
                    })
                .catch((error)=>{
                    console.log(error.response.data)
                })
            })
            .catch((error)=>{
                console.log(error.response.data)
            });

            axios.get(raiz+'api/results/encuesta/respuestas')
            .then(function (response) {
                // handle success
                // console.log(response);
                console.log(JSON.parse(JSON.stringify(response)));
                este.respuestas= JSON.parse(JSON.stringify(response.data));
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        },
        methods: {
            saludo(e){
                // console.log(this.departamento)
                let este=this;
                let l=this.$refs.selectedDepartament;
                let valueDepartament= l.options[l.selectedIndex].value;
                // console.log(valueDepartament + this.departamento.id)
                // console.log(valueDepartament + this.departamento.id)
                if(this.departamento.id == valueDepartament){
                    console.log('YA estas ahi')
                }else{
                    console.log('Buscando')

                    axios.get(raiz+`api/results/encuestas/${valueDepartament}`)
                    .then( ({data}) => {
                        este.encuestas= data;
                        este.encuesta= este.encuestas[0].encuesta;
                        // console.log(data)
                        // este.preguntas= data;
                        // console.log('Primer peticion de preguntas:')
                        // console.log(data)
                    
                    })
                    .catch((error)=>{
                        console.log(error.response.data)
                    })

                    // FALTA que this.departamento se ponga con el valor del departamento seleccionado
                    // tambien que this.encuesta tenga el nuevo
                }
            },
            getSurveys: function(){
                let este= this;
                let e=this.$refs.selectedDepartament;
                let s=this.$refs.selectedSurvey;
                let valueDepartament= e.options[e.selectedIndex].value;
                let nameDepartament= e.options[e.selectedIndex].innerHTML;
                let valueSurvey= s.options[s.selectedIndex].value;
                let nameSurvey= s.options[s.selectedIndex].innerHTML;
                // console.log(`valueDepartament: ${valueDepartament} -- valueSurvey: ${valueSurvey}` )
                console.log(nameSurvey)
                // console.log(nameDepartament)

                axios.get(raiz+`api/results/encuesta/preguntas/${valueSurvey}`)
                            .then( ({data}) => {
                                este.preguntas= data;
                                // // Actualizando el departamento de Vue
                                este.departamento.id= valueDepartament;
                                este.departamento.nombre= nameDepartament;

                                // // Actualizando la variable encuesta de Vue
                                este.encuesta.id=valueSurvey;
                                este.encuesta.nombre= nameSurvey;
                            
                            })
                            .catch((error)=>{
                                console.log(error.response.data)
                            })

                // axios.get(raiz+`api/results/encuesta/preguntas/${valueSurvey}`)
                // .then(function (response) {
                //     // handle success
                //     let p= JSON.parse(JSON.stringify(response));
                //     este.preguntas= response;
                //     console.log(p.data);
                // })
                // .catch(function (error) {
                //     // handle error
                //     console.log(error);
                // })
                
            },
            getResults: function(encuesta){
                // console.log(encuesta)
                // let este= this;

                // axios.post(raiz+'api/results/lolo', {
                //     departamento: este.departamento,
                //     encuesta: encuesta
                // })
                // .then(function (response) {
                //     let personTypes = JSON.parse(JSON.stringify(response.data));
                //     console.dir(personTypes);
                //     este.resultados=personTypes;
                    // $(function () { $('#exampleModal').modal({ show: true, keyboard: false, backdrop: 'static' }); });



                // })
                // .catch(function (error) {
                    //     console.log(error);
                // });
            },
            getNewResults:function(encuesta_id,pregunta_id){
                let este=this;
                let departamento_id= this.departamento.id;
                // console.log(encuesta_id)
                // console.log(pregunta_id)
                // console.log(departamento_id)
                axios.post(raiz+'api/results/encuesta', {
                    departamento_id: departamento_id,
                    encuesta_id: encuesta_id,
                    pregunta_id: pregunta_id
                })
                .then(function (response) {
                    console.log(response.data);
                    este.resultados=response.data;

                    $(function () { $('#exampleModal').modal({ show: true, keyboard: false, backdrop: 'static' }); });
                    var ctx = document.getElementById('myChart').getContext('2d');
                    var chart = new Chart(ctx, {
                            // The type of chart we want to create
                        type: 'pie',

                        // The data for our dataset
                        data: {
                                labels: este.respuestas,
                                datasets: [{
                                    label: 'My First dataset',
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgb(255, 99, 132)',
                                    data: este.resultados
                                }]
                        },

                        // Configuration options go here
                        options: {}
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });

            }
        },
    }
</script>

<style>
    h1{
        color:red;
    }

    .primeSearch{
        display: flex;
        margin-top: 1em;
    }

    .lili{
        cursor: pointer;
    }

    .encuestatitulo{
        margin-top: 1em;
        display: none;
    }

    .encuestatitulo.show{
        display: block;
    }
</style>