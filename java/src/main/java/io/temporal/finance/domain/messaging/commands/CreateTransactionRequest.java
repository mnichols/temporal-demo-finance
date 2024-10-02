package io.temporal.finance.domain.messaging.commands;

public record CreateTransactionRequest(String merchantId, String remoteId, int amount) {}
