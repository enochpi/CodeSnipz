import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Code2, Heart, Users, BookOpen, Star, ArrowRight } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6">
                        <Code2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                        About PyCode Hub
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Your trusted companion in the Python learning journey, offering practical, 
                        beginner-friendly scripts that you can use, learn from, and build upon.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Mission */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                                <Heart className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            We believe that learning Python should be accessible, practical, and fun. PyCode Hub exists to 
                            bridge the gap between theory and practice by providing a curated collection of real-world Python 
                            scripts that beginners can understand, modify, and use in their own projects.
                        </p>
                    </section>

                    {/* What We Offer */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                                <BookOpen className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">What We Offer</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Code2 className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">Mini-Games</h3>
                                <p className="text-slate-600 text-sm">
                                    Interactive games that make learning Python concepts enjoyable and memorable.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">Utilities</h3>
                                <p className="text-slate-600 text-sm">
                                    Practical tools that solve real problems and demonstrate Python's versatility.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">Learning Snippets</h3>
                                <p className="text-slate-600 text-sm">
                                    Focused examples that teach specific programming concepts and best practices.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Why Choose Us */}
                    <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Why Choose PyCode Hub?</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <BookOpen className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2">Beginner-Friendly</h3>
                                        <p className="text-slate-600 text-sm">
                                            Every script is designed with beginners in mind, featuring clear comments and simple logic.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <Code2 className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2">Ready to Run</h3>
                                        <p className="text-slate-600 text-sm">
                                            All scripts are fully functional and can be copied and run immediately.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <Heart className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2">Free Forever</h3>
                                        <p className="text-slate-600 text-sm">
                                            Our entire collection is free to use, modify, and distribute.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <Star className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2">Well Documented</h3>
                                        <p className="text-slate-600 text-sm">
                                            Each script includes clear instructions and explanations of key concepts.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <Users className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2">Community Focused</h3>
                                        <p className="text-slate-600 text-sm">
                                            Built by developers, for developers who are passionate about sharing knowledge.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <ArrowRight className="w-4 h-4 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2">Constantly Updated</h3>
                                        <p className="text-slate-600 text-sm">
                                            We regularly add new scripts and improve existing ones based on feedback.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="text-center py-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Exploring?</h2>
                        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                            Dive into our collection of Python scripts and discover how much you can learn by doing. 
                            Whether you're a complete beginner or looking to sharpen your skills, there's something here for you.
                        </p>
                        <Link to={createPageUrl("Projects")}>
                            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-3">
                                <Code2 className="w-5 h-5 mr-2" />
                                Explore Python Scripts
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
}