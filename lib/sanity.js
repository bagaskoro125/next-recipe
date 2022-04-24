import { createClient, createPreviewSubscriptionHook, createImageUrlBuilder } from "next-sanity"

const config = {
    projectId: 's8das1i1',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: false,
}

export const sanityClient = createClient(config);

export const usePreviewSubsciption = createPreviewSubscriptionHook(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
