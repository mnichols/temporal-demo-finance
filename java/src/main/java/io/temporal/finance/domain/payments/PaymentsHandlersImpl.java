package io.temporal.finance.domain.payments;

import io.temporal.finance.domain.messaging.commands.ValidatePaymentMethodRequest;
import io.temporal.finance.domain.messaging.queries.ValidatePaymentMethodResponse;
import org.springframework.stereotype.Component;

@Component("payments-handlers")
public class PaymentsHandlersImpl implements PaymentsHandlers {
  @Override
  public ValidatePaymentMethodResponse validatePaymentType(ValidatePaymentMethodRequest cmd) {
    var ok = !cmd.remoteId().toLowerCase().contains("fail-payment-type");
    var message = "success";
    if (!ok) {
      message = "Synthetic failure due to validation of payment method.";
    }

    return new ValidatePaymentMethodResponse(ok, message);
  }
}
