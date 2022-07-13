import { AuthProvider } from "./auth"
import { AppRouter } from "./router/AppRouter"

export const HeroesApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

/** con esto:
 * <AuthProvider>
 * ya tenemos las variables que hemos creado, en este
 * caso el reducer del logged, para asi usarlo
 * en todas las pages
 * ver clase 208
 */