import React, { Component } from "react";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "regenerator-runtime/runtime";
import history from "../history";
const rowCount = 1000;
const rowHeight = 180;
class OlympiadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      olympiadInformation: undefined,
    };
    
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  handleRedirect(link) {
    window.open(link);
  }
  handleBack() {
      history.push("/"); 
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
        this.setState({ olympiadInformation: response.data });
        this.setState({ isLoading: false });
      })
    
  }

  
  render() {
    const {
      isLoading
    } = this.state;
    if (isLoading) {
      return <div className="App"></div>;
    }
    if (!isLoading) {
      return (
        <div className="App">
          <div className="main-olympiad-page">
            <div className="olympiad-header-info">
              <div className="olympiad-header-info-left">
                <p className="title">{this.state.olympiadInformation[0]['name']}</p>
                <p className="text">{this.state.olympiadInformation[0]['level']} уровень, {this.state.olympiadInformation[0]['type']}</p>
              </div>
              <div></div>
              <div className="olympiad-header-info-right">
              </div>
            </div>
            <div className="olympiad-main-info">
              <div className="olympiad-main-info-left">
                <img src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg" alt="" />
              </div>
              <div className="olympiad-main-info-center">
                <p className="info-key">Описание</p>
                <p className="info-value">{this.state.olympiadInformation[0]['description']}</p>
                <p className="info-key">Форма участия</p>
                <p className="info-value">{this.state.olympiadInformation[0]['type']}</p>
                <p className="info-key">Классы</p>
                <p className="info-value">{this.state.olympiadInformation[0]['classes']} классы</p>
                <p className="info-key">Направления</p>
                <p className="info-value">{this.state.olympiadInformation[0]['directions']}</p>
                <p className="info-key">Организатор</p>
                <p className="info-value">{this.state.olympiadInformation[0]['organization']}</p>
              </div>
              <div className="olympiad-main-info-right">
                <button
                type="submit"
                className="btn btn-default filter-col btn-user-form btn-get-user"
                onClick={() => this.handleRedirect('https://yandex.ru')}
                >
                <span className="glyphicon glyphicon-record" />
                Перейти на сайт мероприятия
                </button>
              </div>
            </div>
            <div className="olympiad-main-footer">
                <button
                type="submit"
                className="btn btn-outline-secondary"
                onClick={() => this.handleBack()}
                >
                <span className="glyphicon glyphicon-record" />
                Вернуться назад
                </button>
              </div>
          </div>
      </div>
      );
    }
  }
}

export default OlympiadPage;