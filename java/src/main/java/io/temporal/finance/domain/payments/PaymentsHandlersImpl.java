package io.temporal.finance.domain.payments;

import io.temporal.activity.Activity;
import io.temporal.failure.ApplicationFailure;
import io.temporal.finance.domain.messaging.commands.*;
import io.temporal.finance.domain.messaging.orchestrations.Errors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component("payments-handlers")
public class PaymentsHandlersImpl implements PaymentsHandlers {
  private static Logger logger = LoggerFactory.getLogger(PaymentsHandlersImpl.class);
  private static final String paymentGatewayFail = "fail-payment-gateway";
  private static final String paymentTypeFail = "fail-payment-type";

  @Override
  public ValidatePaymentMethodResponse validatePaymentType(ValidatePaymentMethodRequest cmd) {
    var ok = !cmd.remoteId().toLowerCase().contains(paymentTypeFail);
    var message = "success";
    if (!ok) {
      message = "Synthetic failure due to validation of payment method.";
    }

    return new ValidatePaymentMethodResponse(ok, message);
  }

  @Override
  public CreateTransactionResponse createTransaction(CreateTransactionRequest cmd) {
    var ctx = Activity.getExecutionContext();
    if (!cmd.remoteId().toLowerCase().contains(paymentGatewayFail)) {
      return new CreateTransactionResponse(
          String.format("trx_%s_%s", cmd.merchantId(), cmd.remoteId()));
    }
    // this is where you would consume the internal payment gateway client to create a transaction
    if (ctx.getInfo().getAttempt() < 3) {
      throw new RuntimeException("Payment gateway is down.");
    }
    throw ApplicationFailure.newFailure(
        "Payment gateway returned 503. Waaaay too long!.",
        Errors.PAYMENT_GATEWAY_UNREACHABLE.name());
  }

  @Override
  public ReverseTransactionResponse reverseTransaction(ReverseTransactionRequest cmd) {
    logger.info("Reversed transaction {}", cmd.transactionId());
    return new ReverseTransactionResponse();
  }
}
