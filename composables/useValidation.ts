import type { ZodObject, ZodIssue } from 'zod';
import z from 'zod';

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

  const validationRules = {
    email: z.string().email({ message: 'メールアドレスが不正です' }),
    password: z
      .string()
      .min(6, { message: 'パスワードを6文字以上で入力してください' })
      .regex(/^[a-zA-Z0-9]+$/, { message: 'パスワードは半角英数字で入力してください' }),
    passwordConfirm: z
      .string()
      .min(6, { message: '確認用パスワードを6文字以上で入力してください' })
      .regex(/^[a-zA-Z0-9]+$/, { message: '確認用パスワードは半角英数字で入力してください' }),
  };

  return { validateForm, validationRules };
};
