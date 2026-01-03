import React from 'react';

export const metadata = {
    title: 'Chemical Composition Table | Stainless Steel Pipes',
    description: 'Detailed chemical composition chart for Stainless Steel Grades 304, 304L, 316, 316L, 321, 347, and more.',
};

export default function ChemicalCompositionPage() {
    const grades = [
        { grade: "304", c: "0.08", mn: "2.00", p: "0.045", s: "0.030", si: "0.75", cr: "18.0-20.0", ni: "8.0-10.5", mo: "-" },
        { grade: "304L", c: "0.03", mn: "2.00", p: "0.045", s: "0.030", si: "0.75", cr: "18.0-20.0", ni: "8.0-12.0", mo: "-" },
        { grade: "316", c: "0.08", mn: "2.00", p: "0.045", s: "0.030", si: "0.75", cr: "16.0-18.0", ni: "10.0-14.0", mo: "2.0-3.0" },
        { grade: "316L", c: "0.03", mn: "2.00", p: "0.045", s: "0.030", si: "0.75", cr: "16.0-18.0", ni: "10.0-14.0", mo: "2.0-3.0" },
        { grade: "321", c: "0.08", mn: "2.00", p: "0.045", s: "0.030", si: "0.75", cr: "17.0-19.0", ni: "9.0-12.0", mo: "-" },
        { grade: "310S", c: "0.08", mn: "2.00", p: "0.045", s: "0.030", si: "1.50", cr: "24.0-26.0", ni: "19.0-22.0", mo: "-" },
        { grade: "904L", c: "0.02", mn: "2.00", p: "0.045", s: "0.035", si: "1.00", cr: "19.0-23.0", ni: "23.0-28.0", mo: "4.0-5.0" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-24 px-4 font-[var(--font-outfit)]">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Chemical Composition
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Standard chemical requirements for common stainless steel grades according to ASTM specifications.
                    </p>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mt-8" />
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm md:text-base text-left">
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th className="px-6 py-4 font-bold border-r border-blue-800">Grade</th>
                                    <th className="px-6 py-4 font-bold border-r border-blue-800">C (Max)</th>
                                    <th className="px-6 py-4 font-bold border-r border-blue-800">Mn (Max)</th>
                                    <th className="px-6 py-4 font-bold border-r border-blue-800">P (Max)</th>
                                    <th className="px-6 py-4 font-bold border-r border-blue-800">S (Max)</th>
                                    <th className="px-6 py-4 font-bold border-r border-blue-800">Si (Max)</th>
                                    <th className="px-6 py-4 font-bold border-r border-blue-800">Cr</th>
                                    <th className="px-6 py-4 font-bold border-r border-blue-800">Ni</th>
                                    <th className="px-6 py-4 font-bold">Mo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {grades.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-blue-50 dark:hover:bg-slate-800/50 transition-colors bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300"
                                    >
                                        <td className="px-6 py-4 font-bold text-blue-600 border-r border-gray-100 dark:border-slate-800">{item.grade}</td>
                                        <td className="px-6 py-4 border-r border-gray-100 dark:border-slate-800">{item.c}</td>
                                        <td className="px-6 py-4 border-r border-gray-100 dark:border-slate-800">{item.mn}</td>
                                        <td className="px-6 py-4 border-r border-gray-100 dark:border-slate-800">{item.p}</td>
                                        <td className="px-6 py-4 border-r border-gray-100 dark:border-slate-800">{item.s}</td>
                                        <td className="px-6 py-4 border-r border-gray-100 dark:border-slate-800">{item.si}</td>
                                        <td className="px-6 py-4 border-r border-gray-100 dark:border-slate-800">{item.cr}</td>
                                        <td className="px-6 py-4 border-r border-gray-100 dark:border-slate-800">{item.ni}</td>
                                        <td className="px-6 py-4">{item.mo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 text-sm text-gray-500 italic">
                        * Values are maximum unless a range is specified.
                    </div>
                </div>
            </div>
        </div>
    );
}
