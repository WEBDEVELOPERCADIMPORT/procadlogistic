import { getReviews } from './reviews/getReviews.action';
import { getServices, getServiceBySlug } from './services/services.action';

export const server = {
  // Reviews
  getReviews,

  // Services
  getServices,
  getServiceBySlug,
};
