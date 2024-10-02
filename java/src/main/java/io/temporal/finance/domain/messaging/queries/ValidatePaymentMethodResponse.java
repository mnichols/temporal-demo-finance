package io.temporal.finance.domain.messaging.queries;

public record ValidatePaymentMethodResponse(boolean isOk, String message) {}
