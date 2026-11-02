import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import servicesData from '../../data/services/services.data.json';

export interface CapabilityItem {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: Record<string, string>;
  tagline: Record<string, string>;
  description: Record<string, string>;
  image: string;
  capabilities: CapabilityItem[];
}

export interface GetServicesResult {
  message: string;
  data: ServiceItem[];
}

export interface GetServiceBySlugResult {
  message: string;
  data: ServiceItem;
}

export const getServices = defineAction({
  handler: async (): Promise<GetServicesResult> => {
    const data = (servicesData.services || []) as ServiceItem[];
    return {
      message: 'Services retrieved successfully',
      data,
    };
  },
});

export const getServiceBySlug = defineAction({
  input: z.object({
    slug: z.string().min(1, 'Service slug is required'),
  }),
  handler: async ({ slug }): Promise<GetServiceBySlugResult> => {
    const allServices = (servicesData.services || []) as ServiceItem[];
    const service = allServices.find((s) => s.slug === slug);

    if (!service) {
      throw new ActionError({
        code: 'NOT_FOUND',
        message: 'Service not found',
      });
    }

    return {
      message: 'Service retrieved successfully',
      data: service,
    };
  },
});
