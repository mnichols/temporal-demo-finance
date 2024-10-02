package io.temporal.finance.domain.payments;

import io.temporal.activity.ActivityInterface;
import io.temporal.activity.ActivityMethod;
import io.temporal.finance.domain.messaging.commands.*;

@ActivityInterface
public interface PaymentsHandlers {
  @ActivityMethod
  ValidatePaymentMethodResponse validatePaymentType(ValidatePaymentMethodRequest cmd);

  @ActivityMethod
  CreateTransactionResponse createTransaction(CreateTransactionRequest cmd);

  @ActivityMethod
  ReverseTransactionResponse reverseTransaction(ReverseTransactionRequest cmd);

  @ActivityMethod
  TipTransactionResponse tipTransaction(TipTransactionRequest cmd);
}
