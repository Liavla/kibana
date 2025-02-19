/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { Client } from '@elastic/elasticsearch';
import { Message } from '../../common';
import { KibanaClient } from './kibana_client';

export interface ScenarioOptions {
  esClient: Client;
  kibanaClient: KibanaClient;
  chatClient: ReturnType<KibanaClient['createChatClient']>;
}

export interface EvaluationResult {
  conversationId?: string;
  messages: Array<Message['message']>;
  scores: Array<{
    criterion: string;
    reasoning: string;
    score: number;
  }>;
}

export type EvaluationFunction = (options: ScenarioOptions) => Promise<EvaluationResult>;
