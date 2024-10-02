package io.temporal.finance.domain.payments;

import io.temporal.activity.ActivityInterface;
import io.temporal.activity.ActivityMethod;
import io.temporal.finance.domain.messaging.commands.ValidatePaymentMethodRequest;
import io.temporal.finance.domain.messaging.queries.ValidatePaymentMethodResponse;

@ActivityInterface
public interface PaymentsHandlers {
  @ActivityMethod
  ValidatePaymentMethodResponse validatePaymentType(ValidatePaymentMethodRequest cmd);
}
