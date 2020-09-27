
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START,

});

export const fetchCollectionSuccess = collectionmap => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionmap
});

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
})

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionStart());

        collectionRef.get().then(snapshot => {
            const collectionmap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionSuccess(collectionmap));
        }).catch(error => dispatch(fetchCollectionFailure(error.message)))

    }
}
