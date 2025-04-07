declare const GetStatus: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "authentication.entityId": {
                    readonly type: "string";
                    readonly maxLength: 64;
                    readonly examples: readonly ["8ac7a4ca68c22c4d0168c2caab2e0025"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Merchant's entity ID.";
                };
                readonly checkoutId: {
                    readonly type: "string";
                    readonly maxLength: 64;
                    readonly examples: readonly ["948cc8dec52a11eb85290242ac130003"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Checkout ID.";
                };
                readonly merchantTransactionId: {
                    readonly type: "string";
                    readonly maxLength: 64;
                    readonly examples: readonly ["OrderNo453432"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Merchant transaction ID.";
                };
                readonly signature: {
                    readonly type: "string";
                    readonly maxLength: 64;
                    readonly examples: readonly ["a668342244a9c77b08a2f9090d033d6e2610b431a5c0ca975f32035ed06164f4"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Signature of data signed with secret key of merchant.";
                };
            };
            readonly required: readonly ["authentication.entityId", "signature"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly status: {
                    readonly description: "The status of the object.";
                    readonly type: "string";
                    readonly examples: readonly ["PROCESSING"];
                };
                readonly timestamp: {
                    readonly description: "The remaining time, in seconds, of the checkout instance.";
                    readonly type: "string";
                    readonly examples: readonly [1800];
                };
                readonly redirect_url: {
                    readonly description: "Redirect URL for Checkout.";
                    readonly type: "string";
                };
                readonly redirect_post_data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly amount: {
                            readonly description: "The checkout amount.";
                            readonly type: "string";
                            readonly examples: readonly ["14.99"];
                        };
                        readonly checkoutId: {
                            readonly type: "string";
                            readonly examples: readonly ["948cc8dec52a11eb85290242ac130003"];
                        };
                        readonly currency: {
                            readonly description: "The currency code of the payment request amount.\n\n`ZAR` `USD` `KES` `MUR` `GBP` `EUR`";
                            readonly type: "string";
                            readonly enum: readonly ["ZAR", "USD", "KES", "MUR", "GBP", "EUR"];
                            readonly examples: readonly ["ZAR"];
                        };
                        readonly merchantTransactionId: {
                            readonly type: "string";
                            readonly description: "The merchant transaction ID set when creating the checkout.";
                        };
                        readonly paymentType: {
                            readonly type: "string";
                            readonly enum: readonly ["DB", "PA"];
                            readonly examples: readonly ["DB"];
                            readonly description: "`DB` `PA`";
                        };
                        readonly "result.code": {
                            readonly description: "A code representing the transaction state.";
                            readonly type: "string";
                            readonly examples: readonly ["000.200.100"];
                        };
                        readonly "result.description": {
                            readonly description: "A friendly message.";
                            readonly type: "string";
                            readonly examples: readonly ["Successfully created checkout."];
                        };
                        readonly timestamp: {
                            readonly description: "Date and time when the checkout was created.";
                            readonly type: "string";
                            readonly examples: readonly ["2021-06-17T14:22:22Z"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly "result.code": {
                    readonly description: "A code representing the error.";
                    readonly type: "string";
                    readonly examples: readonly ["200.300.404"];
                };
                readonly "result.description": {
                    readonly description: "A friendly error message.";
                    readonly type: "string";
                    readonly examples: readonly ["Invalid or missing parameter."];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCheckout: {
    readonly formData: {
        readonly type: "object";
        readonly properties: {
            readonly "authentication.entityId": {
                readonly description: "The entity for the request. By default, this is the channel ID.";
                readonly type: "string";
                readonly maxLength: 32;
                readonly examples: readonly ["8ac7a4ca68c22c4d0168c2caab2e0025"];
            };
            readonly signature: {
                readonly description: "Token to verify the integrity of the payment, ensuring that only the merchant sending the request is accepted.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly examples: readonly ["a668342244a9c77b08a2f9090d033d6e2610b431a5c0ca975f32035ed06164f4"];
            };
            readonly merchantTransactionId: {
                readonly description: "Merchant-provided reference number unique for your transactions.";
                readonly type: "string";
                readonly maxLength: 16;
                readonly minLength: 8;
                readonly format: "8-16";
                readonly examples: readonly ["OrderNo453432"];
            };
            readonly amount: {
                readonly description: "The amount of the payment request. The period is used as the decimal separator.\n\nAn amount of 0 is only supported when the `paymentType` is `PA` and `createRegistration` is set to `true`.\n\nM-PESA does not support decimal amounts, so Checkout automatically rounds them up.\n";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["1010.22"];
            };
            readonly paymentType: {
                readonly description: "The payment type for the request.\n\nDoes not accept `RG`, but you can tokenise a card by performing a DB or PA with `createRegistration`.\n\nPA is only supported when `forceDefaultMethod` is set to `true` and `defaultPaymentMethod` is `CARD`.\nFollowing a PA, you can either [capture](https://developer.peachpayments.com/docs/card-manage-payments#capture-a-preauthorisation) or [reverse](https://developer.peachpayments.com/docs/card-manage-payments#reverse-a-preauthorisation) the PA.\n\nRefund transactions through the Dashboard or as described in the [documentation](https://developer.peachpayments.com/docs/checkout-refund).\n";
                readonly type: "string";
                readonly enum: readonly ["DB", "PA"];
                readonly examples: readonly ["DB"];
            };
            readonly currency: {
                readonly description: "The currency code of the payment request amount.";
                readonly type: "string";
                readonly enum: readonly ["ZAR", "USD", "KES", "MUR", "GBP", "EUR"];
                readonly examples: readonly ["ZAR"];
            };
            readonly nonce: {
                readonly description: "Unique value to represent each request.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly format: "string (1-64)";
                readonly examples: readonly ["UNQ00012345678"];
            };
            readonly shopperResultUrl: {
                readonly description: "Checkout uses a POST request to redirect the customer to this URL after the customer completes checkout. Must be a valid URL that can be accessed through a browser.";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://mydemostore.com/OrderNo453432"];
            };
            readonly defaultPaymentMethod: {
                readonly description: "The preferred payment method which is active in the checkout page at the point of redirecting.";
                readonly type: "string";
                readonly enum: readonly ["CARD", "MASTERPASS", "MOBICRED", "MPESA", "1FORYOU", "APLUS", "PAYPAL", "ZEROPAY", "PAYFLEX", "BLINKBYEMTEL", "CAPITECPAY", "PAYBYBANK", "APPLE PAY", "GOOGLEPAY", "SAMSUNGPAY", "MCBJUICE", "RCS", "FLOAT", "HAPPYPAY"];
                readonly examples: readonly ["CARD"];
            };
            readonly forceDefaultMethod: {
                readonly description: "Force the default payment method to be the only payment method.";
                readonly type: "string";
                readonly enum: readonly ["true", "false"];
                readonly default: "false";
                readonly examples: readonly ["false"];
            };
            readonly merchantInvoiceId: {
                readonly description: "Merchant-provided invoice number unique for your transactions. This identifier is not sent onwards.";
                readonly type: "string";
                readonly minLength: 8;
                readonly maxLength: 255;
                readonly format: "string (8-255)";
                readonly examples: readonly ["INV-0001"];
            };
            readonly cancelUrl: {
                readonly description: "The customer is redirected to this URL if they cancel checkout. It must be a valid URL that can be reached through a browser. To enable the `cancelUrl` parameter, [contact support](https://support.peachpayments.com/support/tickets/new).";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://example.com/OrderNo453432/cancelled"];
            };
            readonly notificationUrl: {
                readonly description: "Peach Payments sends a webhook to this URL for any changes to this checkout instance, in addition to the webhook sent to the preconfigured URL.";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://example.com/OrderNo453432/webhook"];
            };
            readonly "customParameters[name]": {
                readonly description: "A name value pair used for sending custom information. To display custom parameters in the Peach Payments Dashboard > transaction details panel > **More details** tab, use the `customParameters[auxData]:\"{\\\"user_id\\\":\\\"12345\\\",\\\"paymentId\\\":\\\"98765\\\"}\"` format, changing the parameters as required.";
                readonly type: "string";
                readonly format: "name: [a-zA-Z0-9\\._]{3,64} value: [\\s\\S]{0,2048}";
                readonly examples: readonly ["name: Name1 value: Value1"];
            };
            readonly "customer.merchantCustomerId": {
                readonly description: "An identifier for this customer. Typically this is the ID that identifies the shopper in the shop's system.";
                readonly type: "string";
                readonly maxLength: 48;
                readonly minLength: 0;
                readonly format: "[\\s\\S]{0,48}";
                readonly examples: readonly ["971020"];
            };
            readonly "customer.givenName": {
                readonly description: "The customer's first name or given name.\n\nRequired if you send in any other customer parameters, and for some risk checks and payment providers.\n\nPeach Payments recommends including the name so that it displays in the Peach Dashboard and is available for subsequent queries.\n\nTruncated after 48 characters.\n";
                readonly type: "string";
                readonly maxLength: 48;
                readonly minLength: 0;
                readonly format: "[\\s\\S]{0,48}";
                readonly examples: readonly ["John"];
            };
            readonly "customer.surname": {
                readonly description: "The customer's last name or surname.\n\nRequired if you send in any other customer parameters, and for some risk checks and payment providers.\n\nPeach Payments recommends including the surname so that it displays in the Peach Dashboard and is available for subsequent queries.\n\nTruncated after 48 characters.\n";
                readonly type: "string";
                readonly maxLength: 48;
                readonly minLength: 0;
                readonly format: "[\\s\\S]{0,48}";
                readonly examples: readonly ["Smith"];
            };
            readonly "customer.mobile": {
                readonly description: "The customer's mobile number.";
                readonly type: "string";
                readonly maxLength: 24;
                readonly minLength: 5;
                readonly format: "[+0-9][0-9 \\.()/-]{5,24}";
                readonly examples: readonly ["+27123456789"];
            };
            readonly "customer.email": {
                readonly description: "The customer's email address.";
                readonly type: "string";
                readonly maxLength: 128;
                readonly minLength: 6;
                readonly format: "[\\s\\S]{6,128}";
                readonly examples: readonly ["johnsmith@example.com"];
            };
            readonly "customer.status": {
                readonly description: "The customer's status. Accepts `NEW` or `EXISTING`.";
                readonly type: "string";
                readonly enum: readonly ["NEW", "EXISTING"];
                readonly examples: readonly ["EXISTING"];
            };
            readonly "customer.birthDate": {
                readonly description: "The customer's birth date in the yyyy-MM-dd format.";
                readonly type: "string";
                readonly format: "yyyy-MM-dd";
                readonly examples: readonly ["1970-02-17"];
            };
            readonly "customer.ip": {
                readonly description: "The customer's IP address.";
                readonly type: "string";
                readonly maxLength: 255;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,255}";
                readonly examples: readonly ["192.168.1.1"];
            };
            readonly "customer.phone": {
                readonly description: "The customer's phone number.";
                readonly type: "string";
                readonly maxLength: 24;
                readonly minLength: 5;
                readonly format: "[+0-9][0-9 \\.()/-]{5,24}";
                readonly examples: readonly [27123456789];
            };
            readonly "customer.idNumber": {
                readonly description: "The customer's ID number, required for high-risk merchants supporting Capitec Pay.";
                readonly type: "string";
                readonly maxLength: 13;
                readonly minLength: 13;
                readonly format: "[\\s\\S]{13,13}";
                readonly examples: readonly ["9001010000084"];
            };
            readonly "billing.street1": {
                readonly description: "The door number, floor, building number, building name, and/or street name of the billing address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["1 Example Road"];
            };
            readonly "billing.street2": {
                readonly description: "The adjoining road or locality, if required, of the billing address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["LocalityA"];
            };
            readonly "billing.city": {
                readonly description: "The town, district, or city of the billing address.";
                readonly type: "string";
                readonly maxLength: 80;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,80}";
                readonly examples: readonly ["Cape Town"];
            };
            readonly "billing.company": {
                readonly description: "The company of the billing address.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,64}";
                readonly examples: readonly ["CompanyA"];
            };
            readonly "billing.country": {
                readonly description: "The country of the billing address (ISO 3166-1).";
                readonly type: "string";
                readonly maxLength: 3;
                readonly minLength: 3;
                readonly format: "ISO 3166-1";
                readonly examples: readonly ["ZA"];
            };
            readonly "billing.state": {
                readonly description: "The county, state, or region of the billing address.";
                readonly type: "string";
                readonly maxLength: 50;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,50}";
                readonly examples: readonly ["Western Cape"];
            };
            readonly "billing.postcode": {
                readonly description: "The postal code or ZIP code of the billing address.";
                readonly type: "string";
                readonly maxLength: 30;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,30}";
                readonly examples: readonly ["1234"];
            };
            readonly "shipping.street1": {
                readonly description: "The door number, floor, building number, building name, and/or street name of the shipping address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["1 Example Road"];
            };
            readonly "shipping.street2": {
                readonly description: "The adjoining road or locality, if required, of the shipping address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["LocalityA"];
            };
            readonly "shipping.city": {
                readonly description: "The town, district, or city of the shipping address.";
                readonly type: "string";
                readonly maxLength: 80;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,80}";
                readonly examples: readonly ["Cape Town"];
            };
            readonly "shipping.company": {
                readonly description: "The company of the shipping address.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,64}";
                readonly examples: readonly ["CompanyA"];
            };
            readonly "shipping.postcode": {
                readonly description: "The postal code or ZIP code of the shipping address.";
                readonly type: "string";
                readonly maxLength: 30;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,30}";
                readonly examples: readonly ["1234"];
            };
            readonly "shipping.country": {
                readonly description: "The country of the shipping address (ISO 3166-1).";
                readonly type: "string";
                readonly maxLength: 3;
                readonly minLength: 3;
                readonly format: "ISO 3166-1";
                readonly examples: readonly ["ZA"];
            };
            readonly "shipping.state": {
                readonly description: "The county, state, or region of the shipping address.";
                readonly type: "string";
                readonly maxLength: 50;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,50}";
                readonly examples: readonly ["Western Cape"];
            };
            readonly "cart.tax": {
                readonly description: "The tax percentage applied to the price of the item in the shopping cart.";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["15.00"];
            };
            readonly "cart.shippingAmount": {
                readonly description: "The total amount of the cart item including quantity.";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["12.25"];
            };
            readonly "cart.discount": {
                readonly description: "Discount amount applied on order amount.";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["02.25"];
            };
            readonly createRegistration: {
                readonly description: "Used to enable [card tokenisation](https://developer.peachpayments.com/docs/checkout-tokenisation) when customer pays with card. You must get permission from your customer before tokenising their cards.\n\nCannot be `true` if `allowStoringDetails` is true.\n";
                readonly type: "string";
                readonly enum: readonly ["true", "false"];
                readonly examples: readonly ["false"];
            };
            readonly cardTokens: {
                readonly description: "List of comma-separated card tokens. The card tokens must be linked to the customer as they enable one-click payment support for the customer. See the [documentation](https://developer.peachpayments.com/docs/checkout-tokenisation) for more information.";
                readonly type: "string";
                readonly examples: readonly ["8ac7a49f8e9f15d2018ea09b285f0eaa,8ac7a49f8e9f15d2018ea09b285f0acc"];
            };
            readonly allowStoringDetails: {
                readonly description: "Allow the customer to store their card details for future use. When this is set, the customer is given an option to tokenise their card during checkout.\n\nIf the customer chooses to store their card details, a `registrationId` is returned in the response from checkout. Similar to `createRegistration`.\n\nCannot be `true` if `createRegistration` is true.\n\nSee the [documentation](https://developer.peachpayments.com/docs/checkout-tokenisation) for more information.\n";
                readonly type: "string";
                readonly enum: readonly ["true", "false"];
                readonly examples: readonly ["false"];
            };
            readonly originator: {
                readonly description: "Used to provide a name for the application that is creating the checkout instance.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly examples: readonly ["Webstore"];
            };
            readonly returnTo: {
                readonly description: "Text to display on \"Return to Store\" button on completing checkout.";
                readonly type: "string";
                readonly enum: readonly ["STORE", "INVOICE"];
            };
        };
        readonly required: readonly ["authentication.entityId", "signature", "merchantTransactionId", "amount", "paymentType", "currency", "nonce", "shopperResultUrl"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly Referer: {
                    readonly type: "string";
                    readonly examples: readonly ["https://example.com"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An allowlisted domain for the merchant.";
                };
            };
            readonly required: readonly ["Referer"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "string";
            readonly description: "The checkout frontend HTML page.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "string";
            readonly description: "An error page detailing the error that has occured.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCheckoutInitiate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly "authentication.entityId": {
                readonly description: "The entity for the request. By default, this is the channel ID.";
                readonly type: "string";
                readonly maxLength: 32;
                readonly examples: readonly ["8ac7a4ca68c22c4d0168c2caab2e0025"];
            };
            readonly signature: {
                readonly description: "Token to verify the integrity of the payment, ensuring that only the merchant sending the request is accepted.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly examples: readonly ["a668342244a9c77b08a2f9090d033d6e2610b431a5c0ca975f32035ed06164f4"];
            };
            readonly merchantTransactionId: {
                readonly description: "Merchant-provided reference number unique for your transactions.";
                readonly type: "string";
                readonly maxLength: 16;
                readonly minLength: 8;
                readonly format: "8-16";
                readonly examples: readonly ["OrderNo453432"];
            };
            readonly amount: {
                readonly description: "The amount of the payment request. The period is used as the decimal separator.\n\nAn amount of 0 is only supported when the `paymentType` is `PA` and `createRegistration` is set to `true`.\n\nM-PESA does not support decimal amounts, so Checkout automatically rounds them up.\n";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["1010.22"];
            };
            readonly paymentType: {
                readonly description: "The payment type for the request.\n\nDoes not accept `RG`, but you can tokenise a card by performing a DB or PA with `createRegistration`.\n\nPA is only supported when `forceDefaultMethod` is set to `true` and `defaultPaymentMethod` is `CARD`.\nFollowing a PA, you can either [capture](https://developer.peachpayments.com/docs/card-manage-payments#capture-a-preauthorisation) or [reverse](https://developer.peachpayments.com/docs/card-manage-payments#reverse-a-preauthorisation) the PA.\n\nRefund transactions through the Dashboard or as described in the [documentation](https://developer.peachpayments.com/docs/checkout-refund).\n";
                readonly type: "string";
                readonly enum: readonly ["DB", "PA"];
                readonly examples: readonly ["DB"];
            };
            readonly currency: {
                readonly description: "The currency code of the payment request amount.";
                readonly type: "string";
                readonly enum: readonly ["ZAR", "USD", "KES", "MUR", "GBP", "EUR"];
                readonly examples: readonly ["ZAR"];
            };
            readonly nonce: {
                readonly description: "Unique value to represent each request.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly format: "string (1-64)";
                readonly examples: readonly ["UNQ00012345678"];
            };
            readonly shopperResultUrl: {
                readonly description: "Checkout uses a POST request to redirect the customer to this URL after the customer completes checkout. Must be a valid URL that can be accessed through a browser.";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://mydemostore.com/OrderNo453432"];
            };
            readonly defaultPaymentMethod: {
                readonly description: "The preferred payment method which is active in the checkout page at the point of redirecting.";
                readonly type: "string";
                readonly enum: readonly ["CARD", "MASTERPASS", "MOBICRED", "MPESA", "1FORYOU", "APLUS", "PAYPAL", "ZEROPAY", "PAYFLEX", "BLINKBYEMTEL", "CAPITECPAY", "PAYBYBANK", "APPLE PAY", "GOOGLEPAY", "SAMSUNGPAY", "MCBJUICE", "RCS", "FLOAT", "HAPPYPAY"];
                readonly examples: readonly ["CARD"];
            };
            readonly forceDefaultMethod: {
                readonly description: "Force the default payment method to be the only payment method.";
                readonly type: "string";
                readonly enum: readonly ["true", "false"];
                readonly default: "false";
                readonly examples: readonly ["false"];
            };
            readonly merchantInvoiceId: {
                readonly description: "Merchant-provided invoice number unique for your transactions. This identifier is not sent onwards.";
                readonly type: "string";
                readonly minLength: 8;
                readonly maxLength: 255;
                readonly format: "string (8-255)";
                readonly examples: readonly ["INV-0001"];
            };
            readonly cancelUrl: {
                readonly description: "The customer is redirected to this URL if they cancel checkout. It must be a valid URL that can be reached through a browser. To enable the `cancelUrl` parameter, [contact support](https://support.peachpayments.com/support/tickets/new).";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://example.com/OrderNo453432/cancelled"];
            };
            readonly notificationUrl: {
                readonly description: "Peach Payments sends a webhook to this URL for any changes to this checkout instance, in addition to the webhook sent to the preconfigured URL.";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://example.com/OrderNo453432/webhook"];
            };
            readonly "customParameters[name]": {
                readonly description: "A name value pair used for sending custom information. To display custom parameters in the Peach Payments Dashboard > transaction details panel > **More details** tab, use the `customParameters[auxData]:\"{\\\"user_id\\\":\\\"12345\\\",\\\"paymentId\\\":\\\"98765\\\"}\"` format, changing the parameters as required.";
                readonly type: "string";
                readonly format: "name: [a-zA-Z0-9\\._]{3,64} value: [\\s\\S]{0,2048}";
                readonly examples: readonly ["name: Name1 value: Value1"];
            };
            readonly "customer.merchantCustomerId": {
                readonly description: "An identifier for this customer. Typically this is the ID that identifies the shopper in the shop's system.";
                readonly type: "string";
                readonly maxLength: 48;
                readonly minLength: 0;
                readonly format: "[\\s\\S]{0,48}";
                readonly examples: readonly ["971020"];
            };
            readonly "customer.givenName": {
                readonly description: "The customer's first name or given name.\n\nRequired if you send in any other customer parameters, and for some risk checks and payment providers.\n\nPeach Payments recommends including the name so that it displays in the Peach Dashboard and is available for subsequent queries.\n\nTruncated after 48 characters.\n";
                readonly type: "string";
                readonly maxLength: 48;
                readonly minLength: 0;
                readonly format: "[\\s\\S]{0,48}";
                readonly examples: readonly ["John"];
            };
            readonly "customer.surname": {
                readonly description: "The customer's last name or surname.\n\nRequired if you send in any other customer parameters, and for some risk checks and payment providers.\n\nPeach Payments recommends including the surname so that it displays in the Peach Dashboard and is available for subsequent queries.\n\nTruncated after 48 characters.\n";
                readonly type: "string";
                readonly maxLength: 48;
                readonly minLength: 0;
                readonly format: "[\\s\\S]{0,48}";
                readonly examples: readonly ["Smith"];
            };
            readonly "customer.mobile": {
                readonly description: "The customer's mobile number.";
                readonly type: "string";
                readonly maxLength: 24;
                readonly minLength: 5;
                readonly format: "[+0-9][0-9 \\.()/-]{5,24}";
                readonly examples: readonly ["+27123456789"];
            };
            readonly "customer.email": {
                readonly description: "The customer's email address.";
                readonly type: "string";
                readonly maxLength: 128;
                readonly minLength: 6;
                readonly format: "[\\s\\S]{6,128}";
                readonly examples: readonly ["johnsmith@example.com"];
            };
            readonly "customer.status": {
                readonly description: "The customer's status. Accepts `NEW` or `EXISTING`.";
                readonly type: "string";
                readonly enum: readonly ["NEW", "EXISTING"];
                readonly examples: readonly ["EXISTING"];
            };
            readonly "customer.birthDate": {
                readonly description: "The customer's birth date in the yyyy-MM-dd format.";
                readonly type: "string";
                readonly format: "yyyy-MM-dd";
                readonly examples: readonly ["1970-02-17"];
            };
            readonly "customer.ip": {
                readonly description: "The customer's IP address.";
                readonly type: "string";
                readonly maxLength: 255;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,255}";
                readonly examples: readonly ["192.168.1.1"];
            };
            readonly "customer.phone": {
                readonly description: "The customer's phone number.";
                readonly type: "string";
                readonly maxLength: 24;
                readonly minLength: 5;
                readonly format: "[+0-9][0-9 \\.()/-]{5,24}";
                readonly examples: readonly [27123456789];
            };
            readonly "customer.idNumber": {
                readonly description: "The customer's ID number, required for high-risk merchants supporting Capitec Pay.";
                readonly type: "string";
                readonly maxLength: 13;
                readonly minLength: 13;
                readonly format: "[\\s\\S]{13,13}";
                readonly examples: readonly ["9001010000084"];
            };
            readonly "billing.street1": {
                readonly description: "The door number, floor, building number, building name, and/or street name of the billing address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["1 Example Road"];
            };
            readonly "billing.street2": {
                readonly description: "The adjoining road or locality, if required, of the billing address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["LocalityA"];
            };
            readonly "billing.city": {
                readonly description: "The town, district, or city of the billing address.";
                readonly type: "string";
                readonly maxLength: 80;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,80}";
                readonly examples: readonly ["Cape Town"];
            };
            readonly "billing.company": {
                readonly description: "The company of the billing address.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,64}";
                readonly examples: readonly ["CompanyA"];
            };
            readonly "billing.country": {
                readonly description: "The country of the billing address (ISO 3166-1).";
                readonly type: "string";
                readonly maxLength: 3;
                readonly minLength: 3;
                readonly format: "ISO 3166-1";
                readonly examples: readonly ["ZA"];
            };
            readonly "billing.state": {
                readonly description: "The county, state, or region of the billing address.";
                readonly type: "string";
                readonly maxLength: 50;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,50}";
                readonly examples: readonly ["Western Cape"];
            };
            readonly "billing.postcode": {
                readonly description: "The postal code or ZIP code of the billing address.";
                readonly type: "string";
                readonly maxLength: 30;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,30}";
                readonly examples: readonly ["1234"];
            };
            readonly "shipping.street1": {
                readonly description: "The door number, floor, building number, building name, and/or street name of the shipping address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["1 Example Road"];
            };
            readonly "shipping.street2": {
                readonly description: "The adjoining road or locality, if required, of the shipping address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["LocalityA"];
            };
            readonly "shipping.city": {
                readonly description: "The town, district, or city of the shipping address.";
                readonly type: "string";
                readonly maxLength: 80;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,80}";
                readonly examples: readonly ["Cape Town"];
            };
            readonly "shipping.company": {
                readonly description: "The company of the shipping address.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,64}";
                readonly examples: readonly ["CompanyA"];
            };
            readonly "shipping.postcode": {
                readonly description: "The postal code or ZIP code of the shipping address.";
                readonly type: "string";
                readonly maxLength: 30;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,30}";
                readonly examples: readonly ["1234"];
            };
            readonly "shipping.country": {
                readonly description: "The country of the shipping address (ISO 3166-1).";
                readonly type: "string";
                readonly maxLength: 3;
                readonly minLength: 3;
                readonly format: "ISO 3166-1";
                readonly examples: readonly ["ZA"];
            };
            readonly "shipping.state": {
                readonly description: "The county, state, or region of the shipping address.";
                readonly type: "string";
                readonly maxLength: 50;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,50}";
                readonly examples: readonly ["Western Cape"];
            };
            readonly "cart.tax": {
                readonly description: "The tax percentage applied to the price of the item in the shopping cart.";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["15.00"];
            };
            readonly "cart.shippingAmount": {
                readonly description: "The total amount of the cart item including quantity.";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["12.25"];
            };
            readonly "cart.discount": {
                readonly description: "Discount amount applied on order amount.";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["02.25"];
            };
            readonly createRegistration: {
                readonly description: "Used to enable [card tokenisation](https://developer.peachpayments.com/docs/checkout-tokenisation) when customer pays with card. You must get permission from your customer before tokenising their cards.\n\nCannot be `true` if `allowStoringDetails` is true.\n";
                readonly type: "string";
                readonly enum: readonly ["true", "false"];
                readonly examples: readonly ["false"];
            };
            readonly cardTokens: {
                readonly description: "List of comma-separated card tokens. The card tokens must be linked to the customer as they enable one-click payment support for the customer. See the [documentation](https://developer.peachpayments.com/docs/checkout-tokenisation) for more information.";
                readonly type: "string";
                readonly examples: readonly ["8ac7a49f8e9f15d2018ea09b285f0eaa,8ac7a49f8e9f15d2018ea09b285f0acc"];
            };
            readonly allowStoringDetails: {
                readonly description: "Allow the customer to store their card details for future use. When this is set, the customer is given an option to tokenise their card during checkout.\n\nIf the customer chooses to store their card details, a `registrationId` is returned in the response from checkout. Similar to `createRegistration`.\n\nCannot be `true` if `createRegistration` is true.\n\nSee the [documentation](https://developer.peachpayments.com/docs/checkout-tokenisation) for more information.\n";
                readonly type: "string";
                readonly enum: readonly ["true", "false"];
                readonly examples: readonly ["false"];
            };
            readonly originator: {
                readonly description: "Used to provide a name for the application that is creating the checkout instance.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly examples: readonly ["Webstore"];
            };
            readonly returnTo: {
                readonly description: "Text to display on \"Return to Store\" button on completing checkout.";
                readonly type: "string";
                readonly enum: readonly ["STORE", "INVOICE"];
            };
        };
        readonly required: readonly ["authentication.entityId", "signature", "merchantTransactionId", "amount", "paymentType", "currency", "nonce", "shopperResultUrl"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly Referer: {
                    readonly type: "string";
                    readonly examples: readonly ["https://example.com"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An allowlisted domain for the merchant.";
                };
            };
            readonly required: readonly ["Referer"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly redirectUrl: {
                    readonly type: "string";
                    readonly format: "url";
                    readonly description: "Redirect the user to this URL to complete their payment.";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostCheckoutValidate: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly "authentication.entityId": {
                readonly description: "The entity for the request. By default, this is the channel ID.";
                readonly type: "string";
                readonly maxLength: 32;
                readonly examples: readonly ["8ac7a4ca68c22c4d0168c2caab2e0025"];
            };
            readonly signature: {
                readonly description: "Token to verify the integrity of the payment, ensuring that only the merchant sending the request is accepted.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly examples: readonly ["a668342244a9c77b08a2f9090d033d6e2610b431a5c0ca975f32035ed06164f4"];
            };
            readonly merchantTransactionId: {
                readonly description: "Merchant-provided reference number unique for your transactions.";
                readonly type: "string";
                readonly maxLength: 16;
                readonly minLength: 8;
                readonly format: "8-16";
                readonly examples: readonly ["OrderNo453432"];
            };
            readonly amount: {
                readonly description: "The amount of the payment request. The period is used as the decimal separator.\n\nAn amount of 0 is only supported when the `paymentType` is `PA` and `createRegistration` is set to `true`.\n\nM-PESA does not support decimal amounts, so Checkout automatically rounds them up.\n";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["1010.22"];
            };
            readonly paymentType: {
                readonly description: "The payment type for the request.\n\nDoes not accept `RG`, but you can tokenise a card by performing a DB or PA with `createRegistration`.\n\nPA is only supported when `forceDefaultMethod` is set to `true` and `defaultPaymentMethod` is `CARD`.\nFollowing a PA, you can either [capture](https://developer.peachpayments.com/docs/card-manage-payments#capture-a-preauthorisation) or [reverse](https://developer.peachpayments.com/docs/card-manage-payments#reverse-a-preauthorisation) the PA.\n\nRefund transactions through the Dashboard or as described in the [documentation](https://developer.peachpayments.com/docs/checkout-refund).\n";
                readonly type: "string";
                readonly enum: readonly ["DB", "PA"];
                readonly examples: readonly ["DB"];
            };
            readonly currency: {
                readonly description: "The currency code of the payment request amount.";
                readonly type: "string";
                readonly enum: readonly ["ZAR", "USD", "KES", "MUR", "GBP", "EUR"];
                readonly examples: readonly ["ZAR"];
            };
            readonly nonce: {
                readonly description: "Unique value to represent each request.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly format: "string (1-64)";
                readonly examples: readonly ["UNQ00012345678"];
            };
            readonly shopperResultUrl: {
                readonly description: "Checkout uses a POST request to redirect the customer to this URL after the customer completes checkout. Must be a valid URL that can be accessed through a browser.";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://mydemostore.com/OrderNo453432"];
            };
            readonly defaultPaymentMethod: {
                readonly description: "The preferred payment method which is active in the checkout page at the point of redirecting.";
                readonly type: "string";
                readonly enum: readonly ["CARD", "MASTERPASS", "MOBICRED", "MPESA", "1FORYOU", "APLUS", "PAYPAL", "ZEROPAY", "PAYFLEX", "BLINKBYEMTEL", "CAPITECPAY", "PAYBYBANK", "APPLE PAY", "GOOGLEPAY", "SAMSUNGPAY", "MCBJUICE", "RCS", "FLOAT", "HAPPYPAY"];
                readonly examples: readonly ["CARD"];
            };
            readonly forceDefaultMethod: {
                readonly description: "Force the default payment method to be the only payment method.";
                readonly type: "string";
                readonly enum: readonly ["true", "false"];
                readonly default: "false";
                readonly examples: readonly ["false"];
            };
            readonly merchantInvoiceId: {
                readonly description: "Merchant-provided invoice number unique for your transactions. This identifier is not sent onwards.";
                readonly type: "string";
                readonly minLength: 8;
                readonly maxLength: 255;
                readonly format: "string (8-255)";
                readonly examples: readonly ["INV-0001"];
            };
            readonly cancelUrl: {
                readonly description: "The customer is redirected to this URL if they cancel checkout. It must be a valid URL that can be reached through a browser. To enable the `cancelUrl` parameter, [contact support](https://support.peachpayments.com/support/tickets/new).";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://example.com/OrderNo453432/cancelled"];
            };
            readonly notificationUrl: {
                readonly description: "Peach Payments sends a webhook to this URL for any changes to this checkout instance, in addition to the webhook sent to the preconfigured URL.";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://example.com/OrderNo453432/webhook"];
            };
            readonly "customParameters[name]": {
                readonly description: "A name value pair used for sending custom information. To display custom parameters in the Peach Payments Dashboard > transaction details panel > **More details** tab, use the `customParameters[auxData]:\"{\\\"user_id\\\":\\\"12345\\\",\\\"paymentId\\\":\\\"98765\\\"}\"` format, changing the parameters as required.";
                readonly type: "string";
                readonly format: "name: [a-zA-Z0-9\\._]{3,64} value: [\\s\\S]{0,2048}";
                readonly examples: readonly ["name: Name1 value: Value1"];
            };
            readonly "customer.merchantCustomerId": {
                readonly description: "An identifier for this customer. Typically this is the ID that identifies the shopper in the shop's system.";
                readonly type: "string";
                readonly maxLength: 48;
                readonly minLength: 0;
                readonly format: "[\\s\\S]{0,48}";
                readonly examples: readonly ["971020"];
            };
            readonly "customer.givenName": {
                readonly description: "The customer's first name or given name.\n\nRequired if you send in any other customer parameters, and for some risk checks and payment providers.\n\nPeach Payments recommends including the name so that it displays in the Peach Dashboard and is available for subsequent queries.\n\nTruncated after 48 characters.\n";
                readonly type: "string";
                readonly maxLength: 48;
                readonly minLength: 0;
                readonly format: "[\\s\\S]{0,48}";
                readonly examples: readonly ["John"];
            };
            readonly "customer.surname": {
                readonly description: "The customer's last name or surname.\n\nRequired if you send in any other customer parameters, and for some risk checks and payment providers.\n\nPeach Payments recommends including the surname so that it displays in the Peach Dashboard and is available for subsequent queries.\n\nTruncated after 48 characters.\n";
                readonly type: "string";
                readonly maxLength: 48;
                readonly minLength: 0;
                readonly format: "[\\s\\S]{0,48}";
                readonly examples: readonly ["Smith"];
            };
            readonly "customer.mobile": {
                readonly description: "The customer's mobile number.";
                readonly type: "string";
                readonly maxLength: 24;
                readonly minLength: 5;
                readonly format: "[+0-9][0-9 \\.()/-]{5,24}";
                readonly examples: readonly ["+27123456789"];
            };
            readonly "customer.email": {
                readonly description: "The customer's email address.";
                readonly type: "string";
                readonly maxLength: 128;
                readonly minLength: 6;
                readonly format: "[\\s\\S]{6,128}";
                readonly examples: readonly ["johnsmith@example.com"];
            };
            readonly "customer.status": {
                readonly description: "The customer's status. Accepts `NEW` or `EXISTING`.";
                readonly type: "string";
                readonly enum: readonly ["NEW", "EXISTING"];
                readonly examples: readonly ["EXISTING"];
            };
            readonly "customer.birthDate": {
                readonly description: "The customer's birth date in the yyyy-MM-dd format.";
                readonly type: "string";
                readonly format: "yyyy-MM-dd";
                readonly examples: readonly ["1970-02-17"];
            };
            readonly "customer.ip": {
                readonly description: "The customer's IP address.";
                readonly type: "string";
                readonly maxLength: 255;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,255}";
                readonly examples: readonly ["192.168.1.1"];
            };
            readonly "customer.phone": {
                readonly description: "The customer's phone number.";
                readonly type: "string";
                readonly maxLength: 24;
                readonly minLength: 5;
                readonly format: "[+0-9][0-9 \\.()/-]{5,24}";
                readonly examples: readonly [27123456789];
            };
            readonly "customer.idNumber": {
                readonly description: "The customer's ID number, required for high-risk merchants supporting Capitec Pay.";
                readonly type: "string";
                readonly maxLength: 13;
                readonly minLength: 13;
                readonly format: "[\\s\\S]{13,13}";
                readonly examples: readonly ["9001010000084"];
            };
            readonly "billing.street1": {
                readonly description: "The door number, floor, building number, building name, and/or street name of the billing address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["1 Example Road"];
            };
            readonly "billing.street2": {
                readonly description: "The adjoining road or locality, if required, of the billing address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["LocalityA"];
            };
            readonly "billing.city": {
                readonly description: "The town, district, or city of the billing address.";
                readonly type: "string";
                readonly maxLength: 80;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,80}";
                readonly examples: readonly ["Cape Town"];
            };
            readonly "billing.company": {
                readonly description: "The company of the billing address.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,64}";
                readonly examples: readonly ["CompanyA"];
            };
            readonly "billing.country": {
                readonly description: "The country of the billing address (ISO 3166-1).";
                readonly type: "string";
                readonly maxLength: 3;
                readonly minLength: 3;
                readonly format: "ISO 3166-1";
                readonly examples: readonly ["ZA"];
            };
            readonly "billing.state": {
                readonly description: "The county, state, or region of the billing address.";
                readonly type: "string";
                readonly maxLength: 50;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,50}";
                readonly examples: readonly ["Western Cape"];
            };
            readonly "billing.postcode": {
                readonly description: "The postal code or ZIP code of the billing address.";
                readonly type: "string";
                readonly maxLength: 30;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,30}";
                readonly examples: readonly ["1234"];
            };
            readonly "shipping.street1": {
                readonly description: "The door number, floor, building number, building name, and/or street name of the shipping address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["1 Example Road"];
            };
            readonly "shipping.street2": {
                readonly description: "The adjoining road or locality, if required, of the shipping address.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,100}";
                readonly examples: readonly ["LocalityA"];
            };
            readonly "shipping.city": {
                readonly description: "The town, district, or city of the shipping address.";
                readonly type: "string";
                readonly maxLength: 80;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,80}";
                readonly examples: readonly ["Cape Town"];
            };
            readonly "shipping.company": {
                readonly description: "The company of the shipping address.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,64}";
                readonly examples: readonly ["CompanyA"];
            };
            readonly "shipping.postcode": {
                readonly description: "The postal code or ZIP code of the shipping address.";
                readonly type: "string";
                readonly maxLength: 30;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,30}";
                readonly examples: readonly ["1234"];
            };
            readonly "shipping.country": {
                readonly description: "The country of the shipping address (ISO 3166-1).";
                readonly type: "string";
                readonly maxLength: 3;
                readonly minLength: 3;
                readonly format: "ISO 3166-1";
                readonly examples: readonly ["ZA"];
            };
            readonly "shipping.state": {
                readonly description: "The county, state, or region of the shipping address.";
                readonly type: "string";
                readonly maxLength: 50;
                readonly minLength: 1;
                readonly format: "[\\s\\S]{1,50}";
                readonly examples: readonly ["Western Cape"];
            };
            readonly "cart.tax": {
                readonly description: "The tax percentage applied to the price of the item in the shopping cart.";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["15.00"];
            };
            readonly "cart.shippingAmount": {
                readonly description: "The total amount of the cart item including quantity.";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["12.25"];
            };
            readonly "cart.discount": {
                readonly description: "Discount amount applied on order amount.";
                readonly type: "string";
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly ["02.25"];
            };
            readonly createRegistration: {
                readonly description: "Used to enable [card tokenisation](https://developer.peachpayments.com/docs/checkout-tokenisation) when customer pays with card. You must get permission from your customer before tokenising their cards.\n\nCannot be `true` if `allowStoringDetails` is true.\n";
                readonly type: "string";
                readonly enum: readonly ["true", "false"];
                readonly examples: readonly ["false"];
            };
            readonly cardTokens: {
                readonly description: "List of comma-separated card tokens. The card tokens must be linked to the customer as they enable one-click payment support for the customer. See the [documentation](https://developer.peachpayments.com/docs/checkout-tokenisation) for more information.";
                readonly type: "string";
                readonly examples: readonly ["8ac7a49f8e9f15d2018ea09b285f0eaa,8ac7a49f8e9f15d2018ea09b285f0acc"];
            };
            readonly allowStoringDetails: {
                readonly description: "Allow the customer to store their card details for future use. When this is set, the customer is given an option to tokenise their card during checkout.\n\nIf the customer chooses to store their card details, a `registrationId` is returned in the response from checkout. Similar to `createRegistration`.\n\nCannot be `true` if `createRegistration` is true.\n\nSee the [documentation](https://developer.peachpayments.com/docs/checkout-tokenisation) for more information.\n";
                readonly type: "string";
                readonly enum: readonly ["true", "false"];
                readonly examples: readonly ["false"];
            };
            readonly originator: {
                readonly description: "Used to provide a name for the application that is creating the checkout instance.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly examples: readonly ["Webstore"];
            };
            readonly returnTo: {
                readonly description: "Text to display on \"Return to Store\" button on completing checkout.";
                readonly type: "string";
                readonly enum: readonly ["STORE", "INVOICE"];
            };
        };
        readonly required: readonly ["authentication.entityId", "signature", "merchantTransactionId", "amount", "paymentType", "currency", "nonce", "shopperResultUrl"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly Referer: {
                    readonly type: "string";
                    readonly examples: readonly ["https://example.com"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An allowlisted domain for the merchant.";
                };
            };
            readonly required: readonly ["Referer"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly required: readonly ["message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly required: readonly ["message"];
                readonly properties: {
                    readonly message: {
                        readonly type: "string";
                    };
                };
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly validation_errors: {
                        readonly type: "object";
                        readonly additionalProperties: true;
                    };
                };
                readonly required: readonly ["validation_errors"];
            }];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostMerchantSpecs: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly "authentication.entityId": {
                readonly type: "string";
                readonly maxLength: 32;
                readonly minLength: 32;
                readonly examples: readonly ["8ac7a4ca68c22c4d0168c2caab2e0025"];
            };
            readonly signature: {
                readonly description: "Token to verify the integrity of the request, ensuring that only the merchant sending the request is accepted.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly examples: readonly ["a668342244a9c77b08a2f9090d033d6e2610b431a5c0ca975f32035ed06164f4"];
            };
            readonly currency: {
                readonly description: "Three-letter ISO 4217 currency code.";
                readonly type: "string";
                readonly maxLength: 3;
                readonly examples: readonly ["ZAR"];
            };
        };
        readonly required: readonly ["authentication.entityId", "signature", "currency"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const PostV2Checkout: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly "authentication.entityId": {
                readonly description: "The entity for the request. By default, this is the channel ID.";
                readonly type: "string";
                readonly maxLength: 32;
                readonly examples: readonly ["8ac7a4ca68c22c4d0168c2caab2e0025"];
            };
            readonly merchantTransactionId: {
                readonly description: "Merchant-provided reference number unique for your transactions.";
                readonly type: "string";
                readonly maxLength: 16;
                readonly minLength: 8;
                readonly format: "8-16";
                readonly examples: readonly ["OrderNo453432"];
            };
            readonly amount: {
                readonly description: "The amount of the payment request. The period is used as the decimal separator.\n\nAn amount of 0 is only supported when the `paymentType` is `PA` and `createRegistration` is set to `true`.\n\nM-PESA does not support decimal amounts, so Checkout automatically rounds them up.\n";
                readonly type: "number";
                readonly minimum: 0;
                readonly maximum: 99999999.99;
                readonly format: "^[0-9]{1,8}(\\\\.[0-9]{2})?$";
                readonly examples: readonly [1010.22];
            };
            readonly currency: {
                readonly description: "The currency code of the payment request amount.";
                readonly type: "string";
                readonly enum: readonly ["ZAR", "USD", "KES", "MUR", "GBP", "EUR"];
                readonly examples: readonly ["ZAR"];
            };
            readonly paymentType: {
                readonly description: "The payment type for the request.\n\nDoes not accept `RG`, but you can tokenise a card by performing a DB or PA with `createRegistration`.\n\nPA is only supported when `forceDefaultMethod` is set to `true` and `defaultPaymentMethod` is `CARD`.\nFollowing a PA, you can either [capture](https://developer.peachpayments.com/docs/card-manage-payments#capture-a-preauthorisation) or [reverse](https://developer.peachpayments.com/docs/card-manage-payments#reverse-a-preauthorisation) the PA.\n\nRefund transactions through the Dashboard or as described in the [documentation](https://developer.peachpayments.com/docs/checkout-refund).\n";
                readonly type: "string";
                readonly enum: readonly ["DB", "PA"];
                readonly examples: readonly ["DB"];
            };
            readonly nonce: {
                readonly description: "Unique value to represent each request.";
                readonly type: "string";
                readonly maxLength: 64;
                readonly minLength: 1;
                readonly format: "string (1-64)";
                readonly examples: readonly ["UNQ00012345678"];
            };
            readonly shopperResultUrl: {
                readonly description: "Checkout uses a POST request to redirect the customer to this URL after the customer completes checkout. Must be a valid URL that can be accessed through a browser.";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://example.com/OrderNo453432"];
            };
            readonly defaultPaymentMethod: {
                readonly description: "The preferred payment method which is active in the checkout page at the point of redirecting.";
                readonly type: "string";
                readonly enum: readonly ["CARD", "MASTERPASS", "MOBICRED", "MPESA", "1FORYOU", "APLUS", "PAYPAL", "ZEROPAY", "PAYFLEX", "BLINKBYEMTEL", "CAPITECPAY", "PAYBYBANK", "MCBJUICE", "RCS", "FLOAT", "HAPPYPAY", "APPLE PAY", "GOOGLEPAY", "SAMSUNGPAY"];
                readonly examples: readonly ["CARD"];
            };
            readonly forceDefaultMethod: {
                readonly description: "Force the default payment method to be the only payment method.";
                readonly type: "boolean";
                readonly default: "false";
                readonly examples: readonly [true];
            };
            readonly merchantInvoiceId: {
                readonly description: "Merchant-provided invoice number unique for your transactions. This identifier is not sent onwards.";
                readonly type: "string";
                readonly minLength: 8;
                readonly maxLength: 255;
                readonly format: "string (8-255)";
                readonly examples: readonly ["INV-00001"];
            };
            readonly cancelUrl: {
                readonly description: "The customer is redirected to this URL if they cancel checkout. It must be a valid URL that can be reached through a browser. To enable the `cancelUrl` parameter, [contact support](https://support.peachpayments.com/support/tickets/new).";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://example.com/OrderNo453432/cancelled"];
            };
            readonly notificationUrl: {
                readonly description: "Peach Payments sends a webhook to this URL for any changes to this checkout instance, in addition to the webhook sent to the preconfigured URL.";
                readonly type: "string";
                readonly format: "string (6-2048)";
                readonly examples: readonly ["https://example.com/OrderNo453432/webhook"];
            };
            readonly customParameters: {
                readonly description: "A name value pair used for sending custom information. To display custom parameters in the Peach Payments Dashboard > transaction details panel > **More details** tab, use the `\"customParameters\":{\"auxData\":\"{\\\"user_id\\\":\\\"12345\\\",\\\"paymentId\\\":\\\"98765\\\"}\"}` format, changing the parameters as required.";
                readonly type: "object";
                readonly additionalProperties: {
                    readonly type: "string";
                    readonly minLength: 0;
                    readonly maxLength: 2048;
                };
            };
            readonly customer: {
                readonly type: "object";
                readonly properties: {
                    readonly merchantCustomerId: {
                        readonly description: "An identifier for this customer. Typically this is the ID that identifies the shopper in the shop's system.";
                        readonly type: "string";
                        readonly maxLength: 48;
                        readonly minLength: 0;
                        readonly format: "[\\s\\S]{0,48}";
                        readonly examples: readonly ["971020"];
                    };
                    readonly givenName: {
                        readonly description: "The customer's first name or given name. Required if you send in any other customer parameters, also required for some risk checks and payment providers. Truncated after 48 characters.\n\nPeach Payments recommends including the name so that it displays in the Peach Dashboard and is available for subsequent queries.\n";
                        readonly type: "string";
                        readonly maxLength: 48;
                        readonly minLength: 0;
                        readonly format: "[\\s\\S]{0,48}";
                        readonly examples: readonly ["John"];
                    };
                    readonly surname: {
                        readonly description: "The customer's last name or surname. Required if you send in any other customer parameters, also required for some risk checks and payment providers. Truncated after 48 characters.\n\nPeach Payments recommends including the surname so that it displays in the Peach Dashboard and is available for subsequent queries.\n";
                        readonly type: "string";
                        readonly maxLength: 48;
                        readonly minLength: 0;
                        readonly format: "[\\s\\S]{0,48}";
                        readonly examples: readonly ["Smith"];
                    };
                    readonly mobile: {
                        readonly description: "The customer's mobile number.";
                        readonly type: "string";
                        readonly maxLength: 24;
                        readonly minLength: 5;
                        readonly format: "[+0-9][0-9 \\.()/-]{5,24}";
                        readonly examples: readonly ["+27123456789"];
                    };
                    readonly email: {
                        readonly description: "The customer's email address.";
                        readonly type: "string";
                        readonly maxLength: 128;
                        readonly minLength: 6;
                        readonly format: "[\\s\\S]{6,128}";
                        readonly examples: readonly ["johnsmith@example.com"];
                    };
                    readonly idNumber: {
                        readonly description: "The customer's ID number, required for high-risk merchants supporting Capitec Pay.";
                        readonly type: "string";
                        readonly maxLength: 13;
                        readonly minLength: 13;
                        readonly format: "[\\s\\S]{13,13}";
                        readonly examples: readonly ["9001010000084"];
                    };
                };
            };
            readonly billing: {
                readonly type: "object";
                readonly properties: {
                    readonly street1: {
                        readonly description: "The door number, floor, building number, building name, and/or street name of the billing address.";
                        readonly type: "string";
                        readonly maxLength: 100;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,100}";
                        readonly examples: readonly ["1 Example Road"];
                    };
                    readonly street2: {
                        readonly description: "The adjoining road or locality, if required, of the billing address.";
                        readonly type: "string";
                        readonly maxLength: 100;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,100}";
                        readonly examples: readonly ["LocalityA"];
                    };
                    readonly city: {
                        readonly description: "The town, district, or city of the billing address.";
                        readonly type: "string";
                        readonly maxLength: 80;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,80}";
                        readonly examples: readonly ["Cape Town"];
                    };
                    readonly company: {
                        readonly description: "The company of the billing address.";
                        readonly type: "string";
                        readonly maxLength: 64;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,64}";
                        readonly examples: readonly ["CompanyA"];
                    };
                    readonly country: {
                        readonly description: "The country of the billing address (ISO 3166-1).";
                        readonly type: "string";
                        readonly maxLength: 2;
                        readonly minLength: 2;
                        readonly format: "ISO 3166-1";
                        readonly examples: readonly ["ZA"];
                    };
                    readonly state: {
                        readonly description: "The county, state, or region of the billing address.";
                        readonly type: "string";
                        readonly maxLength: 50;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,50}";
                        readonly examples: readonly ["Western Cape"];
                    };
                    readonly postcode: {
                        readonly description: "The postal code or ZIP code of the billing address.";
                        readonly type: "string";
                        readonly maxLength: 30;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,30}";
                        readonly examples: readonly ["1234"];
                    };
                };
            };
            readonly shipping: {
                readonly type: "object";
                readonly properties: {
                    readonly street1: {
                        readonly description: "The door number, floor, building number, building name, and/or street name of the shipping address.";
                        readonly type: "string";
                        readonly maxLength: 100;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,100}";
                        readonly examples: readonly ["1 Example Road"];
                    };
                    readonly street2: {
                        readonly description: "The adjoining road or locality, if required, of the shipping address.";
                        readonly type: "string";
                        readonly maxLength: 100;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,100}";
                        readonly examples: readonly ["LocalityA"];
                    };
                    readonly city: {
                        readonly description: "The town, district, or city of the shipping address.";
                        readonly type: "string";
                        readonly maxLength: 80;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,80}";
                        readonly examples: readonly ["Cape Town"];
                    };
                    readonly company: {
                        readonly description: "The company of the shipping address.";
                        readonly type: "string";
                        readonly maxLength: 64;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,64}";
                        readonly examples: readonly ["CompanyA"];
                    };
                    readonly postcode: {
                        readonly description: "The postal code or ZIP code of the shipping address.";
                        readonly type: "string";
                        readonly maxLength: 30;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,30}";
                        readonly examples: readonly ["1234"];
                    };
                    readonly country: {
                        readonly description: "The country of the shipping address (ISO 3166-1).";
                        readonly type: "string";
                        readonly maxLength: 2;
                        readonly minLength: 2;
                        readonly format: "ISO 3166-1";
                        readonly examples: readonly ["ZA"];
                    };
                    readonly state: {
                        readonly description: "The county, state, or region of the shipping address.";
                        readonly type: "string";
                        readonly maxLength: 50;
                        readonly minLength: 1;
                        readonly format: "[\\s\\S]{1,50}";
                        readonly examples: readonly ["Western Cape"];
                    };
                };
            };
            readonly createRegistration: {
                readonly description: "Used to enable [card tokenisation](https://developer.peachpayments.com/docs/checkout-tokenisation) when customer pays with card. You must get permission from your customer before tokenising their cards.\n\nCannot be `true` if `allowStoringDetails` is true.\n";
                readonly type: "boolean";
                readonly examples: readonly [true];
            };
            readonly originator: {
                readonly description: "Used to provide a name for the application that is creating the checkout instance.";
                readonly type: "string";
                readonly maxLength: 100;
                readonly examples: readonly ["Webstore"];
            };
            readonly returnTo: {
                readonly description: "Text to display on \"Return to Store\" button on completing checkout.";
                readonly type: "string";
                readonly enum: readonly ["STORE", "INVOICE"];
                readonly examples: readonly ["STORE"];
            };
            readonly cardTokens: {
                readonly description: "List of card tokens. The card tokens must be linked to the customer as they enable one-click payment support for the customer. See the [documentation](https://developer.peachpayments.com/docs/checkout-tokenisation) for more information.";
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly examples: readonly ["8ac7a49f8e9f15d2018ea09b285f0eaa"];
                };
            };
            readonly allowStoringDetails: {
                readonly description: "Allow the customer to store their card details for future use. When this is set, the customer is given an option to tokenise their card during checkout.\n\nIf the customer chooses to store their card details, a `registrationId` is returned in the response from checkout. Similar to `createRegistration`.\n\nCannot be `true` if `createRegistration` is true.\n\nSee the [documentation](https://developer.peachpayments.com/docs/checkout-tokenisation) for more information.\n";
                readonly type: "boolean";
                readonly examples: readonly [false];
            };
        };
        readonly required: readonly ["authentication.entityId", "merchantTransactionId", "amount", "currency", "nonce", "shopperResultUrl"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly Referer: {
                    readonly type: "string";
                    readonly examples: readonly ["https://example.com"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "An allowlisted domain for the merchant.";
                };
            };
            readonly required: readonly ["Referer"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly checkoutId: {
                    readonly type: "string";
                    readonly description: "Checkout ID for use by subsequent calls.";
                    readonly examples: readonly ["948cc8dec52a11eb85290242ac130003"];
                };
            };
            readonly required: readonly ["checkoutId"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly required: readonly ["message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly required: readonly ["message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly required: readonly ["message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly required: readonly ["message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { GetStatus, PostCheckout, PostCheckoutInitiate, PostCheckoutValidate, PostMerchantSpecs, PostV2Checkout };
