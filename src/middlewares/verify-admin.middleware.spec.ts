import { VerifyAdminMiddleware } from './verify-admin.middleware';

describe('VerifyAdminMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyAdminMiddleware()).toBeDefined();
  });
});
