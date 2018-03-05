import React, { Component } from 'react';
import * as server from '../../lib/server';
import * as options from './options';
import { loadModules } from 'esri-loader';
import './../css/Map.css';
import logo from '../../logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableLayer: true
    };
  }

  componentDidMount() {
    loadModules(options.esriModules)
    .then(async ([MapView, WebMap, SketchViewModel, Graphic, GraphicsLayer, FeatureLayer]) => {
      const webmap = new WebMap({
        basemap: 'streets'
      });

      let featureLayer;

      try {
        featureLayer = new FeatureLayer({
          url: server.urlEndpoints.military
        });
      } catch (e) {
        this.setState({
          availableLayer: false,
        });
      }
      webmap.add(featureLayer);

      const view = new MapView({
        container: 'viewDiv',
        map: webmap,
        zoom: 3
      });

      view.when(() => {
        let sketchViewModel = new SketchViewModel(options.sketchModel(view, featureLayer));

        view.on('click', evt => {
          view.hitTest(evt).then(response => {
            if (response.results.length > 0 && response.results[0].graphic) {
              let dropPolygonButton = document.getElementById('deleteBtn');
              const dropState = dropPolygonButton.classList.contains('active');
              if(dropState) {
                featureLayer.applyEdits({
                  deleteFeatures: [response.results[0].graphic],
                });
                dropPolygonButton.classList.remove('active');
              }
            }
          });
        });

        const setActiveButton = selectedButton => {
          view.focus();
          let elements = document.getElementsByClassName('active');
          [...elements].map(ui => ui.classList.remove('active'));
          if (selectedButton) {
            selectedButton.classList.add('active');
          }
        };

        sketchViewModel.on('draw-complete', evt => {
          if (evt.geometry.type === 'polygon') {
            featureLayer.applyEdits({
              addFeatures: [evt.graphic],
            });
            setActiveButton();
          }
        });

        const drawPolygonButton = document.getElementById('polygonButton');
        drawPolygonButton.onclick = () => {
          sketchViewModel.create('polygon');
          setActiveButton(drawPolygonButton);
        };

        const dropPolygonButton = document.getElementById('deleteBtn');
        dropPolygonButton.onclick = () => {
          setActiveButton(dropPolygonButton);
        };

      });
    });
  }

  render() {
    if (this.state.availableLayer) {
      return (
        <div id="viewDiv">
          <img src={logo} className="logo" alt="logo" />
          <div id="topbar">
            <button className="action-button esri-icon-polygon" id="polygonButton" type="button" title="Draw polygon"></button>
            <button className="action-button esri-icon-trash" id="deleteBtn" type="button" title="Delete polygon"></button>
          </div>
        </div>
      );
    } else {
      return <div>service not available</div>;
    }
  }
}

export default App;
