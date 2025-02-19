/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { z } from 'zod';
import { BooleanFromString } from '@kbn/zod-helpers';

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 */

import { RuleResponse } from '../../model/rule_schema/rule_schemas.gen';
import {
  RuleActionGroup,
  RuleActionId,
  RuleActionParams,
  RuleActionFrequency,
  RuleActionAlertsFilter,
  IndexPatternArray,
  RuleTagArray,
  TimelineTemplateId,
  TimelineTemplateTitle,
} from '../../model/rule_schema/common_attributes.gen';

export type BulkEditSkipReason = z.infer<typeof BulkEditSkipReason>;
export const BulkEditSkipReason = z.literal('RULE_NOT_MODIFIED');

export type BulkActionSkipResult = z.infer<typeof BulkActionSkipResult>;
export const BulkActionSkipResult = z.object({
  id: z.string(),
  name: z.string().optional(),
  skip_reason: BulkEditSkipReason,
});

export type RuleDetailsInError = z.infer<typeof RuleDetailsInError>;
export const RuleDetailsInError = z.object({
  id: z.string(),
  name: z.string().optional(),
});

export type BulkActionsDryRunErrCode = z.infer<typeof BulkActionsDryRunErrCode>;
export const BulkActionsDryRunErrCode = z.enum([
  'IMMUTABLE',
  'MACHINE_LEARNING_AUTH',
  'MACHINE_LEARNING_INDEX_PATTERN',
  'ESQL_INDEX_PATTERN',
]);
export type BulkActionsDryRunErrCodeEnum = typeof BulkActionsDryRunErrCode.enum;
export const BulkActionsDryRunErrCodeEnum = BulkActionsDryRunErrCode.enum;

export type NormalizedRuleError = z.infer<typeof NormalizedRuleError>;
export const NormalizedRuleError = z.object({
  message: z.string(),
  status_code: z.number().int(),
  err_code: BulkActionsDryRunErrCode.optional(),
  rules: z.array(RuleDetailsInError),
});

export type BulkEditActionResults = z.infer<typeof BulkEditActionResults>;
export const BulkEditActionResults = z.object({
  updated: z.array(RuleResponse),
  created: z.array(RuleResponse),
  deleted: z.array(RuleResponse),
  skipped: z.array(BulkActionSkipResult),
});

export type BulkEditActionSummary = z.infer<typeof BulkEditActionSummary>;
export const BulkEditActionSummary = z.object({
  failed: z.number().int(),
  skipped: z.number().int(),
  succeeded: z.number().int(),
  total: z.number().int(),
});

export type BulkEditActionResponse = z.infer<typeof BulkEditActionResponse>;
export const BulkEditActionResponse = z.object({
  success: z.boolean().optional(),
  status_code: z.number().int().optional(),
  message: z.string().optional(),
  rules_count: z.number().int().optional(),
  attributes: z.object({
    results: BulkEditActionResults,
    summary: BulkEditActionSummary,
    errors: z.array(NormalizedRuleError).optional(),
  }),
});

export type BulkExportActionResponse = z.infer<typeof BulkExportActionResponse>;
export const BulkExportActionResponse = z.string();

export type BulkActionBase = z.infer<typeof BulkActionBase>;
export const BulkActionBase = z.object({
  /**
   * Query to filter rules
   */
  query: z.string().optional(),
  /**
   * Array of rule IDs
   */
  ids: z.array(z.string()).min(1).optional(),
});

export type BulkDeleteRules = z.infer<typeof BulkDeleteRules>;
export const BulkDeleteRules = BulkActionBase.merge(
  z.object({
    action: z.literal('delete'),
  })
);

export type BulkDisableRules = z.infer<typeof BulkDisableRules>;
export const BulkDisableRules = BulkActionBase.merge(
  z.object({
    action: z.literal('disable'),
  })
);

export type BulkEnableRules = z.infer<typeof BulkEnableRules>;
export const BulkEnableRules = BulkActionBase.merge(
  z.object({
    action: z.literal('enable'),
  })
);

export type BulkExportRules = z.infer<typeof BulkExportRules>;
export const BulkExportRules = BulkActionBase.merge(
  z.object({
    action: z.literal('export'),
  })
);

export type BulkDuplicateRules = z.infer<typeof BulkDuplicateRules>;
export const BulkDuplicateRules = BulkActionBase.merge(
  z.object({
    action: z.literal('duplicate'),
    duplicate: z
      .object({
        /**
         * Whether to copy exceptions from the original rule
         */
        include_exceptions: z.boolean(),
        /**
         * Whether to copy expired exceptions from the original rule
         */
        include_expired_exceptions: z.boolean(),
      })
      .optional(),
  })
);

/**
 * The condition for throttling the notification: 'rule', 'no_actions', or time duration
 */
export type ThrottleForBulkActions = z.infer<typeof ThrottleForBulkActions>;
export const ThrottleForBulkActions = z.enum(['rule', '1h', '1d', '7d']);
export type ThrottleForBulkActionsEnum = typeof ThrottleForBulkActions.enum;
export const ThrottleForBulkActionsEnum = ThrottleForBulkActions.enum;

