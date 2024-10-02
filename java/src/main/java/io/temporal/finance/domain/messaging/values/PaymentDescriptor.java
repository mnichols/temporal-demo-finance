package io.temporal.finance.domain.messaging.values;

public record PaymentDescriptor(PaymentTypes paymentType, int amountCents) {}
