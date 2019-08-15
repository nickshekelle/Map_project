import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { scaleThreshold } from 'd3-scale';


// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1Ijoibmlja3NoZWtlbGxlIiwiYSI6ImNqeW90aWhrODE4Y20zbXA3eGNkZ2JsankifQ.ge-O4WjAvMnMBBo8rBpScw";

// Source data GeoJSON
const DATA_URL =
    'https://raw.githubusercontent.com/nickshekelle/Map_project/master/Cancer_Rates.geojson';

export const COLOR_SCALE = scaleThreshold()
    .domain([0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000])
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
    longitude: -87.900,
    latitude: 42.279,
    zoom: 9.6,
    maxZoom: 16,
    bearing: 5,
    pitch: 60
};

export default class Map3 extends Component {
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
                getElevation: f => f.properties.All_Cancer,
                getFillColor: f => COLOR_SCALE(f.properties.All_Cancer),
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
                        <b>Cancer Rates</b>
                    </div>
                    <div>
                        <div>All Cancer: {Math.round(hoveredObject.properties.All_Cancer)} per 100,000 persons</div>
                        <div>Breast Cancer: {Math.round(hoveredObject.properties.Breast_Can)} per 100,000 persons</div>
                        <div>Colorectal Cancer: {Math.round(hoveredObject.properties.Colorectal)} per 100,000 persons</div>
                        <div>Lung Cancer: {Math.round(hoveredObject.properties.Lung_Bronc)} per 100,000 persons</div>
                        <div>Prostate Cancer: {Math.round(hoveredObject.properties.Prostate_C)} per 100,000 persons</div>
                        <div>Urinary Cancer: {Math.round(hoveredObject.properties.Urinary_Sy)} per 100,000 persons</div>
                    </div>
                </div>
            )
        );
    }

    render() {
        const { mapStyle = 'mapbox://styles/nickshekelle/cjyrg5pcc26c11cjvbejtc79l' } = this.props;

        return (
            <DeckGL layers={this._renderLayers()} initialViewState={INITIAL_VIEW_STATE} controller={true}>
                <StaticMap
                    reuseMaps
                    mapStyle={mapStyle}
                    preventStyleDiffing={true}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                />
                {this._renderTooltip}
            </DeckGL>
        );
    }
}
