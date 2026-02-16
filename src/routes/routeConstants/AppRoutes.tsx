import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { publicRoutes } from "../public.routes";
import { privateRoutes } from "../private.routes";

const AppRoutes = () => {
  const routes = useRoutes([
    ...publicRoutes,
    ...privateRoutes
  ]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {routes}
    </Suspense>
  );
};

export default AppRoutes;
