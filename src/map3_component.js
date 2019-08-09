import React, { Component } from 'react';
import { render } from 'react-dom';
import { StaticMap } from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import { scaleThreshold } from 'd3-scale';


// Set your mapbox token here
const MAPBOX_TOKEN = "pk.eyJ1Ijoibmlja3NoZWtlbGxlIiwiYSI6ImNqeW90aWhrODE4Y20zbXA3eGNkZ2JsankifQ.ge-O4WjAvMnMBBo8rBpScw"; // eslint-disable-line

// Source data GeoJSON
const DATA_URL =
    'https://raw.githubusercontent.com/nickshekelle/Map_project/master/Black_Rockfish_Mean_Density__North_Central_Coast__201011__PISCO_%5Bds1358%5D.geojson'; // eslint-disable-line

export const COLOR_SCALE = scaleThreshold()
    .domain([-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2])
    .range([
        [65, 182, 196],
        [127, 205, 187],
        [199, 233, 180],
        [237, 248, 177],
        // zero
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
    longitude: -120.648,
    latitude: 38.648,
    zoom: 7,
    maxZoom: 16,
    bearing: 0
};

export default class Map1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveredObject: null
        };
        this._onHover = this._onHover.bind(this);
        this._renderTooltip = this._renderTooltip.bind(this);
    }

    _onHover({ x, y, object }) {
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
                getFillColor: f => COLOR_SCALE(0),
                getLineColor: [255, 255, 255],
                pickable: true,
                onHover: this._onHover
            })
        ];
    }

    _renderTooltip() {
        const { x, y, hoveredObject } = this.state;
        return (
            hoveredObject && (
                <div className="tooltip" style={{ top: y, left: x }}>
                    <div>
                        <b>Average Property Value</b>
                    </div>
                    <div>
                        <div>${hoveredObject.properties.valuePerParcel} / parcel</div>
                        <div>
                            ${hoveredObject.properties.valuePerSqm} / m<sup>2</sup>
                        </div>
                    </div>
                    <div>
                        <b>Growth</b>
                    </div>
                    <div>{Math.round(hoveredObject.properties.growth * 100)}%</div>
                </div>
            )
        );
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
            </DeckGL>
        );
    }
}

export function renderToDOM(container) {
    render(<Map1 />, container);
}
