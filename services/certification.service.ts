import { CERTIFICATION_ENDPOINTS } from "@/lib/constants/EndPoints";
import AppService from "./app.service";

class CertificationService extends AppService {
    constructor() {
        super();
    }

    acceptCertification = (certificationToken: string) => {
        return this.post(CERTIFICATION_ENDPOINTS.ACCEPT, {
            certificationToken: certificationToken
        })
    }

    getUserCertificationByAsset = (assetId: number) => {
        return this.get(CERTIFICATION_ENDPOINTS.GET_BY_ASSET, undefined, {
            assetId: assetId,
            status: "ACCEPTED"
        })
    }
}

export const certificationService = new CertificationService();