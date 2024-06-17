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
}

export const certificationService = new CertificationService();