import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import Map1 from "./map1_component.js"
import Map2 from "./map2_component.js"
import Map3 from "./map3_component.js"
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { view: 'map1' };

    this.change_to_map1 = this.change_to_map1.bind(this);
    this.change_to_map2 = this.change_to_map2.bind(this);
    this.change_to_map3 = this.change_to_map3.bind(this);
  }

  change_to_map1() {
    this.setState({ view: 'map1' });
  }

  change_to_map2() {
    this.setState({ view: 'map2' });
  }

  change_to_map3() {
    this.setState({ view: 'map3' });
  }

  render() {
    if (this.state.view === 'map1') {
      return (
        <div>
          <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="#home">Flood Zone</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Maps" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={this.change_to_map1}>Map1</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.change_to_map2}>Map2</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.change_to_map3}>Map3</NavDropdown.Item>
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
    else if (this.state.view === "map2") {
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
                  <NavDropdown.Item onClick={this.change_to_map1}>Map1</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.change_to_map2}>Map2</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.change_to_map3}>Map3</NavDropdown.Item>
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
    } else if (this.state.view === "map3") {
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
                  <NavDropdown.Item onClick={this.change_to_map1}>Map1</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.change_to_map2}>Map2</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.change_to_map3}>Map3</NavDropdown.Item>
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
}
