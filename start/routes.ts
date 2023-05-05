/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  const testUrl = Route.makeUrl('api.getTest', { testId: 256 })
  const resultUrl = Route.makeUrl('api.getTestResult', [256, 512], {})

  const signedUrl = Route.makeSignedUrl('/signed', { testId: 256 }, { expiresIn: '30s' })
  const signedTestUrl = Route.makeSignedUrl('api.getTest', { testId: 256 }, { expiresIn: '30s' })
  const signedResultUrl = Route.makeSignedUrl(
    'api.getTestResult',
    { testId: 256, resultId: 512 },
    { expiresIn: '30s' }
  )

  return {
    signedUrl,
    testUrl: { testUrl, signedTestUrl },
    resultUrl: { resultUrl, signedResultUrl },
  }

  // return { message: 'hello world' }
})

Route.get('/signed', async () => {
  return 'is valid'
}).mustBeSigned()

Route.group(() => {
  Route.get('/test/:testId', async ({ params }) => `test ${params.testId}`).as('getTest')
  Route.get(
    '/test/:testId/result/:resultId',
    async ({ params }) => `result ${params.resultId} for test ${params.testId}`
  ).as('getTestResult')
})
  .mustBeSigned()
  .prefix('/api')
  .as('api')
