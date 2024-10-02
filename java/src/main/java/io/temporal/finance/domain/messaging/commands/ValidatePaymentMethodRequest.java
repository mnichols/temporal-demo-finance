package io.temporal.finance.domain.messaging.commands;

import io.temporal.finance.domain.messaging.values.PaymentDescriptor;

public record ValidatePaymentMethodRequest(
    String merchantId, String remoteId, PaymentDescriptor descriptor) {}
