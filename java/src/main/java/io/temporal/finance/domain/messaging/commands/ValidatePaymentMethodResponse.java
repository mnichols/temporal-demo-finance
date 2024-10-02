package io.temporal.finance.domain.messaging.commands;

public record ValidatePaymentMethodResponse(boolean isOk, String message) {}
