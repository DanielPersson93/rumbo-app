import { Transaction } from '../types';

export const getTransactions = async (jwtToken: string, email: string, year?: number, month?: number, description?: string) => {
  let queries = [];
  if (year) {
    queries.push(`year=${year}`);
  }
  if (month) {
    queries.push(`month=${month}`);
  }
  if (description) {
    queries.push(`description=${description}`);
  }
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/transaction${queries.length ? "?" + queries.join("&") : ""}`, {
    headers: { authorization: `bearer ${jwtToken}` },
  });
  return res.json();
};

export const getTransactionsMeta = async (jwtToken: string, email: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/${email}/transactionsmeta`, {
    headers: { authorization: `bearer ${jwtToken}` },
  });
  return res.json();
};

export const postTransaction = async (jwtToken: string, transaction: Transaction) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/transaction`, {
    method: 'POST',
    body: JSON.stringify(transaction),
    headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
  });
  return res.json();
};

export const deleteTransaction = async (jwtToken: string, transaction: Transaction) => {
  const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/transaction/${transaction.id}`, {
    method: 'DELETE',
    headers: { authorization: `bearer ${jwtToken}`, 'Content-Type': 'application/json' },
  });
  return res.json();
};
