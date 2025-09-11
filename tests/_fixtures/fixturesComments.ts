import { test as base } from '@playwright/test';
import { ApiComposite } from '../../src/api/ApiComposite'


export const test = base.extend<{
  commentsApi;
}>({
  commentsApi: async ({ request },use)=> {
    const apiCompositeInterface = new ApiComposite(request);

    await use(apiCompositeInterface);
  },

})
