import { checkExistPhoneNumber } from "../services/database/autherization_service.js";
import TokenDevice from "../assets/token_devices.js";
class ApiController {
    static async getExistPhoneNumber(req, res) {
        try {
            const phoneNumber = req.query.phoneNumber;
            if (phoneNumber == "") {
                return res.status(400).json({
                    message: "check exist phone number",
                    error: "missing phone number"
                })
            }
            const data = await checkExistPhoneNumber(phoneNumber);
            return res.status(200).json({
                message: "check exist phoneNumber",
                data: data,

            })
        } catch (error) {
            return res.status(500).json({
                message: 'error check exist',
                error: error.message
            })
        }
    }

    static async updateTokenDevice(req, res) {
        let { uId, token } = req.body;
        TokenDevice.addTokenDevice(uId, token);
        return res.status(200).json({ message: "update token success" });

    }


}



export default ApiController;