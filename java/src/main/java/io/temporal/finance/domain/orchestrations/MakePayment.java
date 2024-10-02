package io.temporal.finance.domain.orchestrations;

import io.temporal.finance.domain.messaging.orchestrations.MakePaymentRequest;
import io.temporal.finance.domain.messaging.queries.PaymentState;
import io.temporal.workflow.QueryMethod;
import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

@WorkflowInterface
public interface MakePayment {
  @WorkflowMethod
  void execute(MakePaymentRequest params);

  @QueryMethod
  PaymentState getState();
}
