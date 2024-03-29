import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { scaleThreshold } from 'd3-scale';


// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1Ijoibmlja3NoZWtlbGxlIiwiYSI6ImNqeW90aWhrODE4Y20zbXA3eGNkZ2JsankifQ.ge-O4WjAvMnMBBo8rBpScw"; // eslint-disable-line

// Source data GeoJSON
const DATA_URL =
  'https://raw.githubusercontent.com/nickshekelle/Map_project/master/Black_Rockfish_Mean_Density__North_Central_Coast__201011__PISCO_%5Bds1358%5D.geojson'; // eslint-disable-line

export const COLOR_SCALE = scaleThreshold()
  .domain([0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
  ]);

const INITIAL_VIEW_STATE = {
  width: window.innerWidth,
  height: window.innerHeight,
  longitude: -123.626,
  latitude: 38.825,
  zoom: 8.5,
  maxZoom: 16,
  bearing: 10,
  pitch: 60
};

export default class Map1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredObject: null
    };
  }

  _onHover = ({ x, y, object }) => {
    this.setState({ x, y, hoveredObject: object });
  }

  _renderLayers() {
    const { data = DATA_URL } = this.props;

    return [
      new GeoJsonLayer({
        id: 'geojson',
        data,
        opacity: 0.8,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        fp64: true,
        getElevation: f => Math.sqrt(f.properties.BlackRF2010and2011) * 1000,
        getFillColor: f => COLOR_SCALE(f.properties.BlackRF2010and2011 * 10),
        getLineColor: [255, 255, 255],
        pickable: true,
        onHover: this._onHover
      })
    ];
  }

  _renderTooltip = () => {
    const { x, y, hoveredObject } = this.state;
    return (
      hoveredObject && (
        <div className="tooltip" style={{ top: y, left: x, opacity: 1 }}>
          <div>
            <b>China Rockfish Density</b>
          </div>
          <div>
            <div>{Math.round(hoveredObject.properties.BlackRF2010and2011 * 10000) / 1000} / 100m<sup>2</sup></div>
          </div>
        </div>
      )
    );
  }

  renderLegend = () => {
    var legend = document.createElement('legend')
    var layers = ["0-4", "4-8", "8-12", "12-16", "16-20", "20-24", "24-28", "28-32", "32-36", "36-40", "40-44", "44-48", "48+"]
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];
      var color = COLOR_SCALE.range[i];
      var item = document.createElement('div');
      var key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = color;

      var value = document.createElement('span');
      value.innerHTML = layer;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
      return (
        <h1>
          <li>{layers}</li>
        </h1>
      );
    }

  }

  render() {
    const { mapStyle = 'mapbox://styles/nickshekelle/cjz4qge2k07wx1cpg1jsri6we' } = this.props;

    return (
      <DeckGL layers={this._renderLayers()} initialViewState={INITIAL_VIEW_STATE} controller={true}>
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
        {this._renderTooltip}
        {this.renderLegend}
      </DeckGL>
    );
  }
}
