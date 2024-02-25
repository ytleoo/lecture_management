import jwt from 'jsonwebtoken';

export const SECRET = 'dummy';

export default eventHandler(async (event) => {
  const { email } = await readBody(event);
  const expiresIn = 15;
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
