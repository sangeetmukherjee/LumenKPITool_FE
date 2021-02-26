import React, { PureComponent } from "react";
import TableContainer from './TableContainer';
import { Navbar, Grid, Row, Col, Container, Button } from 'react-bootstrap'
import axios from 'axios';
import '../Styles/componentStyle.css';

class ParentContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      dataObj: [],
      tableFlag: true,
      conversationId: "",
      checkProps: "Testing Props"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  onSearchClick() {
    if (this.state.conversationId == "") {
      alert("Enter A Valid Conversation Ids")
    }
    else {
      this.setState({ tableFlag: false });
      this.fetchInteractionWithConversationID(this.state.conversationId);
      this.setState({ conversationId: this.state.conversationId });
    }
  }

  handleChange = (e) => {
    this.setState({ conversationId: e.target.value });
  }

  handleKeyDown = (e) => {

    if (e.key === 'Enter') {
      if (e.target.conversationId == '') {
        alert("Please enter a valid Queary");
      } else {
        this.setState({ conversationId: "" });
      }
    }
  }

  onResetClick() {
    this.setState({ tableFlag: true });
    this.setState({ conversationId: "" });
  }

  fetchInteractionWithConversationID = async (conversationId) => {
    let infoArr = []
    const interactionData = //1af9fa55-a4e4-4f3a-864f-967df8e0c6b6
      await axios.get('http://localhost:8000/fetchLumenKpi/' + conversationId)
        .then(function (response) {
          console.log("Fetched Data From Genesys:", response);
          if (response.data.statusCode == "200") {
            let dataInfo = response.data.data;
            infoArr.push(dataInfo);
          } else {
            alert("Unable To Fetch From Genesys");
          }
        })
        .catch(function (error) {
          alert(error);
        })
    this.setState({ dataObj: infoArr });

  }

  onExportClick = async () => {
    const exportCSV =
      await axios.get('http://localhost:8000/exportToCsv')
        .then(function () {
          alert("Exported CSV");
        })
        .catch(function (error) {
          alert(error);
        })
  }

  render() {
    return (
      <div>
        <Navbar className="navBar-Parent">
          <Navbar.Brand className="header-Container">
            <h3 className="header-text">LUMEN</h3>
          </Navbar.Brand>
        </Navbar>
        <Container fluid className="container1">
          <Row>
            <Col>
              <div>
                <div className="form_elements col col-xs-6" >
                  <h3 className="form-header-style">GENERATE GENESYS REPORTS</h3>
                </div>
                <div className="row justify-content-md-center">
                  <div className="col col-md-3" align="end">
                    <label>Enter the Conversation ID :</label>
                  </div>
                  <div className="col col-md-5">
                    <input
                      id="conv_id"
                      type="text"
                      name="conversation-Id"
                      className="form-control"
                      value={ this.state.conversationId }
                      onKeyDown={ this.handleKeyDown }
                      onChange={ this.handleChange }
                      placeholder="enter conversatin id..."
                    />
                  </div>
                </div>
                <div className="button-container">
                  <Button type="button" bsstyle="primary" onClick={ () => this.onSearchClick() }>SEARCH</Button>
                  <Button type="button" className="reset-button-elements" onClick={ () => this.onResetClick() } >RESET</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {this.state.tableFlag ? (<div></div>) : (
          <div>
            <div className="export-Button-Style">
              <button type="button" className="btn btn-outline-info" onClick={ () => this.onExportClick() }>EXPORT</button>
            </div>
            <div>
              <TableContainer
                tableData={ this.state.dataObj }
              />
            </div>
          </div>
        ) }
      </div>
    );
  }
};

export default ParentContainer;