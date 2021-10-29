import {
    HueSupport
} from './hue';

const hueapi = require('node-hue-api');
const LightState = hueapi.model.LightState;

export class HueWheel extends HueSupport {

    constructor(device, featureConfiguration) {
        super();
        super.init(() => {
            this.device = device;
            this.nDevice = device.length;
            this.nRows = featureConfiguration.rows;
            this.nCols = featureConfiguration.cols;
            this.positions = [];
            this.positions.push(0);
            for (let i = 1; i < this.nDevice - 1; i++) {
                this.positions[i] = parseInt(this.nRows / (i + 1));
            }
            this.positions[this.nDevice - 1] = this.nRows;
        });
    }

    start(color) {
        let row = color[0];
        // set wheel effect
        for (let i = 0; i < this.nDevice; i++) {
            let lightstate = new LightState().on().rgb(row[this.positions[i]]);
            this.api.lights.setLightState(this.device[i], lightstate);
        }
    }

    stop() {
        for (let i = 0; i < this.nDevice; i++) {
            this.api.lights.setLightState(this.device[i], new LightState().off());
        }
    }

    destroy() {
        this.stop();
    }
}