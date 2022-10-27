import { resize } from '../resize';


describe('Tests resizing function', () => {
    it('expects the resize function to return the new thumbnail image path', async () => {
        expect(await resize('santamonica', 200, 100)).toEqual(
            `images/thumbnails/santamonica-200x100.jpg`
        );
    });
});
