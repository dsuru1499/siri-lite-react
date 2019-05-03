import React from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import debug from "debug";

import * as T from "../../types"
import actions, { loadStopMonitoring } from "../../actions"
import "./StopMonitoringComponent.scss"

class StopMonitoringComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { counter: 0 };
        this.load = this.load.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.initialize();
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.dispose();
    }

    handleChange() {
        const select = state => (state.stopMonitoring[this.props.name]) ? state.stopMonitoring[this.props.name].Siri.ResponseMessageIdentifier : undefined;
        let previous = this.current;
        this.current = select(this.props.store.getState())
        if (previous !== this.current && this._isMounted) {
            debug.log("update %s previous : %s / current : %s", this.props.name, previous, this.current);
            this.setState({ counter: this.state.counter + 1 });
        }
    }

    initialize() {
        debug.log("initialize %s", this.props.name);
        this.unsubscribe = this.props.store.subscribe(this.handleChange);
        this.timer = setInterval(this.load, 10000);
        this.load();
    }

    dispose() {
        debug.log("dispose %s", this.props.name);
        clearInterval(this.timer);
        this.unsubscribe();
        this.props.store.dispatch(actions.stopMonitoring.loadFailure({}, this.props.name));
    }

    load() {
        let url = (process.env.NODE_ENV !== "production") ? "http://127.0.0.1:8080" : ""
        url += "/siri-lite/stop-monitoring"
            + "?" + T.MONITORING_REF + "=" + this.props.name
            + "&" + T.MAXIMUM_STOP_VISITS + "=" + this.props.length
            + "&" + T.MAXIMUM_NUMBER_CALLS_OF_PREVIOUS + "=" + 0
            + "&" + T.MAXIMUM_NUMBER_CALLS_OF_ONWARDS + "=" + 0;

        this.props.store.dispatch(loadStopMonitoring(url, this.props.name));
    }

    render() {
        const select = state => state.stopMonitoring[this.props.name];
        let current = select(this.props.store.getState());
        let values = (current) ? current.Siri.StopMonitoringDelivery.MonitoredStopVisit : [];

        const Row = (props) => (<tr >
            <th scope="row"><Moment format="HH:mm">{props.value.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime}</Moment></th>
            <td style={{ textTransform: 'uppercase' }}>{props.value.MonitoredVehicleJourney.DestinationName}</td>
            <td style={{ textTransform: 'uppercase' }}>{props.value.MonitoredVehicleJourney.PublishedLineName}</td>
            <td>
                <FontAwesomeIcon style={{ color: "steelblue" }} icon="bus" />
            </td>
        </tr>
        )

        const Rows = (props) => (
            props.values.map((value) => <Row value={value} key={value.ItemIdentifier} />)
        )

        return (<div>
            <h5>#{this.state.counter} StopMonitoring: {this.props.name}</h5>
            <table className="table table-sm table-hover">
                <thead>
                    <tr>
                        <th>Departure</th>
                        <th>Destination</th>
                        <th>Line</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    <Rows values={values} />
                </tbody>
            </table>
        </div >)
    }
}

StopMonitoringComponent.propTypes = {
    store: PropTypes.object,
    name: PropTypes.string,
    length: PropTypes.number
};

StopMonitoringComponent.defaultProps = {
    length: 10
};

export default StopMonitoringComponent; 