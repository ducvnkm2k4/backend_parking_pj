class TokenDevice {
    static listTokenDevice = {
        GO5IHFGS57gCbVHjPvp5kh2bTZZ2: 'dcBMM9LTSw6e1oZJsT7uLv:APA91bFQcBnuPu_YMBj9eQkpdKol6ZujcMqBFXbrxr4v30qqZp1YYJK_tXYReRQ_SsNansnZ8vBfT3XxlsDqqKP5GSL_AamWIiuWZTVe2D3_ksp0otG39_k'
    };

    static getTokenDevice(uId) {
        return this.listTokenDevice[uId];
    }

    static addTokenDevice(uId, token) {
        this.listTokenDevice[uId] = token;
    }

    static removeTokenDevice(uId) {
        if (this.listTokenDevice[uId]) {
            delete this.listTokenDevice[uId];
        } else {
            console.log(`Token device for user ${uId} not found.`);
        }
    }
}

export default TokenDevice; 
