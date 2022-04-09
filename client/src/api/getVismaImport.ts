export const getVismaImport = async (jwtToken: string, email: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/import-visma`, {
        headers: { authorization: `bearer ${jwtToken}` },
    });
    return res.json();
};
