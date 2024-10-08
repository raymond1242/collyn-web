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
    OrderImage,
    OrderImageFromJSON,
    OrderImageToJSON,
    OrderImageCreate,
    OrderImageCreateFromJSON,
    OrderImageCreateToJSON,
} from '../models';

export interface OrderImagesCreateRequest {
    data: OrderImageCreate;
}

export interface OrderImagesDeleteRequest {
    id: string;
}

/**
 * 
 */
export class OrderApi extends runtime.BaseAPI {

    /**
     */
    async orderImagesCreateRaw(requestParameters: OrderImagesCreateRequest): Promise<runtime.ApiResponse<OrderImage>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling orderImagesCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/order/images`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OrderImageCreateToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderImageFromJSON(jsonValue));
    }

    /**
     */
    async orderImagesCreate(requestParameters: OrderImagesCreateRequest): Promise<OrderImage> {
        const response = await this.orderImagesCreateRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async orderImagesDeleteRaw(requestParameters: OrderImagesDeleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling orderImagesDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/order/images/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async orderImagesDelete(requestParameters: OrderImagesDeleteRequest): Promise<void> {
        await this.orderImagesDeleteRaw(requestParameters);
    }

}
