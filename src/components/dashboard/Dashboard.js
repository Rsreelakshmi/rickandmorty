import React, { Component } from 'react';
import Search from '../search/Search';
import Filter from '../filters/Filters';
import moment from 'moment';
import { connect } from "react-redux";
import { fetchCharacters, filterBy, fetchFilterData } from "../../actions/index";
import './dashboard.css';


class Dashboard extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCharacters());
        this.props.dispatch(fetchFilterData());
    }  

    formatCreated(created) {
        return `created ` +  moment().diff(created, 'years')+` years ago`;
    }
    onRemoveClick = (data, filterType) => {
        let currentFilters = localStorage.getItem('selectedFilters');
        let selectedFilters = currentFilters ? JSON.parse(currentFilters) : {
            genderFilter: [],
            originFilter: [],
            speciesFilter: []
        };

        if ( filterType === 'gender' ) {
            selectedFilters.genderFilter.indexOf(data) >= 0 ? selectedFilters.genderFilter.push(data) : selectedFilters.genderFilter = selectedFilters.genderFilter.filter(fil => fil !== data);
        }
        else if ( filterType === 'species' ) {
            selectedFilters.speciesFilter.indexOf(data) >= 0 ? selectedFilters.speciesFilter.push(data) : selectedFilters.speciesFilter = selectedFilters.speciesFilter.filter(fil => fil !== data);
        }
        else {
            selectedFilters.originFilter.indexOf(data) >= 0 ? selectedFilters.originFilter.push(data) : selectedFilters.originFilter = selectedFilters.originFilter.filter(fil => fil !== data);
        }
        localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
        this.props.dispatch(filterBy(JSON.parse(localStorage.getItem('selectedFilters')), filterType));
    }

    showSelectedFilters = () => {
        let selectedFilterData = localStorage.getItem('selectedFilters') ? JSON.parse(localStorage.getItem('selectedFilters')) : {}
        this.populateChipData(selectedFilterData.genderFilter);
        this.populateChipData(selectedFilterData.originFilter);
        this.populateChipData(selectedFilterData.speciesFilter);
    }

    populateChipData = (chipData) => {
        let showChip = false;
        let filterValues = localStorage.getItem('selectedFilters');
        return chipData && chipData.length && chipData.map((fil, idx) => {
            if(filterValues.indexOf(fil) >= 0) {
                showChip = true
            }
            return (
                <div className={`chip light-blue darken-4 white-text ${this.props.showFilters && showChip ? '': 'hide'}`} key={idx}>
                    {fil}
                    <i className="close material-icons" onClick={() => this.onRemoveClick(fil)}>close</i>
                </div> 
            )
        })
    }
      render() {
        const { error, loading, characters, showFilters } = this.props;
        if (error) {
            return <div>Error! {error.message}</div>;
        }
        return (
            <div className="row grid">
                <Filter></Filter>
                <div className="results-section col s12 m10 l10">
                    <div className="row">
                        {showFilters ? (
                            <div className="col s12 m8 l8 selected-filters-container">
                                <h4>Selected Filters</h4>
                                {this.populateChipData(this.props.genderFilter)}
                                {this.populateChipData(this.props.originFilter)}
                                {this.populateChipData(this.props.speciesFilter)}
                            </div>) : null
                        }
                    </div>
                    <Search></Search>
                    <div className="row grid light-blue darken-4">
                        {!loading ? (
                            characters.map(character => {
                            const { id, isHidden, name, status, species, origin, gender, created, image, location, url } = character;
                            return (
                                <div className={`results-container col ${isHidden ? "hide" : ""}`} key={id}>
                                    <div className="character-card card light-blue lighten-4">
                                        <div className="card-image">
                                            <img src={image} alt={name}/>
                                            <div className="card-title  light-blue lighten-4">
                                                <span className="card-name">{name}</span>
                                                <span className="card-title-desc">id: {id} - {this.formatCreated(created)}</span>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <ul className="card-content-detail">
                                                <li className="detail">
                                                    <span className="detail-title left">status</span>
                                                    <span className="detail-desc right card-label">{status}</span>
                                                </li>
                                                <li className="detail">
                                                    <span className="detail-title left">species</span>
                                                    <span className="detail-desc right card-label">{species}</span>
                                                </li>
                                                <li className="detail">
                                                    <span className="detail-title left">gender</span>
                                                    <span className="detail-desc right card-label">{gender}</span>
                                                </li>
                                                <li className="detail">
                                                    <span className="detail-title left">origin</span>
                                                    <span className="detail-desc right card-label">{origin.name}</span>
                                                </li>
                                                <li className="detail">
                                                    <span className="detail-title left">last location</span>
                                                    <span className="detail-desc right card-label">{location.name}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        // If there is a delay in data, let's let the user know it's loading
                        ) : (
                            <h3>Loading...</h3>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    characters: state.characters.items,
    loading: state.characters.loading,
    error: state.characters.error,
    showFilters: state.characters.showFilters,
    genderFilter: state.filters.genderFilter,
    speciesFilter: state.filters.speciesFilter,
    originFilter: state.filters.originFilter
});
  
export default connect(mapStateToProps)(Dashboard);