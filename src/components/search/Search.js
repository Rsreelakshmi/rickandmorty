import React, { Component } from 'react';
import { connect } from "react-redux";
import Sort from '../sort/Sort';
import { searchByName } from "../../actions/index";
import './search.css';

class Search extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            searchVal: ''
        };
    }

    onSearch = () => {
        let selFilter = {
            type: 'searchByName',
            name: this.state.searchVal
        }
        this.props.dispatch(searchByName(selFilter));
    }

    onChange = (e) => {
        this.setState({
            searchVal: e.target.value
        })
    }

    render() {
        const { searchVal } = this.state;
        return (
            <div className="row">
                <div className="col s12 m8 l8 search-container">
                    <h6>Search by Name</h6>
                    <input className="col s6 m6 l6 search-field" type="text" value={searchVal} onChange={this.onChange}></input>
                    <button className="col s5 m5 l2 search-btn btn light-blue darken-4" onClick={this.onSearch}>Search</button>
                </div>
                <div className="col s12 m4 l4 sortby-section">
                    <Sort></Sort>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    genderFilter: state.filters.genderFilter,
    speciesFilter: state.filters.speciesFilter,
    originFilter: state.filters.originFilter
});

export default connect(mapStateToProps)(Search);