const getCurrentUser = async (jwtToken: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/current`, {
    headers: { authorization: `bearer ${jwtToken}` },
  });
  return res.json();
};

export default getCurrentUser;
