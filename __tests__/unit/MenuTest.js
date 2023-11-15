import Menu from '../../src/model/Menu.js';
import { MENU } from '../../src/common/constants.js';

describe('Menu 테스트', () => {
  test('유효한 메뉴 시 성공', () => {
    expect(() => new Menu('해산물파스타', 1)).not.toThrow();
  });

  test('존재하지 않는 메뉴 생성 시 에러 발생', () => {
    expect(() => new Menu('라면', 1)).toThrow();
  });

  test('메뉴 개수가 0일 때 에러 발생', () => {
    expect(() => new Menu('해산물파스타', 0)).toThrow();
  });

  test('메뉴 개수가 음수일 때 에러 발생', () => {
    expect(() => new Menu('해산물파스타', -1)).toThrow();
  });

  test('유효한 메뉴 생성', () => {
    const menuName = MENU[0].name;
    const menu = new Menu(menuName, 1);
    expect(menu.getName()).toBe(menuName);
    expect(menu.getCount()).toBe(1);
  });
});
