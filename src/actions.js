import { createActions } from 'redux-actions';
import service from "./services/stop-points-discovery-service";

export const loadStopPointsDiscovery = (payload) => dispatch => {
    return service.get(payload).then(
        value => dispatch(actions.stopPointsDiscovery.loadSuccess(value)),
        error => dispatch(actions.stopPointsDiscovery.loadFailure(error))
    );
};

export const loadStopMonitoring = (payload, name) => dispatch => {
    return service.get(payload).then(
        value => dispatch(actions.stopMonitoring.loadSuccess(value, name)),
        error => dispatch(actions.stopMonitoring.loadFailure(error, name))
    );
};

const actions = createActions(
    {
        STOP_POINTS_DISCOVERY: {
            LOAD_SUCCESS: payload => payload,
            LOAD_FAILURE: payload => payload
        },
        STOP_MONITORING: {
            LOAD_SUCCESS: [
                payload => payload,
                (payload, name) => ({ name })
            ],
            LOAD_FAILURE: [
                payload => payload,
                (payload, name) => ({ name })
            ],
        }
    }
);

export default actions;
