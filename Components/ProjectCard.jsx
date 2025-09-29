import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Play, Download } from "lucide-react";
import CodeBlock from "./CodeBlock";

export default function ProjectCard({ project, compact = false, showCode = true }) {
    const categoryColors = {
        "Mini-Games": "bg-green-100 text-green-700 border-green-200",
        "Utilities": "bg-blue-100 text-blue-700 border-blue-200",
        "Learning Snippets": "bg-purple-100 text-purple-700 border-purple-200"
    };

    const difficultyColors = {
        "Beginner": "bg-emerald-100 text-emerald-700",
        "Intermediate": "bg-yellow-100 text-yellow-700",
        "Advanced": "bg-red-100 text-red-700"
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([project.code], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = `${project.title.replace(/\s+/g, "_").toLowerCase()}.py`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Card className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-sm ${compact ? 'h-full' : ''}`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-800">{project.title}</CardTitle>
                            <p className="text-sm text-slate-500 mt-1">{project.description}</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                    <Badge className={categoryColors[project.category]}>{project.category}</Badge>
                    <Badge variant="secondary" className={difficultyColors[project.difficulty]}>
                        {project.difficulty}
                    </Badge>
                </div>

                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardHeader>

            {showCode && (
                <CardContent className="space-y-4">
                    <CodeBlock 
                        code={project.code} 
                        filename={`${project.title.replace(/\s+/g, "_").toLowerCase()}.py`}
                        onDownload={handleDownload}
                    />
                    
                    <div className="bg-slate-50 rounded-lg p-4">
                        <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                            <Play className="w-4 h-4 mr-2" />
                            How to Run
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{project.instructions}</p>
                    </div>

                    <div className="flex justify-end">
                        <Button 
                            onClick={handleDownload}
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Script
                        </Button>
                    </div>
                </CardContent>
            )}

            {compact && (
                <CardContent className="pt-0">
                    <Button 
                        onClick={handleDownload}
                        variant="outline"
                        className="w-full"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </Button>
                </CardContent>
            )}
        </Card>
    );
}