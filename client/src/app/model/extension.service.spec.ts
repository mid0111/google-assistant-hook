
import { ExtensionService } from './extension.service';

describe('ExtensionService', () => {
  let service: ExtensionService;

  beforeEach(() => {
    service = new ExtensionService();
  });

  it('Extension 一覧を取得できること', () => {
    service.getExtensions().subscribe((extensions) => {
      let index = 0;

      expect(extensions.length).toBe(3);
      expect(extensions[index++]).toEqual({
        title: 'ショートカット',
        description: '音声コマンドのショートカット機能を利用する',
        path: '/shortcut',
        btnName: 'Shortcut',
        materialIcon: 'speaker_notes',
      });

      expect(extensions[index++]).toEqual({
        title: 'Rebuild FM ポッドキャスト',
        description: 'Rebuild FM のエピソードを Google Home で再生',
        path: '/rebuild',
        btnName: 'Rebuild FM',
        backgroundImage: 'https://rebuild.fm/images/bg.jpg',
      });

      expect(extensions[index++]).toEqual({
        title: 'Stream Music',
        description: 'Web 上の音楽を Google Home でストリーム再生',
        path: '/stream',
        btnName: 'Stream Music',
        materialIcon: 'queue_music',
      });
    });
  });
});
