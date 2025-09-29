function AboutPage(props) {
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
                                    Practical tools that solve real problems and demonstrate Python versatility.
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

                    <section className="text-center py-12">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Start Exploring?</h2>
                        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                            Dive into our collection of Python scripts and discover how much you can learn by doing. 
                            Whether you are a complete beginner or looking to sharpen your skills, there is something here for you.
                        </p>
                        <Button size="lg" onClick={() => props.onNavigate('projects')} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-3">
                            <Code2 className="w-5 h-5 mr-2" />
                            Explore Python Scripts
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </section>
                </div>
            </div>
        </div>
    );
}