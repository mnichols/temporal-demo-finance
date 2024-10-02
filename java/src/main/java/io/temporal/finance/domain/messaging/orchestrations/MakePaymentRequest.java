package io.temporal.finance.domain.messaging.orchestrations;

import io.temporal.finance.domain.messaging.values.PaymentDescriptor;

public record MakePaymentRequest(
    String remoteId, String merchantId, PaymentDescriptor[] descriptors, int tipAmountCents) {}
