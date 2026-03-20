import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { ZodError } from "zod";
import { ApiError } from "@/01-adapters/http/ApiError";

export function RootErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  if (error instanceof ApiError) {
    const title = error.isUnauthorized
      ? "Session expirée"
      : error.isForbidden
        ? "Accès interdit"
        : error.isNotFound
          ? "Ressource introuvable"
          : error.isServerError
            ? "Erreur serveur"
            : "Erreur de requête";

    const description = error.isUnauthorized
      ? "Votre session a expiré. Veuillez vous reconnecter."
      : error.isForbidden
        ? "Vous n'avez pas les droits pour accéder à cette ressource."
        : error.isNotFound
          ? "La ressource demandée n'existe pas ou a été supprimée."
          : error.isServerError
            ? "Le serveur a rencontré un problème. Veuillez réessayer dans quelques instants."
            : "La requête envoyée au serveur est invalide.";

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <span className="text-8xl font-bold text-muted-foreground/20">
          {error.status}
        </span>
        <h1 className="text-2xl font-bold mt-4">{title}</h1>
        <p className="text-muted-foreground mt-2 max-w-md">{description}</p>
        {error.detail && error.detail !== description && (
          <p className="mt-3 text-xs font-mono bg-muted rounded-md px-3 py-2 text-muted-foreground max-w-lg">
            {error.detail}
          </p>
        )}
        <div className="flex gap-4 mt-6">
          {error.isUnauthorized ? (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Se reconnecter
            </Link>
          ) : (
            <>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted"
              >
                Retour
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Accueil
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  if (error instanceof ZodError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="text-2xl font-bold">Données API inattendues</h1>
        <p className="text-muted-foreground mt-2 max-w-md">
          La réponse du serveur ne correspond pas au format attendu.
        </p>
        <ul className="mt-4 text-sm text-left bg-muted rounded-md p-4 max-w-lg w-full space-y-1">
          {error.issues.map((issue, i) => (
            <li key={i} className="text-destructive">
              <span className="font-mono">{issue.path.join(".")}</span>
              {" — "}
              {issue.message}
            </li>
          ))}
        </ul>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (is404) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <span className="text-8xl font-bold text-muted-foreground/20">404</span>
        <h1 className="text-2xl font-bold mt-4">Page introuvable</h1>
        <p className="text-muted-foreground mt-2 max-w-md">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        Nous rencontrons un problème technique. Veuillez réessayer dans quelques
        instants.
      </p>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted"
        >
          Actualiser
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}

export default RootErrorBoundary;
