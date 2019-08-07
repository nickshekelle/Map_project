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
    var whichmap = null;
  }

  function(evt) {
    this.whichmap = evt
    console.log(this.whichmap)
  }


  render() {
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
                <NavDropdown.Item eventKey="map1">Action</NavDropdown.Item>
                <NavDropdown.Item eventKey="map2">Another action</NavDropdown.Item>
                <NavDropdown.Item eventKey="map3">Something</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="address..." className="mr-sm-2" />
              <Button variant="outline-success">Am I in a flood plain?</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {this.whichmap === "map1" && <Map1></Map1>}
      </div>
    );
  }

}

export function renderToDOM(container) {
  render(<div />, container);
}
