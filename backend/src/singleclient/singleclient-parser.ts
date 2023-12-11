import { tokenExpiresIn } from '../application/constants/constants';
import { ISignUpTokens } from '../infrastructure/auth/interfaces/auth.interface';
import { AuditParser } from '../audit/audit.parser';
import { SingleClient } from './singleclient';
import { ISingleClientResponseDTO, ISingleClientSignedInResponseDTO } from './singleclient-response.dto';

export type SingleClientApiResponse = ISingleClientResponseDTO | ISingleClientSignedInResponseDTO;
export class SingleClientParser {
  static createSingleClientResponse(
    singleclient: SingleClient,
    tokens?: ISignUpTokens,
    signedIn = false,
  ): SingleClientApiResponse {
    let singleclientResponse: ISingleClientResponseDTO | ISingleClientSignedInResponseDTO = {
      id: singleclient.id,
      firstName: singleclient.firstName,
      lastName: singleclient.lastName,
      email: singleclient.email,
      organisationName: singleclient.organisationName,
      phoneNumber: singleclient.phoneNumber,
      role: singleclient.role,
      isActive: singleclient.isActive,
      status: singleclient.status,
      organisationAddress: singleclient.organisationAddress,
      tokens,
      ...AuditParser.createAuditResponse(singleclient.audit),
    };
    if (signedIn) {
      singleclientResponse = {
        ...singleclientResponse,
        tokenExpiresIn,
      };
    }
    return singleclientResponse;
  }

  static singleclientsResponse(singleclients: SingleClient[]): ISingleClientResponseDTO[] {
    const singleclientsResponse: ISingleClientResponseDTO[] = [];
    for (const singleclient of singleclients) {
      singleclientsResponse.push(this.createSingleClientResponse(singleclient));
    }
    return singleclientsResponse;
  }
}
