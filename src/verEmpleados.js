const x= require('./scss/verEmpleados.scss');
const y= require('./js/bootstrap');
const z= require('popper.js');

$(function() {$('#exampleModal').modal({show: true,keyboard: false,backdrop: 'static'});});

import Vue from 'vue';
const app = new Vue({
    el: '#formContainer',
    data: {
        title: "Detalles de Empleado",
        activatedSaveButton: false
    },
    methods:{
        prime: function(){
            this.activatedSaveButton= !this.activatedSaveButton;
            let inputs,selects, cb;
            inputs = document.getElementsByTagName('input');
            selects = document.getElementsByTagName('select');
            
            for(let i=1; i<inputs.length; i++){
                inputs[i].toggleAttribute("disabled");
            }
    
            for(let i=0; i<selects.length; i++){
                selects[i].toggleAttribute("disabled");
            }
        }
    }
    ,
    created(){
        let x= document.getElementById('tlx');
        let clone;
        if(x.classList[1] == 'editarEmpleados'){
            console.log('exito');
            clone= document.getElementById('clone');
            clone.style.display='none';
        }else{
            let inputs,selects;
            inputs = document.getElementsByTagName('input');
            selects = document.getElementsByTagName('select');
            for(let i=1; i<inputs.length; i++){
                inputs[i].setAttribute("disabled", true)
            }
            for(let i=0; i<selects.length; i++){
                selects[i].setAttribute("disabled", true);
            }
        }

        // console.log(x.classList[1]);
    }
});