import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import Map1 from "./map1_component.js"
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: 'view' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }

  handleSave() {
    this.setState({ mode: 'view' });
  }

  handleEdit() {
    this.setState({ mode: 'edit' });
  }


  render() {
    if (this.state.mode === 'view') {
      return (
        <div>
          <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="#home">Flood Zone</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Resources" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={this.handleEdit}>Action</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.handleSave}>Another action</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.handleEdit}>Something</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="address..." className="mr-sm-2" />
                <Button variant="outline-success">Am I in a flood plain?</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <Map1 ></Map1>
        </div>
      );
    }
    else {
      return (
        <div>
          <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="#home">Flood Zone</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Resources" id="basic-nav-dropdown" onSelect={function (evt) { console.log(evt) }}>
                  <NavDropdown.Item onClick={this.handleEdit}>Action</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.handleSave}>Another action</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.handleEdit}>Something</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="address..." className="mr-sm-2" />
                <Button variant="outline-success">Am I in a flood plain?</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>

        </div>
      );
    }
  }

}

export function renderToDOM(container) {
  render(<div />, container);
  render(<Map1 />, container);
}
