import CryptoJS from "crypto-js";

class MomoConfig {
    static createPayment(reqAmount) {
        let accessKey = process.env.MOMO_ACCESS_KEY;
        let secretKey = process.env.MOMO_SECRET_KEY;
        let partnerCode = process.env.MOMO_PARTNER_CODE;
        let orderInfo = 'pay with MoMo';
        let redirectUrl = 'https://d0c0-42-113-16-146.ngrok-free.app/api/v1/momo-callback';
        let ipnUrl = 'https://d0c0-42-113-16-146.ngrok-free.app/api/v1/momo-callback';
        let requestType = "payWithMethod";
        let amount = reqAmount;
        let orderId = partnerCode + new Date().getTime();
        let requestId = orderId;
        let extraData = '';
        let orderGroupId = '';
        let autoCapture = true;
        let lang = 'vi';

        let rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
        const signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(CryptoJS.enc.Hex);


        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature
        });
        return requestBody;
    }

    static transactionStatus(reqOrderId) {
        let accessKey = process.env.MOMO_ACCESS_KEY;
        let secretKey = process.env.MOMO_SECRET_KEY;
        let partnerCode = process.env.MOMO_PARTNER_CODE;
        let rawSignature = "accessKey=" + accessKey + "&orderId=" + reqOrderId + "&partnerCode=" + partnerCode + "&requestId=" + reqOrderId;
        console.log("check: ", rawSignature);
        const signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(CryptoJS.enc.Hex);
        console.log("check sig:", signature);
        const requestBody = {
            partnerCode: partnerCode,
            requestId: reqOrderId,
            orderId: reqOrderId,
            lang: 'vi',
            signature: signature
        }
        return requestBody;
    }

    static refund(orderId, transId, amount) {
        let accessKey = process.env.MOMO_ACCESS_KEY;
        let secretKey = process.env.MOMO_SECRET_KEY;
        let partnerCode = process.env.MOMO_PARTNER_CODE;
        let requestId = orderId;
        let desciption = 'hoàn trả tiền';
        let lang = 'vi';

        const rawSignature = 'accessKey=${acessKey}&amount=$amount&description=$description&orderId=$orderId&partnerCode=$partnerCode&requestId=$requestId&transId=$transId';
        console.log('raw: ', rawSignature);
        const signature = CryptoJS.HmacSHA256(rawSignature, secretKey).toString(CryptoJS.enc.Hex);
        const requestBody = {
            partnerCode: partnerCode,
            orderId: orderId,
            requestId: requestId,
            amount: amount,
            requestId: transId,
            lang: lang,
            desciption: desciption,
            signature: signature
        }
        return requestBody
    }
}

export default MomoConfig