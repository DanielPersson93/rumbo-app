const getEmployees = async (jwtToken: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/employee`, {
    headers: { authorization: `bearer ${jwtToken}` },
  });
  return res.json();
};

export default getEmployees;
