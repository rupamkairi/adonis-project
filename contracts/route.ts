declare module '@ioc:Adonis/Core/Route' {
  interface RouteContract {
    mustBeSigned(): this
  }

  interface RouteGroupContract {
    mustBeSigned(): this
  }
}
