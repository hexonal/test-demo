/**
 * 基础类型定义
 */

/**
 * API 响应结果
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * 认证令牌
 */
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * 登录请求
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  user: UserInfo;
  token: AuthToken;
}

/**
 * 用户基础信息（不含敏感数据）
 */
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}
