import { Outlet } from "react-router-dom";
import RouteSEO from "@/components/RouteSEO";
import benchmarkBackground from "@/assets/benchmark/bg.jpg";

const BenchmarkRouteLayout = () => {
  return (
    <div className="relative min-h-screen bg-transparent text-white">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${benchmarkBackground})` }}
      />
      <RouteSEO />
      <Outlet />
    </div>
  );
};

export default BenchmarkRouteLayout;
