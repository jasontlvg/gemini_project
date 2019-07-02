const x= require('./scss/editarEmpleados.scss');

let a= document.getElementById('lala');
let g= document.getElementById('girlIcon');
let b= document.getElementById('boyIcon');

// alert('as;ldksal;k');
a.addEventListener('click', function(e){
    if(e.target.value == 'Masculino'){
        b.classList.remove('disabled');
        g.classList.remove('active');
        console.log('Cambiando a Masculino');
    }else if(e.target.value == 'Femenino'){
        g.classList.add('active');
        b.classList.add('disabled');
        console.log('Cambiando a Femenino');
    }
});