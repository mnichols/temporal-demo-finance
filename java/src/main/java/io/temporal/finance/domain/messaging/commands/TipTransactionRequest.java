package io.temporal.finance.domain.messaging.commands;

public record TipTransactionRequest(String transactionId, int tipAmountCents) {}
