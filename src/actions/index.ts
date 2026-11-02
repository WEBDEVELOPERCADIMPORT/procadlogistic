import { getReviews } from './reviews/getReviews.action';
import { getServices, getServiceBySlug } from './services/services.action';
import { submitContactMoreInfo } from './forms/submitContactMoreInfo.action';
import { submitQuoteForm } from './forms/submitQuoteForm.action';

export const server = {
  // Reviews
  getReviews,

  // Services
  getServices,
  getServiceBySlug,

  // Forms
  submitContactMoreInfo,
  submitQuoteForm,
};

