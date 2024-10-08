/* tslint:disable */
/* eslint-disable */
/**
 * API
 * API for the project.
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    UserCompany,
    UserCompanyFromJSON,
    UserCompanyToJSON,
    UserCompanyStore,
    UserCompanyStoreFromJSON,
    UserCompanyStoreToJSON,
} from '../models';

export interface CompanyReadRequest {
    user: string;
}

/**
 * 
 */
export class CompanyApi extends runtime.BaseAPI {

    /**
     */
    async companyReadRaw(requestParameters: CompanyReadRequest): Promise<runtime.ApiResponse<UserCompany>> {
        if (requestParameters.user === null || requestParameters.user === undefined) {
            throw new runtime.RequiredError('user','Required parameter requestParameters.user was null or undefined when calling companyRead.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/company/{user}`.replace(`{${"user"}}`, encodeURIComponent(String(requestParameters.user))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => UserCompanyFromJSON(jsonValue));
    }

    /**
     */
    async companyRead(requestParameters: CompanyReadRequest): Promise<UserCompany> {
        const response = await this.companyReadRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async companyStoresRaw(): Promise<runtime.ApiResponse<Array<UserCompanyStore>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/company/stores`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserCompanyStoreFromJSON));
    }

    /**
     */
    async companyStores(): Promise<Array<UserCompanyStore>> {
        const response = await this.companyStoresRaw();
        return await response.value();
    }

}
