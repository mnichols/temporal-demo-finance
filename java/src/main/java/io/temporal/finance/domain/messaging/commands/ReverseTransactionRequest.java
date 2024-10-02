package io.temporal.finance.domain.messaging.commands;

public record ReverseTransactionRequest(String transactionId, String reason) {}
