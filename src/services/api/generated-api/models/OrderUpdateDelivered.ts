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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface OrderUpdateDelivered
 */
export interface OrderUpdateDelivered {
    /**
     * 
     * @type {boolean}
     * @memberof OrderUpdateDelivered
     */
    delivered?: boolean;
}

export function OrderUpdateDeliveredFromJSON(json: any): OrderUpdateDelivered {
    return OrderUpdateDeliveredFromJSONTyped(json, false);
}

export function OrderUpdateDeliveredFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderUpdateDelivered {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'delivered': !exists(json, 'delivered') ? undefined : json['delivered'],
    };
}

export function OrderUpdateDeliveredToJSON(value?: OrderUpdateDelivered | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'delivered': value.delivered,
    };
}


