const StopPointsDiscoveryService = {
    get: function (url) {
        return fetch(url, {
            "Content-Type": "application/json"
        }).then(response => response.json());
    }
};

export default StopPointsDiscoveryService;
