export function Footer() {
  return (
    <footer className="w-full py-6 bg-white/80 backdrop-blur-sm border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <a href="#" className="hover:text-indigo-500 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-500 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-indigo-500 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ChatConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}