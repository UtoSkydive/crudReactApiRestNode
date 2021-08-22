import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      pais: "",
      modeUpdate: false,
      personas: [],
      id: "",
      paises: [],
      error:null
    };
    this.addPersona = this.addPersona.bind(this);
    this.editPersona = this.editPersona.bind(this);
  }
  //get personas
  async getPersonas() {
    const res = await fetch("/personas");
    const data = await res.json();
    console.log(data);
    this.setState({ personas: data });
  }
  async getPaises() {
    const res = await fetch("https://restcountries.herokuapp.com/api/v1");
    const data = await res.json();
    // console.log(data[0].name.common);
    this.setState({ paises: data });
  }
  componentDidMount() {
    this.getPersonas();
    this.getPaises();
  }

  //metodos
  async addPersona(e) {
    e.preventDefault();
    if (!this.state.nombre.trim()) {
      console.log("nombre Vacio");
      this.setState({
          error:'Debes Escribir un nombre'
      })
      return;
    }
    if (!this.state.pais.trim()) {
      console.log("pais Vacio");
      this.setState({
        error:'Debes Seleccionar un pais'
    })
      return;
    }
    let data = {
      nombre: this.state.nombre,
      pais: this.state.pais,
    };
    try {
      const savePersona = await fetch("/personas/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await savePersona.json();
      console.log(result);
      this.setState({
        nombre: "",
        pais: "",
        error:null
      });
      this.getPersonas();
    } catch (error) {
      console.log(error);
    }
  }

  async editPersona(e) {
    e.preventDefault();
    if (!this.state.nombre.trim()) {
      console.log("Elemento Vacio");
      this.setState({
        error:'Debes Escribir un nombre'
        })
      return;
    }
    if (!this.state.pais.trim()) {
      console.log("Elemento Vacio");
      this.setState({
        error:'Debes Seleccionar un pais'
    })
      return;
    }
    let data = {
      nombre: this.state.nombre,
      pais: this.state.pais,
    };
    try {
      const editPersona = await fetch(`/personas/${this.state.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await editPersona.json();
      console.log(result);
      this.setState({
        nombre: "",
        pais: "",
        modeUpdate: false,
        id: "",
        error:null
      });
      this.getPersonas();
    } catch (error) {
      console.log(error);
    }
  }

  updatePersona(persona) {
    console.log(persona);
    this.setState({
      modeUpdate: true,
      nombre: persona.nombre,
      pais: persona.pais,
      id: persona.id,
    });
  }

  async deletetPersona(id) {
    if (confirm("Estas Seguro de Eliminar esta Perosna")) {
      await fetch(`/personas/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      this.getPersonas();
    }
  }
  render() {
    return (
      <div className="container mt-5">
        <h1 className="text-center">Crud Pesonas</h1>
        <hr />
        <div className="row">
          <div className="col-8">
            <h4 className="text-center">Lista De Personas</h4>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Pais</th>
                  <th scope="col">Accion</th>
                </tr>
              </thead>
              <tbody>
                {this.state.personas.length === 0 ? (
                    <tr>
                        <td>No hay registros</td>
                    </tr>
                
                ) : (
                  this.state.personas.map((persona,idx) => (
                    <tr key={persona.id}>
                      <td>{idx+1}</td>
                      <td>{persona.nombre}</td>
                      <td>{persona.pais}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm float-right mx-2"
                          onClick={() => this.updatePersona(persona)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm float-right mx-2"
                          onClick={() => this.deletetPersona(persona.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <h4 className="text-center">
              {this.state.modeUpdate ? "Editar Persona" : "Agregar Persona"}
            </h4>
            <form
              onSubmit={
                this.state.modeUpdate ? this.editPersona : this.addPersona
              }
            >
            {
                this.state.error ? (<div className="alert alert-danger" role="alert">
                    {this.state.error}
                </div>):null
            }
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese Nombre"
                onChange={(e) => this.setState({ nombre: e.target.value })}
                value={this.state.nombre}
              />
              {/* <input
                type="text"
                className="form-control mb-2"
                placeholder="Ingrese Pais"
                onChange={(e) => this.setState({ pais: e.target.value })}
                value={this.state.pais}
              /> */}
              <select
                className="form-select  mb-2"
                aria-label="Default select example"
                onChange={(e) => this.setState({ pais: e.target.value })}
                
              >
                {this.state.paises.map((pais, id) => (
                  <option value={pais.name.common} key={id}>
                    {pais.name.common}
                  </option>
                ))}
                <option defaultValue>Open this select menu</option>
              </select>
              {this.state.modeUpdate ? (
                <button type="submit" className="btn btn-warning w-100">
                  Editar
                </button>
              ) : (
                <button type="submit" className="btn btn-dark w-100">
                  Agregar
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
