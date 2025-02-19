/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { css, keyframes } from '@emotion/css';
import { EuiBetaBadge, EuiButton, EuiSpacer, EuiText } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import { euiThemeVars } from '@kbn/ui-theme';
import type { UseGenAIConnectorsResult } from '../../hooks/use_genai_connectors';

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInClassName = css`
  animation: ${fadeInAnimation} ${euiThemeVars.euiAnimSpeedNormal} ease-in-out;
`;

export function WelcomeMessageConnectors({
  connectors,
  onSetupConnectorClick,
}: {
  connectors: UseGenAIConnectorsResult;
  onSetupConnectorClick?: () => void;
}) {
  return !connectors.loading && connectors.connectors?.length === 0 && onSetupConnectorClick ? (
    <div className={fadeInClassName}>
      <EuiText color="subdued" size="s">
        {i18n.translate(
          'xpack.observabilityAiAssistant.initialSetupPanel.setupConnector.description2',
          {
            defaultMessage:
              'Start working with the Elastic AI Assistant by setting up a connector for your AI provider. The OpenAI model needs to support function calls. We strongly recommend using GPT4.',
          }
        )}
        <EuiBetaBadge
          label=""
          css={{ boxShadow: 'none', inlineSize: 'unset', lineHeight: 'initial' }}
          tooltipContent={i18n.translate(
            'xpack.observabilityAiAssistant.technicalPreviewBadgeDescription',
            {
              defaultMessage:
                "GPT4 is required for a more consistent experience when using function calls (for example when performing root cause analysis, visualizing data and more). GPT3.5 can work for some of the simpler workflows, such as explaining errors or for a ChatGPT like experience within Kibana which don't require the use of frequent function calls.",
            }
          )}
          iconType="iInCircle"
          size="s"
        />
      </EuiText>

      <EuiSpacer size="m" />

      <div>
        <EuiButton
          data-test-subj="observabilityAiAssistantInitialSetupPanelSetUpGenerativeAiConnectorButton"
          fill
          color="primary"
          onClick={onSetupConnectorClick}
        >
          {i18n.translate(
            'xpack.observabilityAiAssistant.initialSetupPanel.setupConnector.buttonLabel',
            {
              defaultMessage: 'Set up GenAI connector',
            }
          )}
        </EuiButton>
      </div>
    </div>
  ) : null;
}
