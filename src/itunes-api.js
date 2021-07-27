import { get } from "./utils/fetch-utils";


export default function getItunesEntitiesData(queryParam, queryValue) {
    return get({
        url: 'https://itunes.apple.com/search',
        query: {
            [queryParam]: queryValue,
        }
    })
}
