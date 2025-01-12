import {mount, type VueWrapper} from '@vue/test-utils'
import {describe, expect, test} from 'vitest'
import HelloWorld from "~/components/HelloWorld.vue";

describe('Hello Component Integration Test', () => {

    test('renders "Hello world!" text', () => {
        const wrapper: VueWrapper = mount(HelloWorld)

        expect(wrapper.text()).toContain('Hello world!');
    });

    test('increments counter when button is clicked', async () => {
        const wrapper: VueWrapper = mount(HelloWorld)

        const span = wrapper.find('span');

        expect(span.text()).contain("0");
        await wrapper.find('button').trigger('click');
        expect(span.text()).contain("1");
    })
})
