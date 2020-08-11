import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { updateCollections } from '../../redux/shop/shop.action';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);//higher order component
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    }
    // unsubscribeFromSnapshot = null;//subscription

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     // console.log(collectionsMap);
        //    updateCollections(collectionsMap);
        //     this.setState({ loading: false });

        // })
        collectionRef.get().then(snapshot => {
            const collectionmap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionmap);
            this.setState({ loading: false });
        })
    }
    // componentWillUnmount() {//Lifecycle method of react
    //     this.unsubscribeFromSnapshot();//destroying subscription after its purpose
    //   }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                    render={props => (
                        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                    )} />
                <Route path={`${match.path}/:collectionId`}
                    render={props => (
                        <CollectionPageWithSpinner isLoading={loading} {...props} />
                    )} />
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})



export default connect(null, mapDispatchToProps)(ShopPage);