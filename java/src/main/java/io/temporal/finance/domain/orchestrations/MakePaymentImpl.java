package io.temporal.finance.domain.orchestrations;

import io.temporal.activity.ActivityOptions;
import io.temporal.common.RetryOptions;
import io.temporal.failure.ApplicationFailure;
import io.temporal.finance.domain.messaging.commands.ValidatePaymentMethodRequest;
import io.temporal.finance.domain.messaging.orchestrations.Errors;
import io.temporal.finance.domain.messaging.orchestrations.MakePaymentRequest;
import io.temporal.finance.domain.messaging.queries.PaymentState;
import io.temporal.finance.domain.messaging.queries.ValidatePaymentMethodResponse;
import io.temporal.finance.domain.messaging.values.PaymentDescriptor;
import io.temporal.finance.domain.payments.PaymentsHandlers;
import io.temporal.workflow.Async;
import io.temporal.workflow.Promise;
import io.temporal.workflow.Workflow;
import java.time.Duration;
import java.util.ArrayList;

public class MakePaymentImpl implements MakePayment {
  private final PaymentsHandlers payments;
  private PaymentState state;

  public MakePaymentImpl() {
    this.payments =
        Workflow.newActivityStub(
            PaymentsHandlers.class,
            ActivityOptions.newBuilder()
                .setStartToCloseTimeout(Duration.ofSeconds(10))
                .setRetryOptions(
                    RetryOptions.newBuilder()
                        .setBackoffCoefficient(2)
                        .setInitialInterval(Duration.ofSeconds(3))
                        .setMaximumInterval(Duration.ofSeconds(10))
                        .build())
                .build());
  }

  @Override
  public void execute(MakePaymentRequest params) {
    this.state = new PaymentState(params);
    var validations = new ArrayList<Promise<ValidatePaymentMethodResponse>>();
    var errors = new ArrayList<RuntimeException>();
    for (PaymentDescriptor desc : state.getDescriptors()) {
      var cmd = new ValidatePaymentMethodRequest(params.merchantId(), params.remoteId(), desc);
      validations.add(
          Async.function(payments::validatePaymentType, cmd)
              .handle(
                  (value, error) -> {
                    if (error != null) {
                      errors.add(error);
                    }
                    if (!value.isOk()) {
                      state.setValid(false);
                    }
                    return value;
                  }));
    }
    Promise.allOf(validations).get();
    if (!errors.isEmpty() || !state.isValid()) {
      throw ApplicationFailure.newFailure("Validation failed.", Errors.INVALID_PAYMENT.name());
    }
  }

  @Override
  public PaymentState getState() {
    return this.state;
  }
}
