// impotrt { query } from "./db";
// impor { Transaction } from "../types";

// type Setting = {
//     id: number;
//     key: string;
//     value: string;
// };



// export const getSetting = async (key: string) => {
//     const sqlQuery = `SELECT * FROM public.settings WHERE key = $1`;
//     const result = await query(sqlQuery, [key]) as Setting[];
//     return result.length ? result[0].value : null;
// };

// export const setSetting = (key: string, value: string) => {
//     return query(
//         `INSERT INTO public.settings(key, value) VALUES($1, $2) ON CONFLICT ("key") DO UPDATE SET value = $2`,
//         [
//             key,
//             value
//         ]
//         // db.inventory.insertOne(
//         //     { key: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
//         //  )
//     );
// };
