import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "regenerator-runtime/runtime";
import history from "../history";
class AddOlympiadPage extends Component {
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
    
    this.handleAdd = this.handleAdd.bind(this);
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
  handleAdd() {
    axios
      .get(
        process.env.BACKEND_URL + "/addolympiad?name=" + this.state.name + "&description=" + this.state.description + "&type=" + this.state.type + "&level=" + this.state.level + "&classes=" + this.state.classes + "&directions=" + this.state.directions + "&dateCompetition=" + this.state.dateCompetition + "&dateRegistration=" + this.state.dateRegistration + "&organization=" + this.state.organization,
        { withCredentials: true }
      )
      .then((response) => {
        
      })
      history.push("/admin");
  }
  handleBack() {
      history.push("/admin"); 
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
              <p className = "title">???????????????????????????????? ????????????</p>
              <p className = "text">???????????????? ?????????? ??????????????????</p>
            </div>
            <div className="form-group">
              <label for="nameInput">????????????????</label>
              <input type="name" className="form-control" value={name} id="name" placeholder="???????????????? ??????????????????" onChange={this.handleNameChange}/>
              <label for="descriptionInput">?????????????? ????????????????</label>
              <input type="description" className="form-control" value={description} id="description" placeholder="???????????????? ??????????????????" onChange={this.handleDescriptionChange}/>
              <label for="typeInput">?????? ??????????????</label>
              <input type="type" className="form-control" value={type} id="type" placeholder="?????? ??????????????" onChange={this.handleTypeChange}/>
              <label for="levelInput">??????????????</label>
              <input type="level" className="form-control" value={level} id="level" placeholder="??????????????" onChange={this.handleLevelChange}/>
              <label for="classesInput">????????????</label>
              <input type="classes" className="form-control" value={classes} id="classes" placeholder="????????????" onChange={this.handleClassesChange}/>
              <label for="directionsInput">??????????????????????</label>
              <input type="directions" className="form-control" value={directions} id="directions" placeholder="??????????????????????" onChange={this.handleDirectionsChange}/>
              <label for="dateCompetitionInput">???????? ????????????????????</label>
              <input type="dateCompetition" className="form-control" value={dateCompetition} id="dateCompetition" placeholder="???????? ????????????????????" onChange={this.handleDateCompetitionChange}/>
              <label for="dateRegistrationInput">???????? ??????????????????????</label>
              <input type="dateRegistration" className="form-control" value={dateRegistration} id="dateRegistration" placeholder="???????? ??????????????????????" onChange={this.handleDateRegistrationChange}/>
              <label for="organizationInput">??????????????????????</label>
              <input type="organization" className="form-control" value={organization} id="organization" placeholder="??????????????????????" onChange={this.handleOrganizationChange}/>
            </div>
            <div className="buttons">
                <button
                type="submit"
                className="btn btn-primary"
                onClick={() => this.handleAdd()}
                >
                <span className="glyphicon glyphicon-record" />
                ????????????????
                </button>
                <button
                type="submit"
                className="btn btn-primary"
                onClick={() => this.handleBack()}
                >
                <span className="glyphicon glyphicon-record" />
                ??????????
                </button>
            </div>
          </div>
        </div>
      );
    
  }
}

export default AddOlympiadPage;