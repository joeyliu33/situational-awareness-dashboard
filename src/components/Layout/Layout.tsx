import React from 'react';

interface LayoutProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  title,
  subtitle,
  actions,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#0f1116] text-[#dde6ef] px-8 py-6 flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-base sm:text-xl font-light tracking-wide text-slate-200 uppercase leading-tight break-words sm:whitespace-nowrap">
            {title}
          </h1>

          {subtitle && (
            <p className="text-[10px] sm:text-sm text-slate-500 mt-0.5 line-clamp-2 sm:line-clamp-none">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 self-start sm:mt-1 scale-90 origin-left sm:scale-100">
          {actions}
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 max-w-[1800px] w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
