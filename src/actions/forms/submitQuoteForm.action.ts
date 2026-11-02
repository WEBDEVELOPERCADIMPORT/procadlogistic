import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';

export interface SubmitQuoteResult {
  message: string;
  data: {
    id: string;
    status: string;
    createdAt: string;
  };
}

export const submitQuoteForm = defineAction({
  input: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    companyName: z.string().min(1, 'Company name is required'),
    email: z.string().email('Valid email address is required'),
    commodity: z.string().min(1, 'Commodity is required'),
    pickupZipCode: z.string().min(1, 'Pick up zip code is required'),
    deliveryZipCode: z.string().min(1, 'Delivery zip code is required'),
    pickupDate: z.string().min(1, 'Pick up date is required'),
    subject: z.string().min(1, 'Subject is required'),
    tellUsWhatYouNeed: z.string().min(1, 'Details are required'),
  }),
  handler: async (input): Promise<SubmitQuoteResult> => {
    const apiUrl = (import.meta.env.BACKEND_API_URL || 'https://webadminsystem.cadimportinc.com/api/v1/').replace(/\/+$/, '');
    const apiKey = import.meta.env.BACKEND_API_KEY || 'ce06c3de-34f3-474e-95a5-e6b42c318e62';

    const endpoint = `${apiUrl}/forms/quote-information-form/submit`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          first_name: input.firstName,
          last_name: input.lastName,
          company_name: input.companyName,
          email_address: input.email,
          commodity: input.commodity,
          pick_up_zip_code: input.pickupZipCode,
          delivery_zip_code: input.deliveryZipCode,
          pick_up_date: input.pickupDate,
          subject: input.subject,
          tell_us_what_you_need: input.tellUsWhatYouNeed,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: errorText || 'Failed to submit quote request',
        });
      }

      const result = await response.json();
      return {
        message: result.message || 'Quote request submitted successfully',
        data: result.data,
      };
    } catch (err: any) {
      if (err instanceof ActionError) throw err;
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: err?.message || 'Error sending quote request',
      });
    }
  },
});
