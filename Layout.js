import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Code2, Home, BookOpen, User } from "lucide-react";

export default function Layout({ children, currentPageName }) {
    const location = useLocation();

    const navigationItems = [
        {
            title: "Home",
            url: createPageUrl("Home"),
            icon: Home,
        },
        {
            title: "Projects",
            url: createPageUrl("Projects"),
            icon: Code2,
        },
        {
            title: "About",
            url: createPageUrl("About"),
            icon: User,
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <style>{`
                :root {
                    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    --accent-color: #4f46e5;
                    --text-primary: #1e293b;
                    --text-secondary: #64748b;
                    --code-bg: #1e293b;
                }
            `}</style>
            
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to={createPageUrl("Home")} className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    PyCode Hub
                                </h1>
                                <p className="text-xs text-slate-500">Python Scripts Collection</p>
                            </div>
                        </Link>

                        <nav className="flex items-center space-x-8">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.title}
                                    to={item.url}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                        location.pathname === item.url
                                            ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                            : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex justify-center items-center space-x-3 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold">PyCode Hub</h3>
                        </div>
                        <p className="text-slate-400 mb-6">
                            Your go-to resource for beginner-friendly Python scripts and learning materials.
                        </p>
                        <div className="flex justify-center space-x-6 text-sm text-slate-500">
                            <span>Made with ❤️ for Python learners</span>
                            <span>•</span>
                            <span>Free and open source</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}