import { LANGUAGES } from '../../i18n/config.i18n';
import servicesData from '../../data/services/services.data.json';

const BASE_URL = 'https://procadlogistic.com';
const langs = Object.keys(LANGUAGES);

/**
 * Generate localized URLs for static pages
 */
const getStaticPageUrls = (): string[] => {
    const paths = ['', 'shippers', 'contact', 'quote'];
    const urls: string[] = [];

    langs.forEach((lang) => {
        paths.forEach((path) => {
            urls.push(`${BASE_URL}/${lang}${path ? `/${path}` : '/'}`);
        });
    });

    return urls;
};

/**
 * Generate localized URLs for dynamic services
 */
const getServiceUrls = (): string[] => {
    const urls: string[] = [];
    const services = servicesData.services || [];

    langs.forEach((lang) => {
        services.forEach((service) => {
            urls.push(`${BASE_URL}/${lang}/services/${service.slug}`);
        });
    });

    return urls;
};

/**
 * Combine all URLs for the Astro sitemap configuration.
 */
export const getAllSitemapUrls = (): string[] => {
    return [
        ...getStaticPageUrls(),
        ...getServiceUrls()
    ];
};
