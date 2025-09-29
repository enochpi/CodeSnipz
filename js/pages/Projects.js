function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");

    const categories = ["All", "Mini-Games", "Utilities", "Learning Snippets"];
    const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

    const filteredProjects = pythonScripts.filter(project => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = project.title.toLowerCase().includes(searchLower) ||
                            project.description.toLowerCase().includes(searchLower) ||
                            (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchLower)));
        
        const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === "All" || project.difficulty === selectedDifficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                        Python Scripts Collection
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Browse our complete collection of beginner-friendly Python scripts. 
                        Find exactly what you need to learn and practice.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input
                                    placeholder="Search scripts, descriptions, or tags..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            size="sm"
                                            variant={selectedCategory === category ? "default" : "outline"}
                                            onClick={() => setSelectedCategory(category)}
                                            className={selectedCategory === category ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Difficulty</label>
                                <div className="flex flex-wrap gap-2">
                                    {difficulties.map((difficulty) => (
                                        <Button
                                            key={difficulty}
                                            size="sm"
                                            variant={selectedDifficulty === difficulty ? "default" : "outline"}
                                            onClick={() => setSelectedDifficulty(difficulty)}
                                            className={selectedDifficulty === difficulty ? "bg-purple-600 hover:bg-purple-700" : ""}
                                        >
                                            {difficulty}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-slate-600">
                        Showing {filteredProjects.length} of {pythonScripts.length} scripts
                        {searchTerm && " for \"" + searchTerm + "\""}
                        {selectedCategory !== "All" && " in " + selectedCategory}
                        {selectedDifficulty !== "All" && " • " + selectedDifficulty + " level"}
                    </p>
                </div>

                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Code2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-600 mb-2">No Scripts Found</h3>
                        <p className="text-slate-500 mb-6">
                            Try adjusting your search terms or filters to find what you are looking for.
                        </p>
                        <Button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                                setSelectedDifficulty("All");
                            }}
                            variant="outline"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}