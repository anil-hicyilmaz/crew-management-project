import { CertificateType } from "./certificate-type.model";

export interface Certificate {
    id: number;
    typeId: number;
    issueDate: string;
    expiryDate: string;
}