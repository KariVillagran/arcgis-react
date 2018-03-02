
const sketchModel = (view, tempGraphicsLayer) => ({
  view: view,
  layer: tempGraphicsLayer,
  pointSymbol: {
    type: 'simple-marker',
    style: 'square',
    color: '#8A2BE2',
    size: '16px',
    outline: {
      color: [255, 255, 255],
      width: 3
    }
  },
  polylineSymbol: {
    type: 'simple-line',
    color: '#8A2BE2',
    width: '4',
    style: 'dash'
  },
  polygonSymbol: {
    type: 'simple-fill',
    color: 'rgba(138,43,226, 0.8)',
    style: 'solid',
    outline: {
      color: 'white',
      width: 1
    }
  }
});

const esriModules = [
  'esri/views/MapView',
  'esri/WebMap',
  'esri/widgets/Sketch/SketchViewModel',
  'esri/Graphic',
  'esri/layers/GraphicsLayer',
  'esri/layers/FeatureLayer',
  'dojo/domReady!',
];

export {
  sketchModel,
  esriModules,
};
