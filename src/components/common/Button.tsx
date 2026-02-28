import React from "react";
import { type LucideIcon } from "lucide-react";

/* =====================================================
   1️⃣ BUTTON VARIANTS (DESIGN SYSTEM – LOCKED)
   -----------------------------------------------------
   Poore HMS project mein sirf yahi variants use honge.
   Random colors / styles allowed nahi.
   ===================================================== */
export type ButtonVariant =
  | "primary"   // main CTA (Save, Book, Add)
  | "success"   // confirm / completed
  | "warning"   // pending / attention
  | "danger"    // delete / cancel / destructive
  | "outline"   // edit / back / cancel
  | "ghost";    // table / small inline actions

/* =====================================================
   2️⃣ BUTTON PROPS
   -----------------------------------------------------
   Button kya kya accept karega:
   - variant      → button ka color/type
   - icon         → Lucide icon component
   - iconPosition → icon left ya right
   - loading      → spinner dikhana hai ya nahi
   - baqi sab native props (onClick, type, disabled etc.)
   ===================================================== */
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
}

/* =====================================================
   3️⃣ BASE STYLES (SAB BUTTONS KE LIYE COMMON)
   -----------------------------------------------------
   Yeh styles har button pe lagti hain:
   - cursor-pointer → mouse le jao to hand aaye
   - active:scale   → click pe dabne ka feel
   - transition     → smooth animation
   - focus ring     → accessibility
   - disabled state → opacity + no cursor
   ===================================================== */
const baseClasses =
  "inline-flex items-center justify-center gap-2 !rounded-full px-8 py-2.5 text-sm font-medium cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.97] active:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed";

/* =====================================================
   4️⃣ VARIANT STYLES (DESIGN SYSTEM HEART)
   -----------------------------------------------------
   Yeh object decide karta hai:
   - kaunsa variant → kaunsa color
   - hover + focus behavior
   Color change chahiye ho to sirf yahin aana
   ===================================================== */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-700 hover:bg-indigo-800 text-white focus:ring-indigo-500 shadow-md hover:shadow-lg",

  success:
    "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-md hover:shadow-lg",

  warning:
    "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400 shadow-md hover:shadow-lg",

  danger:
    "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-md hover:shadow-lg",

  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400",

  ghost:
    "bg-transparent text-indigo-700 hover:bg-gray-50 focus:ring-indigo-400",
};

/* =====================================================
   5️⃣ BUTTON COMPONENT (FINAL EXPORT)
   -----------------------------------------------------
   Yahin sab cheezain combine hoti hain:
   - base styles
   - variant styles
   - icon
   - loading
   - disabled
   ===================================================== */
export default function Button({
  children,                 // button ka text / content
  variant = "primary",      // default variant
  icon: Icon,               // Lucide icon component
  iconPosition = "left",    // icon left ya right
  loading = false,          // loading spinner show karna?
  disabled,                 // button disable karna?
  ...props                  // onClick, type="submit" etc.
}: ButtonProps) {
  return (
    <button
      /* loading ya disabled ho to click block */
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {/* LEFT ICON — jab loading na ho */}
      {Icon && iconPosition === "left" && !loading && (
        <Icon className="h-4 w-4" />
      )}

      {/* LOADING SPINNER — jab API call chal rahi ho */}
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}

      {/* BUTTON TEXT */}
      <span>{children}</span>

      {/* RIGHT ICON */}
      {Icon && iconPosition === "right" && !loading && (
        <Icon className="h-4 w-4" />
      )}
    </button>
  );
}