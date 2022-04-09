export const getProjectsByUser = async (jwtToken: string, email: string) => {

   const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${email}/project-list`, {
      headers: { authorization: `bearer ${jwtToken}` },
   });
   return res.json();
};

export const getAllProjects = async (jwtToken: string) => {

   const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/project-list`, {
      headers: { authorization: `bearer ${jwtToken}` },
   });
   return res.json();
};