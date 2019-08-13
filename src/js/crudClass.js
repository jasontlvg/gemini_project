// import Vue from 'vue';
import Swal from 'sweetalert2'
export class crudClass {
    constructor() {

    }

    modalButton(exit) {
        let add = document.getElementById('calabaza');
        if(add){
            add.addEventListener('click', function () {
                $(function () { $('#exampleModal').modal({ show: true, keyboard: false, backdrop: exit }); });
            });
        }else{
            console.log('El boton para agregar no esta disponible');
        }
    }

    clearForm() {
        let c = document.getElementById('cancelar');
        if(c){
            c.addEventListener('click', function () {
                let form;
                form = document.getElementById('form');
                console.log(form)
                form.reset();
            });
        }else{
            console.log('El boton de agregar no esta disponible, por lo tanto no hay form que limpiar');
        }
    }

    sendDeleteForm() {
        let ft = document.getElementById('form-trash');
        let b = document.getElementById('submit-button-destroy');
        if (b) {
            b.addEventListener('click', function(){
                console.log('ejecutando');
                event.preventDefault()
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false,
                    })

                    swalWithBootstrapButtons.fire({
                    title: '¿Estas seguro?',
                    text: "¡No podras revertir esto!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si, ¡eliminalo!',
                    cancelButtonText: 'No, ¡abortar!',
                    reverseButtons: true
                    }).then((result) => {
                    if (result.value) {
                        ft.submit()
                    } else if (
                        // Read more about handling dismissals
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                        'Cancelado',
                        'El registro se ha conservado',
                        'error'
                        )
                    }
                    })
            });
        } else {
            console.log('No hay registros');
        }
    }

    modalOpen() {
        let add = document.getElementById('calabaza');
        if (add.classList.contains('isOpen')) {
            console.log('Contiene la clase isOpen');
            $(function () { $('#exampleModal').modal({ show: true, keyboard: false, backdrop: true }); });
        } else {
            console.log('No contiene la clase isOpen');
        }
    }
}