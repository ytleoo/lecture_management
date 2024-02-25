import jwt from 'jsonwebtoken';

export const SECRET = 'dummy';

export default eventHandler(async (event) => {

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
