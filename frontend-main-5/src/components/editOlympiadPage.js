import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "regenerator-runtime/runtime";
import history from "../history";
class EditOlympiadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      type: "",
      level: "",
      classes: "",
      directions: "",
      dateCompetition: "",
      dateRegistration: "",
      organization: "",
    };
    
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleClassesChange = this.handleClassesChange.bind(this);
    this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
    this.handleDateCompetitionChange = this.handleDateCompetitionChange.bind(this);
    this.handleDateRegistrationChange = this.handleDateRegistrationChange.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);

  }
  handleNameChange(evt) {
    this.setState({ name: evt.target.value });
  }
  handleDescriptionChange(evt) {
    this.setState({ description: evt.target.value });
  }
  handleTypeChange(evt) {
    this.setState({ type: evt.target.value });
  }
  handleLevelChange(evt) {
    this.setState({ level: evt.target.value });
  }
  handleClassesChange(evt) {
    this.setState({ classes: evt.target.value });
  }
  handleDirectionsChange(evt) {
    this.setState({ directions: evt.target.value });
  }
  handleDateCompetitionChange(evt) {
    this.setState({ dateCompetition: evt.target.value });
  }
  handleDateRegistrationChange(evt) {
    this.setState({ dateRegistration: evt.target.value });
  }
  handleOrganizationChange(evt) {
    this.setState({ organization: evt.target.value });
  }
  handleEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    axios
      .get(
        process.env.BACKEND_URL + "/editolympiad?name=" + this.state.name + "&description=" + this.state.description + "&type=" + this.state.type + "&level=" + this.state.level + "&classes=" + this.state.classes + "&directions=" + this.state.directions + "&dateCompetition=" + this.state.dateCompetition + "&dateRegistration=" + this.state.dateRegistration + "&organization=" + this.state.organization + "&id=" + id,
        { withCredentials: true }
      )
      .then((response) => {
        
      })
      history.push("/admin");
  }
  handleBack() {
      history.push("/admin"); 
  }
  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    axios
      .get(
        process.env.BACKEND_URL + "/getolympiadinfo?id=" + id,
        { withCredentials: true }
      )
      .then((response) => { 
        this.setState({ name: response.data[0]["name"] });
        this.setState({ description: response.data[0]["description"] });
        this.setState({ type: response.data[0]["type"] });
        this.setState({ level: response.data[0]["level"] });
        this.setState({ classes: response.data[0]["classes"] });
        this.setState({ directions: response.data[0]["directions"] });
        this.setState({ dateCompetition: response.data[0]["date_competition"] });
        this.setState({ dateRegistration: response.data[0]["date_registration"] });
        this.setState({ organization: response.data[0]["organization"] });
        
      })
  }
  render() {
    const {
       name,
      description,
      type,
      level,
      classes,
      directions,
      dateCompetition,
      dateRegistration,
      organization
    } = this.state;
    
      return (
        <div className="App">
          <div className="main-add-page">
            <div className="header-text">
              <p className = "title">Административная панель</p>
              <p className = "text">Олимпиада: {name}</p>
            </div>
            <div className="form-group">
              <label for="nameInput">Название</label>
              <input type="name" className="form-control" value={name} id="name" placeholder="Название олимпиады" onChange={this.handleNameChange}/>
              <label for="descriptionInput">Краткое описание</label>
              <input type="description" className="form-control" value={description} id="description" placeholder="Описание олимпиады" onChange={this.handleDescriptionChange}/>
              <label for="typeInput">Тип участия</label>
              <input type="type" className="form-control" value={type} id="type" placeholder="Тип участия" onChange={this.handleTypeChange}/>
              <label for="levelInput">Уровень</label>
              <input type="level" className="form-control" value={level} id="level" placeholder="Уровень" onChange={this.handleLevelChange}/>
              <label for="classesInput">Классы</label>
              <input type="classes" className="form-control" value={classes} id="classes" placeholder="Классы" onChange={this.handleClassesChange}/>
              <label for="directionsInput">Направления</label>
              <input type="directions" className="form-control" value={directions} id="directions" placeholder="Направления" onChange={this.handleDirectionsChange}/>
              <label for="dateCompetitionInput">Дата проведения</label>
              <input type="dateCompetition" className="form-control" value={dateCompetition} id="dateCompetition" placeholder="Дата проведения" onChange={this.handleDateCompetitionChange}/>
              <label for="dateRegistrationInput">Дата регистрации</label>
              <input type="dateRegistration" className="form-control" value={dateRegistration} id="dateRegistration" placeholder="Дата регистрации" onChange={this.handleDateRegistrationChange}/>
              <label for="organizationInput">Организатор</label>
              <input type="organization" className="form-control" value={organization} id="organization" placeholder="Организатор" onChange={this.handleOrganizationChange}/>
            </div>
            <div className="buttons">
                <button
                type="submit"
                className="btn btn-primary"
                onClick={() => this.handleEdit()}
                >
                <span className="glyphicon glyphicon-record" />
                Сохранить
                </button>
                <button
                type="submit"
                className="btn btn-primary"
                onClick={() => this.handleBack()}
                >
                <span className="glyphicon glyphicon-record" />
                Назад
                </button>
            </div>
          </div>
        </div>
      );
    
  }
}

export default EditOlympiadPage;