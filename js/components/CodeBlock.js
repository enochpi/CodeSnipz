function CodeBlock(props) {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(props.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    return (
        <div className="relative group">
            <div className="bg-slate-800 rounded-lg p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-slate-400 text-sm font-mono">{props.filename}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" onClick={copyCode} className="text-slate-400 hover:text-white hover:bg-slate-700">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                        {props.onDownload && (
                            <Button size="sm" variant="ghost" onClick={props.onDownload} className="text-slate-400 hover:text-white hover:bg-slate-700">
                                <Download className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
                <pre className="text-sm overflow-x-auto">
                    <code className="text-slate-300 font-mono leading-relaxed whitespace-pre">
                        {props.code}
                    </code>
                </pre>
            </div>
        </div>
    );
}