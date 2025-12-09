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
  private users: User[] = [];

  /**
   * 根据 ID 查询用户
   * @param id 用户 ID
   * @returns 匹配的用户，如果未找到则返回 undefined
   */
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
