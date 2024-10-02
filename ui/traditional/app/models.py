DEFAULT_WORKFLOW_TYPE = 'AccountTransferWorkflow'
SCENARIOS = [
    {'id': DEFAULT_WORKFLOW_TYPE, 'label': 'Normal "Happy Path" Execution'},
    {'id': "AccountTransferWorkflowHumanInLoop", 'label': "Require Human-In-Loop Approval"},
    {'id': "AccountTransferWorkflowAPIDowntime", 'label': "API Downtime (recover on 5th attempt)"},
    {'id': "AccountTransferWorkflowRecoverableFailure", 'label': "Bug in Workflow (recoverable failure)",},
    {'id': "AccountTransferWorkflowInvalidAccount", 'label': "Invalid Account (unrecoverable failure)",},
]

PAYMENT_TYPES = [
    {'id': 'GIFT_CARD', 'label': 'Gift Card'},
    {'id': 'ACH', 'label': 'ACH'},
    {'id': 'CARD_PRESENT', 'label': 'Card Present'}
]

ELIGIBLE_MERCHANTS = [
    {'id': 'mer_123', 'label': 'Disney University'},
    {'id': 'mer_123', 'label': 'Tomorrow Land'},
    {'id': 'mer_234', 'label': 'Epcot'},
    {'id': 'mer_345', 'label': 'Tigger'},
]

