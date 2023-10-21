import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/mr-navbar';
import Sidebar from '@/components/mr-sidebar';
import Footer from '@/components/mr-footer';
import { totalRoutes } from '@/router';

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState('Main Dashboard');

  React.useEffect(() => {
    window.addEventListener('resize', () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(totalRoutes);
  }, [location.pathname]);

  const getActiveRoute = (totalRoutes) => {
    let activeRoute = 'Main Dashboard';
    for (let i = 0; i < totalRoutes.length; i++) {
      if (
        window.location.href.indexOf(
          totalRoutes[i].layout + '/' + totalRoutes[i].path
        ) !== -1
      ) {
        setCurrentRoute(totalRoutes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (totalRoutes) => {
    let activeNavbar = false;
    for (let i = 0; i < totalRoutes.length; i++) {
      if (
        window.location.href.indexOf(
          totalRoutes[i].layout + totalRoutes[i].path
        ) !== -1
      ) {
        return totalRoutes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (totalRoutes) => {
    return totalRoutes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = 'ltr';
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={'Horizon UI Tailwind React'}
              brandText={currentRoute}
              secondary={getActiveNavbar(totalRoutes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(totalRoutes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>

            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
