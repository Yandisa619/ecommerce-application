import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Provide a redirect URL to the caller to redirect the user into the Checkout experience.
     * The POST request contains the entityId, signature, purchase parameters, and any custom
     * parameters that a merchant optionally sends. This allows the checkout instance to be
     * created from a backend without requiring a "form post", or other similar method, from
     * the frontend.
     *
     * For more information, see the
     * [documentation](https://developer.peachpayments.com/docs/checkout-payment#redirect-based-checkout).
     *
     * @summary Initiate redirect-based Checkout
     */
    postCheckoutInitiate(body: types.PostCheckoutInitiateBodyParam, metadata: types.PostCheckoutInitiateMetadataParam): Promise<FetchResponse<201, types.PostCheckoutInitiateResponse201>>;
    /**
     * Load the Checkout frontend to complete a payment. The POST request contains the
     * entityId, signature, purchase parameters, and any custom parameters that a merchant
     * optionally sends.
     *
     * Sign the data on the backend and execute the POST from the browser.
     *
     * For more information, see the
     * [documentation](https://developer.peachpayments.com/docs/checkout-payment#form-post-checkout).
     *
     * @summary Initiate Checkout
     * @throws FetchError<400, types.PostCheckoutResponse400> A validation error has occurred with Checkout.
     */
    postCheckout(body: types.PostCheckoutFormDataParam, metadata: types.PostCheckoutMetadataParam): Promise<FetchResponse<200, types.PostCheckoutResponse200>>;
    /**
     * Validate a request before trying to initiate a checkout session.
     *
     * @summary Validate Checkout request
     * @throws FetchError<400, types.PostCheckoutValidateResponse400> Invalid request.
     */
    postCheckoutValidate(body: types.PostCheckoutValidateBodyParam, metadata: types.PostCheckoutValidateMetadataParam): Promise<FetchResponse<200, types.PostCheckoutValidateResponse200>>;
    /**
     * Get the status of a checkout instance.
     *
     * For more information, see the
     * [documentation](https://developer.peachpayments.com/docs/checkout-payment-status).
     *
     * @summary Query Checkout status
     * @throws FetchError<400, types.GetStatusResponse400> Invalid state, check the body for more details.
     */
    getStatus(metadata: types.GetStatusMetadataParam): Promise<FetchResponse<200, types.GetStatusResponse200>>;
    /**
     * Retrieve a list of enabled payment methods for a channel given a particular currency.
     *
     * For more information, see the
     * [documentation](https://developer.peachpayments.com/docs/checkout-merchant-specs).
     *
     * @summary Retrieve a list of payment methods for a currency
     */
    postMerchant_specs(body: types.PostMerchantSpecsBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create a checkout instance for use from Embedded Checkout.
     *
     * For more information, see the
     * [documentation](https://developer.peachpayments.com/docs/checkout-embedded-tutorial#tutorial).
     *
     * @summary Initiate Checkout
     * @throws FetchError<400, types.PostV2CheckoutResponse400> A validation error has occurred with Checkout.
     * @throws FetchError<401, types.PostV2CheckoutResponse401> Request lacks valid authentication, message in response contains specifics.
     * @throws FetchError<404, types.PostV2CheckoutResponse404> Invalid entity ID passed.
     * @throws FetchError<500, types.PostV2CheckoutResponse500> Internal server error.
     */
    postV2Checkout(body: types.PostV2CheckoutBodyParam, metadata: types.PostV2CheckoutMetadataParam): Promise<FetchResponse<200, types.PostV2CheckoutResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
