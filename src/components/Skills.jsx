import React from "react";
import { SKILLS } from "../data/projects";
import { Card } from "./Card";

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12">Technical Skills</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skillGroup) => (
            <Card key={skillGroup.category} className="h-full">
              <h3 className="text-lg font-semibold text-indigo-300 mb-4">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((item) => (
                  <li key={item} className="flex items-center text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
