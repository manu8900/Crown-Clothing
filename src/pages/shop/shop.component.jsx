import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.action';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionsPageContainer from '../../pages/collection/collections-page.container';



// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);//higher order component
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {


    componentDidMount() {
        const { fetchCollectionStartAsync } = this.props;
        fetchCollectionStartAsync();
    }

    render() {
        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                    // render={props => (
                    //     <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
                    // )}
                    component={CollectionsOverviewContainer}
                />
                <Route path={`${match.path}/:collectionId`}
                    // render={props => (//isCollectionloaded will return true if their is collection & we have to inverse it to toggle loading spinner.
                    //     <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
                    // )}
                    component={CollectionsPageContainer}
                />
            </div>

        );
    }
}

// const mapStatetoProps = createStructuredSelector({
//     // isCollectionFetching:selectIsCollectionFetching,
//     isCollectionLoaded:isCollectionLoaded
// });

const mapDispatchToProps = dispatch => ({
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
})



export default connect(null, mapDispatchToProps)(ShopPage);