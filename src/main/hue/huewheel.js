import {
    HueSupport
} from './hue';

const hueapi = require('node-hue-api');
const LightState = hueapi.model.LightState;

export class HueWheel extends HueSupport {

    constructor(device, featureConfiguration) {
        super();
        this.device = device;
        var device = device;
        this.nDevice = device.length;
        this.nRows = featureConfiguration.rows;
        this.nCols = featureConfiguration.cols;
        this.positions = [];
        this.positions.push(0);
        for (let i = 1; i < this.nDevice - 1; i++) {
            this.positions[i] = parseInt(this.nRows / (i + 1));
        }
        this.positions[this.nDevice - 1] = this.nRows;
        this.id = 0;
    }

    init(callback) {
        let i = 0;
        this.device.forEach(element => {
            this.api.lights.setLightState(element, new LightState().on());
            i++
        })
        callback();
    }

    start(color) {
        if (this.id == this.nDevice) {
            this.id = 0;
        }
        let row = color[0];
        // set wheel effect
        let lightstate = new LightState().rgb(row[this.positions[this.id]]);
        this.api.lights.setLightState(this.device[this.id], lightstate);
        this.id++;
    }

    stop() {
        let i = 0;
        this.device.forEach(element => {
            this.api.lights.setLightState(element, new LightState().off());
            i++
        });
        //this.api = undefined;
    }

    destroy() {
        this.stop();
    }
}