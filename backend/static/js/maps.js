function imgsplit() {
    $("#splitform").append("<input type = 'file' name = 'myfile' id='myfile'>")
    $("#mos").val('1');
    $("#myfile").attr('value', '1')

}
function ammsplit() {
    $("#splitform").append('<input type="text" placeholder="Amount of bill" name="ammount">')
    $("#mos").attr('value', '2');
}
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
});

searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
});

console.log(Cookies.get('csrftoken'));

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyc2hhbC0wOTAyIiwiYSI6ImNreGQ4dHB5aTEzY2IycHBnbXYzZ2pxdXAifQ.Gf9W5Ns9MkS9MQDjk9PB9Q';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/harshal-0902/cl9tyr861003o14o4ce5j3vuk',
    zoom: 18,
    center: [35.398056, 33.585556],
    pitch: 60,
    antialias: true
});

const modelOrigin = [35.398056, 33.585556];
const modelAltitude = 0;
const modelRotate = [Math.PI / 2, 0, 0];

map.addControl(new mapboxgl.NavigationControl());

const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
);

const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
};

const THREE = window.THREE;

const customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        const loader = new THREE.GLTFLoader();
        loader.load(
            '/static/3D_models/temple_of_eshmun-_detail_area/scene.gltf',
            (gltf) => {
                this.scene.add(gltf.scene);
            }
        );
        this.map = map;

        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });

        this.renderer.autoClear = false;
    },
    render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
            .makeTranslation(
                modelTransform.translateX,
                modelTransform.translateY,
                modelTransform.translateZ
            )
            .scale(
                new THREE.Vector3(
                    modelTransform.scale,
                    -modelTransform.scale,
                    modelTransform.scale
                )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
};

map.on('style.load', () => {
    map.addLayer(customLayer, 'waterway-label');
});