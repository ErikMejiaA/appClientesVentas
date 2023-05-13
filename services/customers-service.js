import { CustomerModel } from "../models/customer-model.js";

const formularioData = document.querySelector('#fromDatos'); //llamamos al formulario 

document.addEventListener('DOMContentLoaded', () => {
    //aqui van las funciones para cuando se carge el DOM
    getCustomers();

});

//funcion para ver y ocultar las diferentes seciones de la pagina
document.querySelectorAll(".menu").forEach((val, posi) => {
    val.addEventListener('click', (e) => {
        let dato = JSON.parse(e.target.dataset.veryocultar);
        let ver = document.querySelector(dato[0])
        ver.style.display = "block"
        dato[1].forEach(item => {
            let ocultar = document.querySelector(item);
            ocultar.style.display = "none";
        })
        e.preventDefault();
        e.stopImmediatePropagation();
    });
});

//URL de la fetch API
//const URL_API = "https://645284b8a2860c9ed40e8114.mockapi.io/";
const URL_API = "http://localhost:3000/"
let idUser = ''; //para guardar el id del cliente 

//creación del  Metodo (POST) ingresar nueva información
const myHeaders = new Headers({
    "Content-Type": "application/json" //encabesado
});
const postCustomers = (datos) => {
    fetch(`${URL_API}customers`,
        {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        }
    ).then(res => {
        return res.json()
    }).then(res => {
        idUser = res.id;
        console.log(res)
    }).catch(error => {
        console.log(error)
    })
}

//creación del  Metodo (PUT) para editar informacion 
const putCustomers = (datos) => {
    fetch(`${URL_API}customers/${idUser}`,
        {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify(datos)
        }
    ).then(res => {
        return res.json()
    }).then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    })
}

//creación del  Metodo (DELETE) para eliminar informacion 
const deleteCustomers = (datos) => {
    fetch(`${URL_API}customers/${idUser}`,
        {
            method: "DELETE",
            headers: myHeaders,
            body: JSON.stringify(datos)
        }
    ).then(res => {
        return res.json()
    }).then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    })
}

//estraer datos de una API Metodo (GET)
async function getCustomers() {

    try {
        const response = await fetch(`${URL_API}customers`); //se le adiciona el endpoints que es /cumtomers (GET)
        console.log(response);

        if (response.status === 200) {
            const data = await response.json();
            viewDataHtml(data);

        } else if (response.status === 401) {
            console.log("Pusiste la llave mal")

        } else if (response.status === 404) {
            console.log("El cliente que bsucas no exixte")

        } else {
            console.log("Hubo un error y no sabemos que paso:")
        }

    } catch (error) {
        console.log(error)
    }
}

//funcion para habilitar y desabilitar botones
document.querySelectorAll(".btn").forEach((boton) => {
    boton.addEventListener('click', (e) => {
        let botonDato = JSON.parse(e.target.dataset.habilitardesabilitar);
        botonDato[0].forEach(item1 => {
            let botonHabilitar = document.querySelector(item1);
            botonHabilitar.disabled = false;
        });
        botonDato[1].forEach(item2 => {
            let desabilitar = document.querySelector(item2);
            desabilitar.disabled = true;
        });
    });
});

//---------------guardar la informacion del cliente-------------------------
document.querySelector('#guardarCliente').addEventListener('click', (e) => {
    const datos = Object.fromEntries(new FormData(formularioData).entries())
    console.log(datos);
    postCustomers(datos);

    e.preventDefault();
    e.stopImmediatePropagation();
});

//---------------editar informacion del cliente-------------------------
/*document.querySelector('#editarCliente').addEventListener('click', (e) => {
    const datos = Object.fromEntries(new FormData(formularioData).entries())
    console.log(datos);
    putCustomers(datos);

    e.preventDefault();
    e.stopImmediatePropagation();
});*/

//---------------eliminar informacion del cliente-------------------------
/*document.querySelector('#eliminarCliente').addEventListener('click', (e) => {
    const datos = Object.fromEntries(new FormData(formularioData).entries())
    console.log(datos);
    deleteCustomers(datos);

    e.preventDefault();
    e.stopImmediatePropagation();
});*/

//------------------limpiar el formulario----------------------
document.querySelector('#nuevoCliente').addEventListener('click', (e) => {
    for (let frmitem of formularioData) {

        if (frmitem.id == 'createdAt') {
            frmitem.valueAsDate = new Date();
            //frmitem.setAttribute("readonly","");

        } else {

            frmitem.value = '';
        }
    }
    e.preventDefault();
    e.stopImmediatePropagation();
});

//Listar los clientes 
function viewDataHtml(dataCustomers) {
    console.log(dataCustomers);

    let tablaClientes = document.querySelector('tbody');
    let clienteHTML = '';
    dataCustomers.forEach((cliente) => {
        const filas = document.createElement('tr');
        filas.innerHTML = /* html */ `
            <td>${cliente.id}</td>
            <td>${cliente.nombres}</td>
            <td>${cliente.apellidos}</td>
            <td>${cliente.email}</td>
            <td>${cliente.nroMovil}</td>
            <td>${cliente.fechaNacimiento}</td>
            <td>
                <button type="button" class="btn btn-info" id="${cliente.id}" class="editar">Editar</button>
                <button type="button" class="btn btn-warning" id="${cliente.id}" class="eliminar">Eliminar</button>
            </td>
        `;
        tablaClientes.appendChild(filas);
    });
}