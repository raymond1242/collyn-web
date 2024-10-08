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
    Order,
    OrderFromJSON,
    OrderToJSON,
    OrderCreate,
    OrderCreateFromJSON,
    OrderCreateToJSON,
    OrderUpdateAdmin,
    OrderUpdateAdminFromJSON,
    OrderUpdateAdminToJSON,
    OrderUpdateCompleted,
    OrderUpdateCompletedFromJSON,
    OrderUpdateCompletedToJSON,
    OrderUpdateStore,
    OrderUpdateStoreFromJSON,
    OrderUpdateStoreToJSON,
} from '../models';

export interface OrdersCompletedRequest {
    shippingStartDate?: string;
    shippingEndDate?: string;
    shippingPlace?: string;
}

export interface OrdersCreateRequest {
    data: OrderCreate;
}

export interface OrdersListRequest {
    code?: string;
    shippingStartDate?: string;
    shippingEndDate?: string;
    shippingPlace?: string;
    hasProduction?: boolean;
    hasTopper?: boolean;
}

export interface OrdersUpdateAdminRequest {
    id: string;
    data: OrderUpdateAdmin;
}

export interface OrdersUpdateCompletedRequest {
    id: string;
    data: OrderUpdateCompleted;
}

export interface OrdersUpdateStoreRequest {
    id: string;
    data: OrderUpdateStore;
}

/**
 * 
 */
export class OrdersApi extends runtime.BaseAPI {

    /**
     */
    async ordersCompletedRaw(requestParameters: OrdersCompletedRequest): Promise<runtime.ApiResponse<Array<Order>>> {
        const queryParameters: any = {};

        if (requestParameters.shippingStartDate !== undefined) {
            queryParameters['shipping_start_date'] = requestParameters.shippingStartDate;
        }

        if (requestParameters.shippingEndDate !== undefined) {
            queryParameters['shipping_end_date'] = requestParameters.shippingEndDate;
        }

        if (requestParameters.shippingPlace !== undefined) {
            queryParameters['shipping_place'] = requestParameters.shippingPlace;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/orders/completed`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OrderFromJSON));
    }

    /**
     */
    async ordersCompleted(requestParameters: OrdersCompletedRequest): Promise<Array<Order>> {
        const response = await this.ordersCompletedRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async ordersCreateRaw(requestParameters: OrdersCreateRequest): Promise<runtime.ApiResponse<Order>> {
        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling ordersCreate.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/orders`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OrderCreateToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     */
    async ordersCreate(requestParameters: OrdersCreateRequest): Promise<Order> {
        const response = await this.ordersCreateRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async ordersListRaw(requestParameters: OrdersListRequest): Promise<runtime.ApiResponse<Array<Order>>> {
        const queryParameters: any = {};

        if (requestParameters.code !== undefined) {
            queryParameters['code'] = requestParameters.code;
        }

        if (requestParameters.shippingStartDate !== undefined) {
            queryParameters['shipping_start_date'] = requestParameters.shippingStartDate;
        }

        if (requestParameters.shippingEndDate !== undefined) {
            queryParameters['shipping_end_date'] = requestParameters.shippingEndDate;
        }

        if (requestParameters.shippingPlace !== undefined) {
            queryParameters['shipping_place'] = requestParameters.shippingPlace;
        }

        if (requestParameters.hasProduction !== undefined) {
            queryParameters['has_production'] = requestParameters.hasProduction;
        }

        if (requestParameters.hasTopper !== undefined) {
            queryParameters['has_topper'] = requestParameters.hasTopper;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/orders`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OrderFromJSON));
    }

    /**
     */
    async ordersList(requestParameters: OrdersListRequest): Promise<Array<Order>> {
        const response = await this.ordersListRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async ordersUpdateAdminRaw(requestParameters: OrdersUpdateAdminRequest): Promise<runtime.ApiResponse<Order>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling ordersUpdateAdmin.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling ordersUpdateAdmin.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/orders/{id}/update_admin`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: OrderUpdateAdminToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     */
    async ordersUpdateAdmin(requestParameters: OrdersUpdateAdminRequest): Promise<Order> {
        const response = await this.ordersUpdateAdminRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async ordersUpdateCompletedRaw(requestParameters: OrdersUpdateCompletedRequest): Promise<runtime.ApiResponse<Order>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling ordersUpdateCompleted.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling ordersUpdateCompleted.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/orders/{id}/update_completed`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: OrderUpdateCompletedToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     */
    async ordersUpdateCompleted(requestParameters: OrdersUpdateCompletedRequest): Promise<Order> {
        const response = await this.ordersUpdateCompletedRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async ordersUpdateStoreRaw(requestParameters: OrdersUpdateStoreRequest): Promise<runtime.ApiResponse<Order>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling ordersUpdateStore.');
        }

        if (requestParameters.data === null || requestParameters.data === undefined) {
            throw new runtime.RequiredError('data','Required parameter requestParameters.data was null or undefined when calling ordersUpdateStore.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/orders/{id}/update_store`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: OrderUpdateStoreToJSON(requestParameters.data),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderFromJSON(jsonValue));
    }

    /**
     */
    async ordersUpdateStore(requestParameters: OrdersUpdateStoreRequest): Promise<Order> {
        const response = await this.ordersUpdateStoreRaw(requestParameters);
        return await response.value();
    }

}
