import Setting from "../models/settings.model";
import { Request, Response } from 'express'
import { ISetting } from "../interfaces/settings";

// export const getSetting = async (req: Request, res: Response) => {
//     try {
//         const settings = await Setting.find({}
//         )
//         return res.status(200).json(settings)
//     } catch (err) {
//         return res.status(400).json(err)
//     }
// };

export const createSetting = async (key: string, value: string) => {
    const setting = new Setting();
    setting.key = key;
    setting.value = value;

    try {
        await setting.save();
    } catch (err) {
        console.error(err);
    }
};
export const getSettingById = async (res?: string, req?: Request) => {
    const settingId = req.params.id;
    const setting = await Setting.findOne({ id: settingId });
    const result = setting[res];
    return result.length ? result[0].value : null && setting;

};

export const getSetting = async (key: string) => {
    const result = await Setting.find({ key }) as ISetting[];
    return result.length ? result[0].value : null;
};


