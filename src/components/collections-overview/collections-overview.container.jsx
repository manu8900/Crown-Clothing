//-----Implementation of container pattern----//

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from '../collections-overview/collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading:selectIsCollectionFetching
});
/* Below Code with compose is similar to writing this code
const CollectionsOverviewContainer = connect(
    mapStateToProps)(WithSpinner(CollectionOverview))
*/


/*Compose runs right to left wrapping the collection 
 inside withspinner &  then mapStatetoprops*/
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;