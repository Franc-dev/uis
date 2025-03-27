"use client"
import { CardShowcase } from "./components/ui/card";
import { FormDemo } from "./components/ui/form";
import { ToastDemo } from "./components/ui/toaster";
import { UIComponentDemo } from "./components/UiDemo";
export default function Home() {
  return (
    <div className="flex  flex-col  bg-white text-black items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)] py-3.5">
   <ToastDemo /> 
   <CardShowcase />
   <FormDemo/>
   <UIComponentDemo/>
    </div>
  );
}
