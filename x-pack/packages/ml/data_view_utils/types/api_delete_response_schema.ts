/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import Boom from '@hapi/boom';

import { EsErrorBody } from '@kbn/ml-error-utils';

/**
 * Interface for data view API response for deletion status
 */
export interface DeleteDataViewApiResponseSchema {
  /**
   * Success
   */
  success: boolean;
  /**
   * Optional error
   */
  error?: EsErrorBody | Boom.Boom;
}
