/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { EuiSpacer, EuiTitle } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import type { ApplicationStart } from '@kbn/core-application-browser';
import type { SharePluginStart } from '@kbn/share-plugin/public';
import { CodeBox } from './code_box';
import { LanguageDefinition } from '../types';
import { OverviewPanel } from './overview_panel';
import { IngestionsPanel } from './ingestions_panel';
interface IngestDataProps {
  codeSnippet: string;
  selectedLanguage: LanguageDefinition;
  setSelectedLanguage: (language: LanguageDefinition) => void;
  docLinks: {
    beats: string;
    logstash: string;
  };
  assetBasePath: string;
  application?: ApplicationStart;
  sharePlugin: SharePluginStart;
  languages: LanguageDefinition[];
  consoleRequest?: string;
  additionalIngestionPanel?: React.ReactNode;
}

export const IngestData: React.FC<IngestDataProps> = ({
  codeSnippet,
  selectedLanguage,
  setSelectedLanguage,
  docLinks,
  assetBasePath,
  application,
  sharePlugin,
  languages,
  consoleRequest,
  additionalIngestionPanel,
}) => {
  return (
    <OverviewPanel
      description={i18n.translate('searchApiPanels.welcomeBanner.ingestData.description', {
        defaultMessage: 'Add data to your data stream or index to make it searchable via API. ',
      })}
      leftPanelContent={
        <CodeBox
          consoleRequest={consoleRequest}
          codeSnippet={codeSnippet}
          languages={languages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          assetBasePath={assetBasePath}
          application={application}
          sharePlugin={sharePlugin}
        />
      }
      links={[]}
      title={i18n.translate('searchApiPanels.welcomeBanner.ingestData.title', {
        defaultMessage: 'Ingest data',
      })}
    >
      <EuiSpacer size="l" />
      <EuiTitle size="xs">
        <h4>
          {i18n.translate('searchApiPanels.welcomeBanner.ingestData.alternativeOptions', {
            defaultMessage: 'Alternative ingestion options',
          })}
        </h4>
      </EuiTitle>
      <EuiSpacer size="m" />

      <IngestionsPanel
        assetBasePath={assetBasePath}
        docLinks={docLinks}
        additionalIngestionPanel={additionalIngestionPanel}
      />
    </OverviewPanel>
  );
};
