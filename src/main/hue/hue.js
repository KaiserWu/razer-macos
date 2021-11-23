const hueapi = require('node-hue-api');
export class HueSupport {
    constructor(username) {
        this.username = username;
        // for debug
        if (this.username == undefined) {
            this.username = 'WbZT5NyzwWjDMA8NRT0vAy-qr8JjIpf5gUlfkT3A';
        }
    }
    connect(callback) {
        hueapi.discovery.nupnpSearch()
            .then(searchResults => {
                return hueapi.api.createLocal(searchResults[0].ipaddress).connect(this.username);
            })
            .then(api => {
                this.api = api;
                callback(this)
            })
    }
    start() {}
    stop() {}
}