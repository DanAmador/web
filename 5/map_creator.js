let selectedKey = "birth_rate_per_1000"
let currRange = getRange(selectedKey)



function getRange(label) {
  let maxVal = 0;
  let minVal = 0;

  world_data.forEach(obj => {
    let curr = obj[label]
    maxVal = Math.max(maxVal, curr)
    minVal = Math.min(minVal, curr)
  })

  return { "max": maxVal, "min": minVal }
}
function getData(){
  return world_data.map(curr => {

    let currVal = curr[selectedKey];
    let { max, min } = currRange;
    let normalizedSize = (currVal - min) / (max - min)
    let colorIdx = Math.floor(normalizedSize * 6)
    console.log(normalizedSize, colorIdx)

    return {
      lat: curr["gps_lat"],
      lng: curr["gps_long"],
      size: normalizedSize,
      color: colors[colorIdx]
    }
  
  });
}


let colors = [
"#ffffb2",
"#fed976",
"#feb24c",
"#fd8d3c",
"#fc4e2a",
"#e31a1c",
"#b10026"
]

// https://github.com/vasturiano/three-globe/blob/master/example/basic/index.html
let gData = getData()

const Globe = new ThreeGlobe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .pointsData(gData)
  .pointAltitude('size')
  .pointColor('color');


// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globeViz').appendChild(renderer.domElement);

// Setup scene
const scene = new THREE.Scene();
scene.add(Globe);
scene.add(new THREE.AmbientLight(0xbbbbbb));
scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

// Setup camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
camera.position.z = 500;

// Add camera controls
const tbControls = new THREE.TrackballControls(camera, renderer.domElement);
tbControls.minDistance = 101;
tbControls.rotateSpeed = 5;
tbControls.zoomSpeed = 0.8;

// Kick-off renderer
(function animate() { // IIFE
  // Frame cycle
  tbControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
})();


const selectElement = document.querySelector('#labelPicker');
selectElement.onchange =function onLabelChange(newLabel){
  selectedKey = newLabel.srcElement.value;
  currRange = getRange(selectedKey);
  gData = getData();
  Globe.pointsData(gData)
};


const materialPicker = document.querySelector('#materialPicker');
materialPicker.onchange =function onLabelChange(newLabel){
  let url = newLabel.srcElement.value;
  Globe.globeImageUrl(url)
};