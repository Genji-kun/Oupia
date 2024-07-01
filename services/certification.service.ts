import { api } from "@/lib/api";
import { CERTIFICATION_ENDPOINTS } from "@/lib/constants/EndPoints";

class CertificationService {

    acceptCertification = (certificationToken: string) => {
        return api.post(CERTIFICATION_ENDPOINTS.ACCEPT, {
            certificationToken: certificationToken
        })
    }

    getUserCertificationByAsset = (assetId: number) => {
        return api.get(CERTIFICATION_ENDPOINTS.GET_BY_ASSET, {
            params: {
                assetId: assetId,
                status: "ACCEPTED"
            }
        })
    }
}

export const certificationService = new CertificationService();