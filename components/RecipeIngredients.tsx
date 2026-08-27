"use client";

import { useState } from "react";

export default function RecipeIngredients({ ingredients }: { ingredients: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => ingredients.map(() => false));

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <ul className="mt-3 space-y-2 text-coffee/90">
      {ingredients.map((item, i) => (
        <li key={i}>
          <label className="flex cursor-pointer items-start gap-2 select-none">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="no-print mt-1 h-4 w-4 flex-none rounded border-coffee/30 text-chili accent-chili"
            />
            <span className={checked[i] ? "text-coffee/40 line-through" : ""}>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
