function Button(props) {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer";
    const variants = {
        default: "bg-indigo-600 text-white hover:bg-indigo-700",
        outline: "border-2 border-slate-300 text-slate-700 hover:bg-slate-50",
        ghost: "text-slate-600 hover:bg-slate-100"
    };
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg"
    };
    
    const variant = props.variant || "default";
    const size = props.size || "md";
    const className = props.className || "";
    
    return (
        <button 
            onClick={props.onClick}
            className={baseClasses + " " + variants[variant] + " " + sizes[size] + " " + className}
        >
            {props.children}
        </button>
    );
}

function Input(props) {
    const className = props.className || "";
    return (
        <input
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            className={"w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 " + className}
        />
    );
}

function Badge(props) {
    const variants = {
        default: "bg-slate-100 text-slate-700",
        outline: "border border-slate-300 text-slate-600"
    };
    
    const variant = props.variant || "default";
    const className = props.className || "";
    
    return (
        <span className={"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium " + variants[variant] + " " + className}>
            {props.children}
        </span>
    );
}

function Card(props) {
    const className = props.className || "";
    return (
        <div className={"bg-white rounded-xl border border-slate-200 " + className}>
            {props.children}
        </div>
    );
}