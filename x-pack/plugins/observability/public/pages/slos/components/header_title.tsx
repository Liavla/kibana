/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { EuiFlexItem } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';

export function HeaderTitle() {
  return (
    <EuiFlexItem grow={false}>
      {i18n.translate('xpack.observability.slosPageTitle', {
        defaultMessage: 'SLOs',
      })}
    </EuiFlexItem>
  );
}
