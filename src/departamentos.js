const x= require('./scss/departamentos.scss');
const y= require('./js/bootstrap');
const z= require('popper.js');

import {crudClass} from './js/crudClass';

let c= new crudClass();
c.modalButton(true);
c.clearForm();