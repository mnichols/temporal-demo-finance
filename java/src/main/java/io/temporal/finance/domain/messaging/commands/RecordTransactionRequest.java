package io.temporal.finance.domain.messaging.commands;

public record RecordTransactionRequest(
    String merchantId, String remoteId, String transactionId, int totalAmountCents) {}
