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
import {
    OrderImage,
    OrderImageFromJSON,
    OrderImageFromJSONTyped,
    OrderImageToJSON,
} from './';

/**
 * 
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    readonly id?: string;
    /**
     * 
     * @type {Array<OrderImage>}
     * @memberof Order
     */
    readonly images?: Array<OrderImage>;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    product?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    description: string;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    readonly createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    readonly updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    price?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    advancePayment?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    discount?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    pendingPayment?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    registrationPlace: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    shippingPlace: string;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    shippingDate: Date;
    /**
     * 
     * @type {boolean}
     * @memberof Order
     */
    hasProduction?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Order
     */
    hasTopper?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Order
     */
    hasDelivery?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Order
     */
    completed?: boolean;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof Order
     */
    phoneNumber?: string;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    company: number;
}

export function OrderFromJSON(json: any): Order {
    return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'images': !exists(json, 'images') ? undefined : ((json['images'] as Array<any>).map(OrderImageFromJSON)),
        'name': json['name'],
        'product': !exists(json, 'product') ? undefined : json['product'],
        'description': json['description'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'price': !exists(json, 'price') ? undefined : json['price'],
        'advancePayment': !exists(json, 'advance_payment') ? undefined : json['advance_payment'],
        'discount': !exists(json, 'discount') ? undefined : json['discount'],
        'pendingPayment': !exists(json, 'pending_payment') ? undefined : json['pending_payment'],
        'registrationPlace': json['registration_place'],
        'shippingPlace': json['shipping_place'],
        'shippingDate': (new Date(json['shipping_date'])),
        'hasProduction': !exists(json, 'has_production') ? undefined : json['has_production'],
        'hasTopper': !exists(json, 'has_topper') ? undefined : json['has_topper'],
        'hasDelivery': !exists(json, 'has_delivery') ? undefined : json['has_delivery'],
        'completed': !exists(json, 'completed') ? undefined : json['completed'],
        'code': !exists(json, 'code') ? undefined : json['code'],
        'phoneNumber': !exists(json, 'phone_number') ? undefined : json['phone_number'],
        'company': json['company'],
    };
}

export function OrderToJSON(value?: Order | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'product': value.product,
        'description': value.description,
        'price': value.price,
        'advance_payment': value.advancePayment,
        'discount': value.discount,
        'pending_payment': value.pendingPayment,
        'registration_place': value.registrationPlace,
        'shipping_place': value.shippingPlace,
        'shipping_date': (value.shippingDate.toISOString()),
        'has_production': value.hasProduction,
        'has_topper': value.hasTopper,
        'has_delivery': value.hasDelivery,
        'completed': value.completed,
        'code': value.code,
        'phone_number': value.phoneNumber,
        'company': value.company,
    };
}


