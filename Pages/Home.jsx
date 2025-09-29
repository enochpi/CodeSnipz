import React, { useState, useEffect } from "react";
import { PythonScript } from "@/entities/PythonScript";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Code2, Star, ArrowRight, Play, Download, Zap } from "lucide-react";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFeaturedProjects();
    }, []);

    const loadFeaturedProjects = async () => {
        try {
            const projects = await PythonScript.filter({ featured: true }, '-created_date', 3);
            setFeaturedProjects(projects);
        } catch (error) {
            console.error("Error loading featured projects:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
                            <Star className="w-4 h-4 mr-2" />
                            Free Python Scripts for Everyone
                        </div>
                        
                        <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            Learn Python with
                            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Ready-to-Use Scripts
                            </span>
                        </h1>
                        
                        <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Discover a curated collection of beginner-friendly Python scripts. 
                            Copy, download, and learn from mini-games, utilities, and educational snippets.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Link to={createPageUrl("Projects")}>
                                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-3">
                                    <Code2 className="w-5 h-5 mr-2" />
                                    Browse All Scripts
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link to={createPageUrl("About")}>
                                <Button size="lg" variant="outline" className="px-8 py-3">
                                    Learn More
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-indigo-600 mb-2">50+</div>
                                <div className="text-slate-600">Python Scripts</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                                <div className="text-slate-600">Categories</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                                <div className="text-slate-600">Beginner-Friendly</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                            Featured Python Scripts
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Start with these popular and well-tested scripts that showcase different Python concepts.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-slate-200 rounded-lg h-96"></div>
                                </div>
                            ))}
                        </div>
                    ) : featuredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {featuredProjects.map((project) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
                                    showCode={false}
                                    compact={true}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Code2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-600 mb-2">No Featured Projects Yet</h3>
                            <p className="text-slate-500">Check back soon for curated Python scripts!</p>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to={createPageUrl("Projects")}>
                            <Button size="lg" variant="outline" className="px-8">
                                View All Projects
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Preview */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                            Explore by Category
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Find the perfect Python script for your learning journey or project needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 text-center group hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Play className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Mini-Games</h3>
                            <p className="text-slate-600 mb-6">
                                Fun and interactive Python games like Tic-Tac-Toe, Number Guessing, and Snake.
                            </p>
                            <div className="text-sm text-green-600 font-medium">Perfect for beginners</div>
                        </div>

                        <div className="bg-white rounded-xl p-8 text-center group hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Utilities</h3>
                            <p className="text-slate-600 mb-6">
                                Practical tools for file management, data processing, and everyday automation.
                            </p>
                            <div className="text-sm text-blue-600 font-medium">Save time & effort</div>
                        </div>

                        <div className="bg-white rounded-xl p-8 text-center group hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Code2 className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Learning Snippets</h3>
                            <p className="text-slate-600 mb-6">
                                Essential Python concepts and algorithms explained with clean, commented code.
                            </p>
                            <div className="text-sm text-purple-600 font-medium">Build your skills</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}