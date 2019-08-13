const x= require('./scss/empleados.scss');
const y= require('./js/bootstrap');
const z= require('popper.js');
const w= require('./js/script.js');

import {crudClass} from './js/crudClass';

let c= new crudClass();
c.modalButton(true);
c.clearForm();
c.sendDeleteForm();
c.modalOpen();