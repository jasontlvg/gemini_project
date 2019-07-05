// import Vue from 'vue';
export class crudClass{
    constructor(){

    }

    modalButton(exit){
        let add= document.getElementById('calabaza');
        add.addEventListener('click', function(){
            $(function() {$('#exampleModal').modal({show: true,keyboard: false,backdrop: exit});});
        });
    }

    clearForm(){
        let c= document.getElementById('cancelar');
        c.addEventListener('click', function(){
            let form;
            form = document.getElementById('form');

            console.log(form)
            form.reset();
        });
    }
}