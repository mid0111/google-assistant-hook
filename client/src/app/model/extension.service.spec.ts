
import { ExtensionService } from './extension.service';

describe('ExtensionService', () => {
  let service: ExtensionService;

  beforeEach(() => {
    service = new ExtensionService();
  });

  it('Extension 一覧を取得できること', () => {
    service.getExtensions().subscribe((extensions) => {
      expect(extensions.length).toBe(1);
      expect(extensions[0]).toEqual({
        title: 'Stream Music',
        description: 'Web 上の音楽を Google Home でストリーム再生する',
        path: '/stream',
        btnName: 'Stream Music'
      });
    });
  });
});
