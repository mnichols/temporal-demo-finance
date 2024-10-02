DEFAULT_WORKFLOW_TYPE = 'AccountTransferWorkflow'
SCENARIOS = [
    {'id': 'happy', 'label': 'Normal "Happy Path" Execution'},
    {'id': "fail-payment-type", 'label': "Fail Validation"},
    {'id': "fail-payment-gateway", 'label': "Payment Gateway Outage (API)"},
    {'id': "fail-record-transaction", 'label': "DB Failure post-mutation (Saga)",},
    {'id': "tippable", 'label': "Leave A Tip (Human In The Loop)",},
]

PAYMENT_TYPES = [
    {'id': 'GIFT_CARD', 'label': 'Gift Card'},
    # {'id': 'ACH', 'label': 'ACH'},
    {'id': 'CARD_PRESENT', 'label': 'Card Present'}
]

ELIGIBLE_MERCHANTS = [
    {'id': 'mer_123', 'label': 'Disney University'},
    {'id': 'mer_123', 'label': 'Tomorrow Land'},
    {'id': 'mer_234', 'label': 'Epcot'},
    {'id': 'mer_345', 'label': 'Tigger'},
]

