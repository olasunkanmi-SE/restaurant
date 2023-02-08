import { tokenExpiresIn } from './../application/constants/constants';
import { ISignUpTokens } from './../infrastructure/auth/interfaces/auth.interface';
import { AuditParser } from './../audit/audit.parser';
import { Merchant } from './merchant';
import { IMerchantResponseDTO, IMerchantSignedInResponseDTO } from './merchant-response.dto';
export class MerchantParser {
  static createMerchantResponse(
    merchant: Merchant,
    tokens?: ISignUpTokens,
    signedIn = false,
  ): IMerchantResponseDTO | IMerchantSignedInResponseDTO {
    let merchantResponse: IMerchantResponseDTO | IMerchantSignedInResponseDTO = {
      id: merchant.id,
      firstName: merchant.firstName,
      lastName: merchant.lastName,
      email: merchant.email,
      organisationName: merchant.organisationName,
      phoneNumber: merchant.phoneNumber,
      role: merchant.role,
      isActive: merchant.isActive,
      status: merchant.status,
      organisationAddress: merchant.organisationAddress,
      tokens,
      ...AuditParser.createAuditResponse(merchant.audit),
    };
    if (signedIn) {
      merchantResponse = {
        ...merchantResponse,
        tokenExpiresIn,
      };
    }
    return merchantResponse;
  }

  static merchantsResponse(merchants: Merchant[]): IMerchantResponseDTO[] {
    const merchantsResponse: IMerchantResponseDTO[] = [];
    for (const merchant of merchants) {
      merchantsResponse.push(this.createMerchantResponse(merchant));
    }
    return merchantsResponse;
  }
}
