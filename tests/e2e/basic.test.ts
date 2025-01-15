// @vitest-environment node
import {describe, expect, it} from 'vitest'
import {createPage, setup} from '@nuxt/test-utils/e2e'

await setup({
    browser: true
})

describe('pages', () => {

    it('render index', async () => {

        const page = await createPage('/');
        expect(await page.title()).contains("Reddit");
    })

});