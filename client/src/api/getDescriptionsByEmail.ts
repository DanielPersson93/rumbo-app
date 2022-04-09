const getDescriptionsByEmail = async (jwtToken: string, email: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/description`, {
    headers: { authorization: `bearer ${jwtToken}` },
  });
  return res.json();
};

export default getDescriptionsByEmail;
