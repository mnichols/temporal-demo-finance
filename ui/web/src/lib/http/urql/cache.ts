import {cacheExchange} from "@urql/exchange-graphcache";

export const createCacheExchange = () => {
    let cache = cacheExchange({
        // specify custom keys
        // https://formidable.com/open-source/urql/docs/graphcache/normalized-caching/#custom-keys-and-non-keyable-entities
        keys: {
            AppInfo: () => null,
            // Prescription: data => data.prescriptionId,
            // Physician: data => data.physicianId,
            // Medication: data => data.medicationId,
        },
    })
    return cache
}