export type BulkActionType = z.infer<typeof BulkActionType>;
export const BulkActionType = z.enum([
  'enable',
  'disable',
  'export',
  'delete',
  'duplicate',
  'edit',
]);
export type BulkActionTypeEnum = typeof BulkActionType.enum;
export const BulkActionTypeEnum = BulkActionType.enum;

export type BulkActionEditType = z.infer<typeof BulkActionEditType>;
export const BulkActionEditType = z.enum([
  'add_tags',
  'delete_tags',
  'set_tags',
  'add_index_patterns',
  'delete_index_patterns',
  'set_index_patterns',
  'set_timeline',
  'add_rule_actions',
  'set_rule_actions',
  'set_schedule',
]);
export type BulkActionEditTypeEnum = typeof BulkActionEditType.enum;
export const BulkActionEditTypeEnum = BulkActionEditType.enum;

export type NormalizedRuleAction = z.infer<typeof NormalizedRuleAction>;
export const NormalizedRuleAction = z
  .object({
    group: RuleActionGroup,
    id: RuleActionId,
    params: RuleActionParams,
    frequency: RuleActionFrequency.optional(),
    alerts_filter: RuleActionAlertsFilter.optional(),
  })
  .strict();

export type BulkActionEditPayloadRuleActions = z.infer<typeof BulkActionEditPayloadRuleActions>;
export const BulkActionEditPayloadRuleActions = z.object({
  type: z.enum(['add_rule_actions', 'set_rule_actions']),
  value: z.object({
    throttle: ThrottleForBulkActions.optional(),
    actions: z.array(NormalizedRuleAction),
  }),
});

export type BulkActionEditPayloadSchedule = z.infer<typeof BulkActionEditPayloadSchedule>;
export const BulkActionEditPayloadSchedule = z.object({
  type: z.literal('set_schedule'),
  value: z.object({
    /**
     * Interval in which the rule is executed
     */
    interval: z.string().regex(/^[1-9]\d*[smh]$/),
    /**
     * Lookback time for the rule
     */
    lookback: z.string().regex(/^[1-9]\d*[smh]$/),
  }),
});

export type BulkActionEditPayloadIndexPatterns = z.infer<typeof BulkActionEditPayloadIndexPatterns>;
export const BulkActionEditPayloadIndexPatterns = z.object({
  type: z.enum(['add_index_patterns', 'delete_index_patterns', 'set_index_patterns']),
  value: IndexPatternArray,
  overwrite_data_views: z.boolean().optional(),
});

export type BulkActionEditPayloadTags = z.infer<typeof BulkActionEditPayloadTags>;
export const BulkActionEditPayloadTags = z.object({
  type: z.enum(['add_tags', 'delete_tags', 'set_tags']),
  value: RuleTagArray,
});

export type BulkActionEditPayloadTimeline = z.infer<typeof BulkActionEditPayloadTimeline>;
export const BulkActionEditPayloadTimeline = z.object({
  type: z.literal('set_timeline'),
  value: z.object({
    timeline_id: TimelineTemplateId,
    timeline_title: TimelineTemplateTitle,
  }),
});

export type BulkActionEditPayload = z.infer<typeof BulkActionEditPayload>;
export const BulkActionEditPayload = z.union([
  BulkActionEditPayloadTags,
  BulkActionEditPayloadIndexPatterns,
  BulkActionEditPayloadTimeline,
  BulkActionEditPayloadRuleActions,
  BulkActionEditPayloadSchedule,
]);

export type BulkEditRules = z.infer<typeof BulkEditRules>;
export const BulkEditRules = BulkActionBase.merge(
  z.object({
    action: z.literal('edit'),
    /**
     * Array of objects containing the edit operations
     */
    edit: z.array(BulkActionEditPayload).min(1),
  })
);

export type PerformBulkActionRequestQuery = z.infer<typeof PerformBulkActionRequestQuery>;
export const PerformBulkActionRequestQuery = z.object({
  /**
   * Enables dry run mode for the request call.
   */
  dry_run: BooleanFromString.optional(),
});
export type PerformBulkActionRequestQueryInput = z.input<typeof PerformBulkActionRequestQuery>;

export type PerformBulkActionRequestBody = z.infer<typeof PerformBulkActionRequestBody>;
export const PerformBulkActionRequestBody = z.union([
  BulkDeleteRules,
  BulkDisableRules,
  BulkEnableRules,
  BulkExportRules,
  BulkDuplicateRules,
  BulkEditRules,
]);
export type PerformBulkActionRequestBodyInput = z.input<typeof PerformBulkActionRequestBody>;

export type PerformBulkActionResponse = z.infer<typeof PerformBulkActionResponse>;
export const PerformBulkActionResponse = z.union([
  BulkEditActionResponse,
  BulkExportActionResponse,
]);
