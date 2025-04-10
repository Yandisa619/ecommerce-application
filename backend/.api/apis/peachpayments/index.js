"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'peachpayments/1.0.0 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
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
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
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
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
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
    SDK.prototype.postCheckoutInitiate = function (body, metadata) {
        return this.core.fetch('/checkout/initiate', 'post', body, metadata);
    };
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
    SDK.prototype.postCheckout = function (body, metadata) {
        return this.core.fetch('/checkout', 'post', body, metadata);
    };
    /**
     * Validate a request before trying to initiate a checkout session.
     *
     * @summary Validate Checkout request
     * @throws FetchError<400, types.PostCheckoutValidateResponse400> Invalid request.
     */
    SDK.prototype.postCheckoutValidate = function (body, metadata) {
        return this.core.fetch('/checkout/validate', 'post', body, metadata);
    };
    /**
     * Get the status of a checkout instance.
     *
     * For more information, see the
     * [documentation](https://developer.peachpayments.com/docs/checkout-payment-status).
     *
     * @summary Query Checkout status
     * @throws FetchError<400, types.GetStatusResponse400> Invalid state, check the body for more details.
     */
    SDK.prototype.getStatus = function (metadata) {
        return this.core.fetch('/status', 'get', metadata);
    };
    /**
     * Retrieve a list of enabled payment methods for a channel given a particular currency.
     *
     * For more information, see the
     * [documentation](https://developer.peachpayments.com/docs/checkout-merchant-specs).
     *
     * @summary Retrieve a list of payment methods for a currency
     */
    SDK.prototype.postMerchant_specs = function (body) {
        return this.core.fetch('/merchant_specs', 'post', body);
    };
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
    SDK.prototype.postV2Checkout = function (body, metadata) {
        return this.core.fetch('/v2/checkout', 'post', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
