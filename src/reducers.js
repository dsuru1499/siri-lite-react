import { handleActions } from "redux-actions";

const reducers = handleActions(
    {
        "STOP_POINTS_DISCOVERY/LOAD_SUCCESS": (state, action) => {
            return Object.assign({}, state, { stopPointsDiscovery: action.payload })
        },
        "STOP_POINTS_DISCOVERY/LOAD_FAILURE": (state, action) => {
            return Object.assign({}, state, { stopPointsDiscovery: {} })
        },
        "STOP_MONITORING/LOAD_SUCCESS": (state, action) => {
            let result = Object.assign({}, state);
            result.stopMonitoring[action.meta.name] = action.payload;
            return result;
        },
        "STOP_MONITORING/LOAD_FAILURE": (state, action) => {
            let result = Object.assign({}, state);
            delete result.stopMonitoring[action.meta.name];
            return result;
        }
    },
    {
        stopPointsDiscovery: {},
        stopMonitoring: {}
    }
);

export default reducers;