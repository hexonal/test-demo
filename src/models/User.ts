/**
 * 用户模型
 */

import type { UserInfo } from '../types/index.js';

/**
 * 用户实体
 */
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 创建用户参数
 */
export interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}

/**
 * 将 User 转换为 UserInfo（移除敏感信息）
 * @param user - 用户实体
 * @returns 用户基础信息
 */
export function toUserInfo(user: User): UserInfo {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
}
