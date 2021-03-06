import React, { Component } from "react";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "regenerator-runtime/runtime";
import history from "../history";
const rowCount = 1000;
const rowHeight = 180;
class OlympiadsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      isLoading: true,
      olympiadsInformation: undefined,
    };
    this.renderRow = this.renderRow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGet = this.handleGet.bind(this);
    
  }
  handleChange(evt) {
    this.setState({ searchValue: evt.target.value });
  }
  handleGet(value) {
      history.push("olympiad?id=" + value); 
  }

  handleSubmit() {
    this.setState({ isLoading: true });
    axios
      .get(
        process.env.BACKEND_URL + "/olympiads?search_value=" + this.state.searchValue,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({ olympiadsInformation: response.data });
        this.setState({ isLoading: false });
      })
  }
  

  async componentDidMount() {
    axios
      .get(
        process.env.BACKEND_URL + "/olympiads",
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({ olympiadsInformation: response.data });
        this.setState({ isLoading: false });
      })
    
  }

  renderRow({ index, key, style }) {
    return (
      <div key={key} style={style} className="row">
        <div className="content">
          
            <div className="olympiad-element">
              <div className="olympiad-image">
                <img src="https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg" alt="" />
              </div>
              <div className="olympiad-name">
                <p className="olympiad-name-title">
                  {this.state.olympiadsInformation[index].name}
                </p>
                <p>{this.state.olympiadsInformation[index].description}</p>
                  <p className="olympiad-name-dates">
                      ???????? ????????????????????:<span>{this.state.olympiadsInformation[index].date_competition}</span><br/>
                      ???????? ??????????????????????:<span>{this.state.olympiadsInformation[index].date_registration}</span>
                  </p>
              </div>
              <div className="olympiad-level">
              {this.state.olympiadsInformation[index].level}
              </div>
              <div className="olympiad-type">
              {this.state.olympiadsInformation[index].type}
              </div>
              <div className="olympiad-directions">
              {this.state.olympiadsInformation[index].directions}
              </div>
              <div className="olympiad-classes">{this.state.olympiadsInformation[index].classes}</div>
              <div className="olympiad-more">
                <button
                type="submit"
                className="btn btn-default filter-col btn-user-form btn-get-user"
                onClick={() => this.handleGet(this.state.olympiadsInformation[index].id)}
                >
                <span className="glyphicon glyphicon-record" />
                ??????????????????
                </button>
                </div>
            </div>
        </div>
      </div>
    );
  }
  render() {
    const {
      isLoading,
      searchValue
    } = this.state;
    if (isLoading) {
      return <div className="App"></div>;
    }
    if (!isLoading) {
      return (
        <div className="App">
          <div className="search-form">
            <div className="input-group">
              <div className="form-outline">
                <input type="search" id="form1" value ={searchValue} placeholder = "?????????? ???? ????????????????, ??????????????????????, ????????????, ???????? ??????????????" className="form-control" onChange={this.handleChange}/>
                
              </div>
              <button type="button" className="btn btn-primary search-btn" onClick={() => this.handleSubmit()}>
                ??????????
              </button>
            </div>
            <div></div>
            <button type="button" className="btn btn-primary">???????? ??????????????????????</button>
            <div></div>
            <button type="button" className="btn btn-primary">???????? ????????????????????</button>
          </div>
          <div className="content">
            <div className="nav-info">
              <div></div>
              <div>????????????????</div>
              <div>??????????????</div>
              <div>?????? ??????????????</div>
              <div>??????????????????????</div>
              <div>????????????</div>
              <div></div>
            </div>
            <div className="list">
              <AutoSizer>
                {({ width, height }) => {
                  return (
                    <List
                      width={width}
                      height={600}
                      rowHeight={rowHeight}
                      rowRenderer={this.renderRow}
                      rowCount={this.state.olympiadsInformation.length}
                      overscanRowCount={3}
                    />
                  );
                }}
              </AutoSizer>
            </div>
          </div>
      </div>
      );
    }
  }
}

export default OlympiadsForm;