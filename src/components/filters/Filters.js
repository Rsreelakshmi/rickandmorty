import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchFilterData, filterBy } from "../../actions/index";
import './filters.css';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: {
                genderFilter: [],
                originFilter: [],
                speciesFilter: []
            }
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchFilterData());
    }
    onFilterClick = (data, filterType) => {
        let currentFilters = localStorage.getItem('selectedFilters');
        let selectedFilters = currentFilters ? JSON.parse(currentFilters) : {
            genderFilter: [],
            originFilter: [],
            speciesFilter: []
        };
        if ( filterType === 'gender' ) {
            selectedFilters.genderFilter.indexOf(data) < 0 ? selectedFilters.genderFilter.push(data) : selectedFilters.genderFilter = selectedFilters.genderFilter.filter(fil => fil !== data);
        }
        else if ( filterType === 'species' ) {
            selectedFilters.speciesFilter.indexOf(data) < 0 ? selectedFilters.speciesFilter.push(data) : selectedFilters.speciesFilter = selectedFilters.speciesFilter.filter(fil => fil !== data);
        }
        else {
            selectedFilters.originFilter.indexOf(data) < 0 ? selectedFilters.originFilter.push(data) : selectedFilters.originFilter = selectedFilters.originFilter.filter(fil => fil !== data);
        }
        localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
        this.props.dispatch(filterBy(JSON.parse(localStorage.getItem('selectedFilters')), filterType));
    }
    getFilters = (filter, type) => {
        return filter.length && filter.map((fil, idx) => {
            return (
                <p key={fil + '-'+ idx}>
                    <label>
                        <input type="checkbox" className="filled-in" onChange={() => this.onFilterClick(fil, type)}/>
                        <span className="filter-label">{fil}</span>
                    </label>
                </p>
            )
        })
    }
    render() {
        const { genderFilter, speciesFilter, originFilter } = this.props;
        return (
                <div className="filters-section col s12 m2 l2">
                <h4 className="">Filters</h4>
                <div className="species-filter">
                    <h6 className="filter-title">Species</h6>
                    {this.getFilters(speciesFilter, 'species')}
                </div>
                <div className="gender-filter">
                    <h6 className="filter-title">Gender</h6>
                    {this.getFilters(genderFilter, 'gender')}
                </div>
                <div className="origin-filter">
                    <h6 className="filter-title">Origin</h6>
                    {this.getFilters(originFilter, 'origin')}
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
  
export default connect(mapStateToProps)(Filter);