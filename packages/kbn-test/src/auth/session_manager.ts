/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { REPO_ROOT } from '@kbn/repo-info';
import { ToolingLog } from '@kbn/tooling-log';
import { resolve } from 'path';
import Url from 'url';
import { KbnClient } from '../kbn_client';
import { readCloudUsersFromFile } from './helper';
import { createCloudSAMLSession, createLocalSAMLSession, Session } from './saml_auth';
import { Role, User } from './types';

export interface HostOptions {
  protocol: 'http' | 'https';
  hostname: string;
  port?: number;
  username: string;
  password: string;
}

export interface SamlSessionManagerOptions {
  hostOptions: HostOptions;
  isCloud: boolean;
  log: ToolingLog;
}

/**
 * Manages cookies associated with user roles
 */
export class SamlSessionManager {
  private readonly isCloud: boolean;
  private readonly kbnHost: string;
  private readonly kbnClient: KbnClient;
  private readonly log: ToolingLog;
  private readonly roleToUserMap: Map<Role, User>;
  private readonly sessionCache: Map<Role, Session>;
  private readonly userRoleFilePath = resolve(REPO_ROOT, '.ftr', 'role_users.json');

  constructor(options: SamlSessionManagerOptions) {
    this.isCloud = options.isCloud;
    this.log = options.log;
    const hostOptionsWithoutAuth = {
      protocol: options.hostOptions.protocol,
      hostname: options.hostOptions.hostname,
      port: options.hostOptions.port,
    };
    this.kbnHost = Url.format(hostOptionsWithoutAuth);
    this.kbnClient = new KbnClient({
      log: this.log,
      url: Url.format({
        ...hostOptionsWithoutAuth,
        auth: `${options.hostOptions.username}:${options.hostOptions.password}`,
      }),
    });
    this.sessionCache = new Map<Role, Session>();
    this.roleToUserMap = new Map<Role, User>();
  }

  /**
   * Loads cloud users from '.ftr/role_users.json'
   * QAF prepares the file for CI pipelines, make sure to add it manually for local run
   */
  private getCloudUsers = () => {
    if (this.roleToUserMap.size === 0) {
      const data = readCloudUsersFromFile(this.userRoleFilePath);
      for (const [roleName, user] of data) {
        this.roleToUserMap.set(roleName, user);
      }
    }

    return this.roleToUserMap;
  };

  private getCloudUserByRole = (role: string) => {
    if (this.getCloudUsers().has(role)) {
      return this.getCloudUsers().get(role)!;
    } else {
      throw new Error(`User with '${role}' role is not defined`);
    }
  };

  private getSessionByRole = async (role: string) => {
    if (this.sessionCache.has(role)) {
      return this.sessionCache.get(role)!;
    }

    let session: Session;

    if (this.isCloud) {
      this.log.debug(`new cloud SAML authentication with '${role}' role`);
      const kbnVersion = await this.kbnClient.version.get();
      const { email, password } = this.getCloudUserByRole(role);
      session = await createCloudSAMLSession({
        email,
        password,
        kbnHost: this.kbnHost,
        kbnVersion,
        log: this.log,
      });
    } else {
      this.log.debug(`new fake SAML authentication with '${role}' role`);
      session = await createLocalSAMLSession({
        username: `elastic_${role}`,
        email: `elastic_${role}@elastic.co`,
        fullname: `test ${role}`,
        role,
        kbnHost: this.kbnHost,
        log: this.log,
      });
    }

    this.sessionCache.set(role, session);
    return session;
  };

  async getApiCredentialsForRole(role: string) {
    const session = await this.getSessionByRole(role);
    return { Cookie: `sid=${session.getCookieValue()}` };
  }

  async getSessionCookieForRole(role: string) {
    const session = await this.getSessionByRole(role);
    return session.getCookieValue();
  }

  async getUserData(role: string) {
    const { email, fullname } = await this.getSessionByRole(role);
    return { email, fullname };
  }
}
