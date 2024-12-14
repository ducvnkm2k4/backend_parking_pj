import { checkExistPhoneNumber } from '../services/autherization_service.js'

let getExistPhoneNumber = async (req, res) => {
    try {
        const phoneNumber = req.query.phoneNumber;
        if (phoneNumber == "") {
            return res.status(501).json({
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
export {
    getExistPhoneNumber
};
