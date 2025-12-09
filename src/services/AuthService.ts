/**
 * 用户认证服务
 * 提供用户认证相关的核心功能
 */

import type { User } from '../models/User.js';
import type { LoginRequest } from '../types/index.js';

/**
 * 认证结果
 */
export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * 用户存储接口（用于依赖注入）
 */
export interface UserStore {
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

/**
 * 密码验证器接口（用于依赖注入）
 */
export interface PasswordVerifier {
  verify(password: string, hash: string): Promise<boolean>;
}

/**
 * 认证服务
 */
export class AuthService {
  constructor(
    private readonly userStore: UserStore,
    private readonly passwordVerifier: PasswordVerifier
  ) {}

  /**
   * 验证用户凭据
   * @param credentials - 登录凭据（用户名和密码）
   * @returns 认证结果
   */
  async authenticate(credentials: LoginRequest): Promise<AuthResult> {
    const { username, password } = credentials;

    // 查找用户
    const user = await this.findUser(username);
    if (!user) {
      return {
        success: false,
        error: '用户不存在',
      };
    }

    // 验证密码
    const isValid = await this.verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return {
        success: false,
        error: '密码错误',
      };
    }

    return {
      success: true,
      user,
    };
  }

  /**
   * 根据用户名查找用户
   * @param username - 用户名
   * @returns 用户实体或 null
   */
  async findUser(username: string): Promise<User | null> {
    return this.userStore.findByUsername(username);
  }

  /**
   * 根据邮箱查找用户
   * @param email - 邮箱地址
   * @returns 用户实体或 null
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userStore.findByEmail(email);
  }

  /**
   * 根据 ID 查找用户
   * @param id - 用户 ID
   * @returns 用户实体或 null
   */
  async findUserById(id: string): Promise<User | null> {
    return this.userStore.findById(id);
  }

  /**
   * 验证密码
   * @param password - 明文密码
   * @param hash - 密码哈希
   * @returns 是否匹配
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return this.passwordVerifier.verify(password, hash);
  }

  /**
   * 验证用户是否存在
   * @param username - 用户名
   * @returns 是否存在
   */
  async userExists(username: string): Promise<boolean> {
    const user = await this.findUser(username);
    return user !== null;
  }
}
