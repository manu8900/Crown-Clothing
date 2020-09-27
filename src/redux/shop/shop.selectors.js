import { createSelector } from 'reselect';


// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     women: 4,
//     men: 5
// }
const selectShop = state => state.shop;


export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
        // collections => collections.find(collections => collections.id === COLLECTION_ID_MAP[collectionUrlParam])//this method will not be suitable for a large array of data
    );

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const isCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections // !! returns a boolean value here returns true if there is collections
)