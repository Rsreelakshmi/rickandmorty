import React, { Component } from 'react';
import { connect } from "react-redux";
import './sort.css';
import { sortByAsc, sortByDesc } from '../../actions';

class Sort extends Component {
    onChangeVal = (e) => {
        let sortVal = e.target.value;
        sortVal === 'asc' ? this.props.dispatch(sortByAsc(sortVal)) :this.props.dispatch(sortByDesc(sortVal));
    }
    render() {
        return (
            <div className="sortby-section right">
                <div className="sortby-title">
                    <h4 className="sort-label">Sort By</h4>
                </div>
                <select className="browser-default sortby-options" defaultValue="asc" onChange={this.onChangeVal}>
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                </select>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    filters: state.filters
});
export default connect(mapStateToProps)(Sort);