import * as React from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "./Button";

interface ComboboxOption {
  value: string;
  label: string;
  icon?: React.ElementType;
  group?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  label?: string;
  helperText?: string;
  error?: string;
  clearable?: boolean;
}

export function Combobox({
  options,
  value: controlledValue,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  disabled = false,
  isLoading = false,
  className,
  label,
  helperText,
  error,
  clearable = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const groups = Array.from(new Set(filteredOptions.map((o) => o.group).filter(Boolean)));

  const selectedOption = options.find((option) => option.value === value);

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderOption = (option: ComboboxOption) => (
    <div
      key={option.value}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors",
        "hover:bg-slate-50 hover:text-slate-900",
        value === option.value ? "bg-brand-orange/5 text-brand-orange font-medium" : "text-slate-600"
      )}
      onClick={() => {
        handleValueChange(option.value === value ? "" : option.value);
        setOpen(false);
        setSearch("");
      }}
    >
      {option.icon && (
        <option.icon className={cn("mr-2 h-4 w-4 shrink-0", value === option.value ? "text-brand-orange" : "text-slate-400")} />
      )}
      <span className="flex-1 truncate">{option.label}</span>
      {value === option.value && (
        <Check className="ml-2 h-4 w-4 shrink-0 text-brand-orange" />
      )}
    </div>
  );

  return (
    <div className={cn("flex flex-col gap-1.5", className)} ref={containerRef}>
      {label && (
        <label className="text-sm font-bold text-slate-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || isLoading}
          className={cn(
            "w-full justify-between font-normal text-left h-10 px-3",
            error && "border-rose-500 focus:ring-rose-500",
            !selectedOption && "text-slate-500"
          )}
          onClick={() => setOpen(!open)}
        >
          <span className="truncate flex items-center gap-2">
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
            ) : selectedOption?.icon && (
              <selectedOption.icon className="h-4 w-4 shrink-0" />
            )}
            {isLoading ? "Loading..." : selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="flex items-center gap-1">
            {clearable && value && !disabled && !isLoading && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleValueChange("");
                }}
                className="p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>

        {open && (
          <div className="absolute top-full z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center border-b border-slate-100 px-3 pb-2 pt-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-40" />
              <input
                className="flex h-8 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
            <div className="max-h-[280px] overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-slate-200">
              {filteredOptions.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  {emptyText}
                </div>
              ) : (
                <>
                  {/* Options without group */}
                  {filteredOptions.filter(o => !o.group).map(renderOption)}
                  
                  {/* Grouped options */}
                  {groups.map(groupName => (
                    <div key={groupName} className="mt-2">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {groupName}
                      </div>
                      {filteredOptions.filter(o => o.group === groupName).map(renderOption)}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs font-medium text-rose-500">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
