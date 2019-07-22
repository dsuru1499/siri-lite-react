const StopPointsDiscoveryService = {
    get: function (options) {
        let url = (process.env.NODE_ENV !== "production") ? "http://127.0.0.1:8080" : ""
        url += "/siri-lite/stop-points-discovery";
        url += options && "?" + Object.entries(options).map(([key, value]) => `${key}=${value}`).join('&');
        return fetch(url, {
            "Content-Type": "application/json"
        }).then(response => response.json());
    }
};

export default StopPointsDiscoveryService;
