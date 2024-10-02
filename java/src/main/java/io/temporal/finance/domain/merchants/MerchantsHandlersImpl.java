package io.temporal.finance.domain.merchants;

import io.temporal.finance.domain.messaging.commands.RecordTransactionRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component("merchants-handlers")
public class MerchantsHandlersImpl implements MerchantsHandlers {
  private static Logger logger = LoggerFactory.getLogger(MerchantsHandlersImpl.class);
  private static final String recordTransactionFail = "fail-record-transaction";

  @Override
  public void recordTransaction(RecordTransactionRequest cmd) {
    if (cmd.remoteId().toLowerCase().contains(recordTransactionFail)) {
      throw new RuntimeException("Merchants database is out of connections.");
    }
    logger.info("Merchants transaction recorded: {}", cmd);
  }
}
