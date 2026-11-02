import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';

export interface SubmitContactMoreInfoResult {
  message: string;
  data: {
    id: string;
    status: string;
    createdAt: string;
  };
}

export const submitContactMoreInfo = defineAction({
  input: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Valid email address is required'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
  }),
  handler: async (input): Promise<SubmitContactMoreInfoResult> => {
    const apiUrl = (import.meta.env.BACKEND_API_URL || 'https://webadminsystem.cadimportinc.com/api/v1/').replace(/\/+$/, '');
    const apiKey = import.meta.env.BACKEND_API_KEY || 'ce06c3de-34f3-474e-95a5-e6b42c318e62';

    const endpoint = `${apiUrl}/forms/contact-more-information-form/submit`;

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
          email_address: input.email,
          subject: input.subject,
          message: input.message,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: errorText || 'Failed to submit contact information',
        });
      }

      const result = await response.json();
      return {
        message: result.message || 'Form submitted successfully',
        data: result.data,
      };
    } catch (err: any) {
      if (err instanceof ActionError) throw err;
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: err?.message || 'Error sending contact information',
      });
    }
  },
});
