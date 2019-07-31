
import React, { Component } from 'react';
import MapGL from 'react-map-gl';


export default class Map extends Component {
  state = {
    style: 'mapbox://styles/nickshekelle/cjyrg5pcc26c11cjvbejtc79l',
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      longitude: -120.648,
      latitude: 38.648,
      zoom: 7,
      maxZoom: 16
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  onStyleChange = (style) => {
    this.setState({style});
  }

  _onViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }

  _resize = () => {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  render() {
    return (
      <div>
        <MapGL
          mapboxApiAccessToken='pk.eyJ1Ijoibmlja3NoZWtlbGxlIiwiYSI6ImNqeW90aWhrODE4Y20zbXA3eGNkZ2JsankifQ.ge-O4WjAvMnMBBo8rBpScw'
          {...this.state.viewport}
          mapStyle={this.state.style}
          onViewportChange={viewport => this._onViewportChange(viewport)}
        >
        </MapGL>
      </div>
    );
  }
}

