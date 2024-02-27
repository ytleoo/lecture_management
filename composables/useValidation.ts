import type { ZodObject, ZodIssue } from 'zod';

export const useValidation = () => {
  const getErrorMessage = (errors: ZodIssue[]): string => {
    return errors[0]?.message ?? '';
  };

  const validateForm = <T>(formParser: ZodObject<T>, data: T): string | undefined => {
    const parsed = formParser.safeParse(data);
    if (!parsed.success) {
      return getErrorMessage(parsed.error.errors);
    }
  };

  return { validateForm };
};
