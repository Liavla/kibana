/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { renderHook, act } from '@testing-library/react-hooks';
import { useTogglePanel } from './use_toggle_panel';
import { getStartedStorage } from '../storage';
import { ProductLine } from '../../../common/product';
import type { SecurityProductTypes } from '../../../common/config';
import {
  QuickStartSectionCardsId,
  SectionId,
  CreateProjectSteps,
  OverviewSteps,
  AddAndValidateYourDataCardsId,
  AddIntegrationsSteps,
  ViewDashboardSteps,
  GetStartedWithAlertsCardsId,
  ViewAlertsSteps,
  EnablePrebuiltRulesSteps,
} from '../types';

jest.mock('../storage');
jest.mock('../../common/services');
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({ hash: '' }),
}));

jest.mock('@kbn/security-solution-navigation', () => ({
  useNavigateTo: jest.fn().mockReturnValue({ navigateTo: jest.fn() }),
  SecurityPageName: {
    landing: 'landing',
  },
}));

describe('useTogglePanel', () => {
  const productTypes = [
    { product_line: 'security', product_tier: 'essentials' },
    { product_line: 'endpoint', product_tier: 'complete' },
  ] as SecurityProductTypes;

  beforeEach(() => {
    jest.clearAllMocks();

    (getStartedStorage.getAllFinishedStepsFromStorage as jest.Mock).mockReturnValue({
      [QuickStartSectionCardsId.createFirstProject]: new Set([
        CreateProjectSteps.createFirstProject,
      ]),
    });
    (getStartedStorage.getActiveProductsFromStorage as jest.Mock).mockReturnValue([
      ProductLine.security,
      ProductLine.cloud,
      ProductLine.endpoint,
    ]);
  });

  test('should initialize state with correct initial values - when no active products from local storage', () => {
    (getStartedStorage.getActiveProductsFromStorage as jest.Mock).mockReturnValue([]);

    const { result } = renderHook(() => useTogglePanel({ productTypes }));

    const { state } = result.current;

    expect(state.activeProducts).toEqual(new Set([ProductLine.security, ProductLine.endpoint]));
    expect(state.finishedSteps).toEqual({
      [QuickStartSectionCardsId.createFirstProject]: new Set([
        CreateProjectSteps.createFirstProject,
      ]),
    });

    expect(state.activeSections).toEqual(
      expect.objectContaining({
        [SectionId.quickStart]: {
          [QuickStartSectionCardsId.createFirstProject]: {
            id: QuickStartSectionCardsId.createFirstProject,
            timeInMins: 0,
            stepsLeft: 0,
            activeStepIds: [CreateProjectSteps.createFirstProject],
          },
          [QuickStartSectionCardsId.watchTheOverviewVideo]: {
            id: QuickStartSectionCardsId.watchTheOverviewVideo,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [OverviewSteps.getToKnowElasticSecurity],
          },
        },
        [SectionId.addAndValidateYourData]: {
          [AddAndValidateYourDataCardsId.addIntegrations]: {
            id: AddAndValidateYourDataCardsId.addIntegrations,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [AddIntegrationsSteps.connectToDataSources],
          },
          [AddAndValidateYourDataCardsId.viewDashboards]: {
            id: AddAndValidateYourDataCardsId.viewDashboards,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [ViewDashboardSteps.analyzeData],
          },
        },
        [SectionId.getStartedWithAlerts]: {
          [GetStartedWithAlertsCardsId.enablePrebuiltRules]: {
            id: EnablePrebuiltRulesSteps.enablePrebuiltRules,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [EnablePrebuiltRulesSteps.enablePrebuiltRules],
          },
          [GetStartedWithAlertsCardsId.viewAlerts]: {
            id: GetStartedWithAlertsCardsId.viewAlerts,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [ViewAlertsSteps.viewAlerts],
          },
        },
      })
    );
  });

  test('should initialize state with correct initial values - when all products active', () => {
    const { result } = renderHook(() => useTogglePanel({ productTypes }));

    const { state } = result.current;

    expect(state.activeProducts).toEqual(
      new Set([ProductLine.security, ProductLine.cloud, ProductLine.endpoint])
    );
    expect(state.finishedSteps).toEqual({
      [QuickStartSectionCardsId.createFirstProject]: new Set([
        CreateProjectSteps.createFirstProject,
      ]),
    });

    expect(state.activeSections).toEqual(
      expect.objectContaining({
        [SectionId.quickStart]: {
          [QuickStartSectionCardsId.createFirstProject]: {
            id: QuickStartSectionCardsId.createFirstProject,
            timeInMins: 0,
            stepsLeft: 0,
            activeStepIds: [CreateProjectSteps.createFirstProject],
          },
          [QuickStartSectionCardsId.watchTheOverviewVideo]: {
            id: QuickStartSectionCardsId.watchTheOverviewVideo,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [OverviewSteps.getToKnowElasticSecurity],
          },
        },
        [SectionId.addAndValidateYourData]: {
          [AddAndValidateYourDataCardsId.addIntegrations]: {
            id: AddAndValidateYourDataCardsId.addIntegrations,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [AddIntegrationsSteps.connectToDataSources],
          },
          [AddAndValidateYourDataCardsId.viewDashboards]: {
            id: AddAndValidateYourDataCardsId.viewDashboards,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [ViewDashboardSteps.analyzeData],
          },
        },
        [SectionId.getStartedWithAlerts]: {
          [GetStartedWithAlertsCardsId.enablePrebuiltRules]: {
            id: EnablePrebuiltRulesSteps.enablePrebuiltRules,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [EnablePrebuiltRulesSteps.enablePrebuiltRules],
          },
          [GetStartedWithAlertsCardsId.viewAlerts]: {
            id: GetStartedWithAlertsCardsId.viewAlerts,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [ViewAlertsSteps.viewAlerts],
          },
        },
      })
    );
  });

  test('should initialize state with correct initial values - when security product active', () => {
    (getStartedStorage.getActiveProductsFromStorage as jest.Mock).mockReturnValue([
      ProductLine.security,
    ]);
    const { result } = renderHook(() => useTogglePanel({ productTypes }));

    const { state } = result.current;

    expect(state.activeProducts).toEqual(new Set([ProductLine.security]));
    expect(state.finishedSteps).toEqual({
      [QuickStartSectionCardsId.createFirstProject]: new Set([
        CreateProjectSteps.createFirstProject,
      ]),
    });

    expect(state.activeSections).toEqual(
      expect.objectContaining({
        [SectionId.quickStart]: {
          [QuickStartSectionCardsId.createFirstProject]: {
            id: QuickStartSectionCardsId.createFirstProject,
            timeInMins: 0,
            stepsLeft: 0,
            activeStepIds: [CreateProjectSteps.createFirstProject],
          },
          [QuickStartSectionCardsId.watchTheOverviewVideo]: {
            id: QuickStartSectionCardsId.watchTheOverviewVideo,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [OverviewSteps.getToKnowElasticSecurity],
          },
        },
        [SectionId.addAndValidateYourData]: {
          [AddAndValidateYourDataCardsId.addIntegrations]: {
            id: AddAndValidateYourDataCardsId.addIntegrations,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [AddIntegrationsSteps.connectToDataSources],
          },
          [AddAndValidateYourDataCardsId.viewDashboards]: {
            id: AddAndValidateYourDataCardsId.viewDashboards,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [ViewDashboardSteps.analyzeData],
          },
        },
        [SectionId.getStartedWithAlerts]: {
          [GetStartedWithAlertsCardsId.enablePrebuiltRules]: {
            id: EnablePrebuiltRulesSteps.enablePrebuiltRules,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [EnablePrebuiltRulesSteps.enablePrebuiltRules],
          },
          [GetStartedWithAlertsCardsId.viewAlerts]: {
            id: GetStartedWithAlertsCardsId.viewAlerts,
            timeInMins: 0,
            stepsLeft: 1,
            activeStepIds: [ViewAlertsSteps.viewAlerts],
          },
        },
      })
    );
  });

  test('should reset all the card steps in storage when a step is expanded. (As it allows only one step open at a time)', () => {
    const { result } = renderHook(() => useTogglePanel({ productTypes }));

    const { onStepClicked } = result.current;

    act(() => {
      onStepClicked({
        stepId: OverviewSteps.getToKnowElasticSecurity,
        cardId: QuickStartSectionCardsId.watchTheOverviewVideo,
        sectionId: SectionId.quickStart,
        isExpanded: true,
      });
    });

    expect(getStartedStorage.resetAllExpandedCardStepsToStorage).toHaveBeenCalledTimes(1);
  });

  test('should add the current step to storage when it is expanded', () => {
    const { result } = renderHook(() => useTogglePanel({ productTypes }));

    const { onStepClicked } = result.current;

    act(() => {
      onStepClicked({
        stepId: OverviewSteps.getToKnowElasticSecurity,
        cardId: QuickStartSectionCardsId.watchTheOverviewVideo,
        sectionId: SectionId.quickStart,
        isExpanded: true,
      });
    });

    expect(getStartedStorage.addExpandedCardStepToStorage).toHaveBeenCalledTimes(1);
    expect(getStartedStorage.addExpandedCardStepToStorage).toHaveBeenCalledWith(
      QuickStartSectionCardsId.watchTheOverviewVideo,
      OverviewSteps.getToKnowElasticSecurity
    );
  });

  test('should remove the current step from storage when it is collapsed', () => {
    const { result } = renderHook(() => useTogglePanel({ productTypes }));

    const { onStepClicked } = result.current;

    act(() => {
      onStepClicked({
        stepId: OverviewSteps.getToKnowElasticSecurity,
        cardId: QuickStartSectionCardsId.watchTheOverviewVideo,
        sectionId: SectionId.quickStart,
        isExpanded: false,
      });
    });

    expect(getStartedStorage.removeExpandedCardStepFromStorage).toHaveBeenCalledTimes(1);
    expect(getStartedStorage.removeExpandedCardStepFromStorage).toHaveBeenCalledWith(
      QuickStartSectionCardsId.watchTheOverviewVideo,
      OverviewSteps.getToKnowElasticSecurity
    );
  });

  test('should call addFinishedStepToStorage when toggleTaskCompleteStatus is executed', () => {
    const { result } = renderHook(() => useTogglePanel({ productTypes }));

    const { toggleTaskCompleteStatus } = result.current;

    act(() => {
      toggleTaskCompleteStatus({
        stepId: OverviewSteps.getToKnowElasticSecurity,
        cardId: QuickStartSectionCardsId.watchTheOverviewVideo,
        sectionId: SectionId.quickStart,
      });
    });

    expect(getStartedStorage.addFinishedStepToStorage).toHaveBeenCalledTimes(1);
    expect(getStartedStorage.addFinishedStepToStorage).toHaveBeenCalledWith(
      QuickStartSectionCardsId.watchTheOverviewVideo,
      OverviewSteps.getToKnowElasticSecurity
    );
  });

  test('should call removeFinishedStepToStorage when toggleTaskCompleteStatus is executed with undo equals to true', () => {
    const { result } = renderHook(() => useTogglePanel({ productTypes }));

    const { toggleTaskCompleteStatus } = result.current;

    act(() => {
      toggleTaskCompleteStatus({
        stepId: OverviewSteps.getToKnowElasticSecurity,
        cardId: QuickStartSectionCardsId.watchTheOverviewVideo,
        sectionId: SectionId.quickStart,
        undo: true,
      });
    });

    expect(getStartedStorage.removeFinishedStepFromStorage).toHaveBeenCalledTimes(1);
    expect(getStartedStorage.removeFinishedStepFromStorage).toHaveBeenCalledWith(
      QuickStartSectionCardsId.watchTheOverviewVideo,
      OverviewSteps.getToKnowElasticSecurity
    );
  });

  test('should call toggleActiveProductsInStorage when onProductSwitchChanged is executed', () => {
    const { result } = renderHook(() => useTogglePanel({ productTypes }));

    const { onProductSwitchChanged } = result.current;

    act(() => {
      onProductSwitchChanged({ id: ProductLine.security, label: 'Analytics' });
    });

    expect(getStartedStorage.toggleActiveProductsInStorage).toHaveBeenCalledTimes(1);
    expect(getStartedStorage.toggleActiveProductsInStorage).toHaveBeenCalledWith(
      ProductLine.security
    );
  });
});
