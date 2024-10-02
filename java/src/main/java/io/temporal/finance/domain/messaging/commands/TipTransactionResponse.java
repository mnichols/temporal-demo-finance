package io.temporal.finance.domain.messaging.commands;

public record TipTransactionResponse(String transactionId, int tipAmountCents) {}
