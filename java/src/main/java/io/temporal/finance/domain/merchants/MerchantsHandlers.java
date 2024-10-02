package io.temporal.finance.domain.merchants;

import io.temporal.activity.ActivityInterface;
import io.temporal.activity.ActivityMethod;
import io.temporal.finance.domain.messaging.commands.RecordTransactionRequest;

@ActivityInterface
public interface MerchantsHandlers {
  @ActivityMethod
  void recordTransaction(RecordTransactionRequest cmd);
}
