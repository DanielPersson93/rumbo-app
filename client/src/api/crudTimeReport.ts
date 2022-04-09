
import { TimeReport } from "../types";

export const getTimeReportsByUser = async (jwtToken: string, email: string, year?: number, month?: number) => {
    let queries = [];
    if (year) {
        queries.push(`year=${year}`);
    }
    if (month) {
        queries.push(`month=${month}`);
    }
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/timereport${queries.length ? "?" + queries.join("&") : ""}`, { headers: { authorization: `bearer ${jwtToken}` }, });
    return res.json();
};

export const getTimeReportsByProject = async (jwtToken: string, id: number, year?: number, month?: number) => {

    let queries = [];
    if (year) {
        queries.push(`year=${year}`);
    }
    if (month) {
        queries.push(`month=${month}`);
    }
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/project/${id}/timereport${queries.length ? "?" + queries.join("&") : ""}`, {
        headers: { authorization: `bearer ${jwtToken}` },
    });
    return res.json();
};

export const getTimeReportsMeta = async (jwtToken: string, email: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/timereportmeta`, {
        headers: { authorization: `bearer ${jwtToken}` },
    });
    return res.json();
};

export const postTimeReport = async (jwtToken: string,
    timeReport: TimeReport) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/timeReport`, {
        method: 'POST',
        body: JSON.stringify(timeReport),
        headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    });
    return res.json();
};

export const updateTimeReport = async (jwtToken: string, timeReport: TimeReport) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${timeReport.email}/timereport/${timeReport.id}`, {
        method: 'PUT',
        body: JSON.stringify(timeReport),
        headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    });
    return res.json();
};

export const deleteTimeReport = async (jwtToken: string, timeReport: TimeReport) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${timeReport.email}/timereport/${timeReport.id}`, {
        method: 'DELETE',
        headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
    });
    return res.json();
};