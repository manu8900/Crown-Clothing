import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector}from 'reselect';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.action';
import {selectIsCollectionFetching,isCollectionLoaded}from '../../redux/shop/shop.selectors';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);//higher order component
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {


    componentDidMount() {
       const{fetchCollectionStartAsync} = this.props;
       fetchCollectionStartAsync();
    }
    
    render() {
        const { match,isCollectionFetching} = this.props;
       
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                    render={props => (
                        <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
                    )} />
                <Route path={`${match.path}/:collectionId`}
                    render={props => (//isCollectionloaded will return true if their is collection & we have to inverse it to toggle loading spinner.
                        <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
                    )} />
            </div>

        );
    }
}

const mapStatetoProps = createStructuredSelector({
    isCollectionFetching:selectIsCollectionFetching,
    isCollectionLoaded:isCollectionLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionStartAsync:()=>dispatch(fetchCollectionStartAsync())
})



export default connect(mapStatetoProps, mapDispatchToProps)(ShopPage);