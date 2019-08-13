<template>
    <div>
        <h2 id='titulo'>Seleccione Departamento</h2>
        <div class="primeSearch">
            <select class="custom-select" @v-for="departamento in departamentos" ref="selectedDepartament">
                <option v-bind:value="departamento.id" v-for="departamento in departamentos">{{departamento.nombre}}</option>
            </select>
            <button @click="getSurveys">Buscar</button>
        </div>
        <!-- <button @click="getResults">Prueba</button> -->
        <div class="selectSurveyContainer">
            <h2 class="encuestatitulo" v-bind:class="{show: showSurveyTitle}">Seleccione una Encuesta para ver sus Resultados</h2>
            <div class="list-group">
                <div class="list-group-item list-group-item-action list-group-item-success lili" v-for="encuesta in encuestas" @click="getResults(encuesta.encuesta.id)">{{encuesta.encuesta.nombre}}</div>
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
        <!-- <canvas id="myChart"></canvas> -->
        {{resultados}}
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
                departamento:0,
                departamentos:{},
                resultados:{},
                encuestas:[],
                showSurveyTitle: false
            }
        },
        created: function(){
            axios.get(raiz+'api/results')
                .then( ({data}) => {
                    this.departamentos= data;
                    // console.log('Se ejecuto created de Vue');
                    // console.log(data)
                })
                .catch((error)=>{
                    console.log(error.response.data)
                })
            ;
        },
        methods: {
            saludo($id){
                console.log($id)
                // console.log('Saludos');
            },
            getSurveys: function(){
                let e=this.$refs.selectedDepartament;
                let value= e.options[e.selectedIndex].value;
                this.departamento= value;
                let este= this;
                axios.get(raiz+`api/results/encuestas/${value}`)
                .then( ({data}) => {
                    // this.departamentos= data;
                    // console.log('Se ejecuto created de Vue'); 
                    este.encuestas=data;
                    console.log(data)
                    este.showSurveyTitle=true;
                })
                .catch((error)=>{
                    console.log(error.response.data)
                })
            ;
            },
            getResults: function(encuesta){
                // console.log(encuesta)
                let este= this;

                axios.post(raiz+'api/results/lolo', {
                    departamento: este.departamento,
                    encuesta: encuesta
                })
                .then(function (response) {
                    let personTypes = JSON.parse(JSON.stringify(response.data));
                    console.dir(personTypes);
                    este.resultados=personTypes;
                    $(function () { $('#exampleModal').modal({ show: true, keyboard: false, backdrop: 'static' }); });


                    // var ctx = document.getElementById('myChart').getContext('2d');
                    // var chart = new Chart(ctx, {
                    //     // The type of chart we want to create
                    //     type: 'pie',

                    //     // The data for our dataset
                    //     data: {
                    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    //         datasets: [{
                    //             label: 'My First dataset',
                    //             backgroundColor: 'rgb(255, 99, 132)',
                    //             borderColor: 'rgb(255, 99, 132)',
                    //             data: [0, 10, 5, 2, 20, 30, 45]
                    //         }]
                    //     },

                    //     // Configuration options go here
                    //     options: {}
                    // });

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