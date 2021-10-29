const hueapi = require('node-hue-api');
export class HueSupport {
    init(callback) {
        this.username = 'WbZT5NyzwWjDMA8NRT0vAy-qr8JjIpf5gUlfkT3A';
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