import z from 'zod';
import jwt from 'jsonwebtoken';

export const SECRET = 'dummy';

export default eventHandler(async (event) => {
  const result = z
    .object({ email: z.string().email(), password: z.string().min(1) })
    .safeParse(await readBody(event));
  if (!result.success) {
    let message;
    switch (result.error.issues[0].validation) {
      case 'email':
        message = 'メールアドレスが不正です';
        break;
      case 'password':
        message = 'パスワードが不正です';
        break;
    }

    throw createError({
      statusCode: 403,
      statusMessage: message,
    });
  }

  const expiresIn = 15;
  const { email } = result.data;
  const user = {
    email,
  };

  const accessToken = jwt.sign(user, SECRET, {
    expiresIn,
  });

  return {
    token: accessToken,
  };
});
