/**
 * User Model - 基础用户模型
 * 多个 Worker 将并行添加不同的方法
 */
export interface User {
  id: number;
  username: string;
  email: string;
}

export class UserService {
  // 基础用户服务，Worker 将在此添加方法
}
