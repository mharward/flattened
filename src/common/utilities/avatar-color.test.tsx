import { getAvatarColor } from './avatar-color';

describe('getAvatarColor', () => {
    it('should return a valid hsl value', () => {
        expect(getAvatarColor()).toMatch(/hsl\(\d{1,3}, 70%, 60%\)/g);
    });

    it('should return distinct value in a second request', () => {
        expect(getAvatarColor()).not.toEqual(getAvatarColor());
    });
});
