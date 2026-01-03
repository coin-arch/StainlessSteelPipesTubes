import React from 'react';

export const metadata = {
    title: 'International Standards | Stainless Steel Pipes',
    description: 'Comparison of International Standards (ASTM, DIN, JIS, BS) for Stainless Steel Pipes and Tubes.',
};

export default function InternationalStandardsPage() {
    const standards = [
        { type: "Seamless Pipe", astm: "A312 / A376", din: "17456 / 17458", jis: "G3459", bs: "3605" },
        { type: "Welded Pipe", astm: "A312 / A358", din: "17457", jis: "G3459", bs: "3605" },
        { type: "Heat Exchanger Tube", astm: "A213 / A269", din: "17458", jis: "G3463", bs: "3605" },
        { type: "Boiler Tube", astm: "A213", din: "17458", jis: "G3463", bs: "3059" },
        { type: "Sanitary Tube", astm: "A270", din: "11850", jis: "G3447", bs: "-" },
        { type: "Mechanical Tube", astm: "A511 / A554", din: "17455", jis: "G3446", bs: "-" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-24 px-4 font-[var(--font-outfit)]">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        International Standards
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Cross-reference of major international manufacturing standards for stainless steel piping products.
                    </p>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mt-8" />
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-base text-left">
                            <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th className="px-8 py-5 font-bold border-r border-blue-800">Product Type</th>
                                    <th className="px-8 py-5 font-bold border-r border-blue-800">ASTM / ASME (USA)</th>
                                    <th className="px-8 py-5 font-bold border-r border-blue-800">DIN (Germany)</th>
                                    <th className="px-8 py-5 font-bold border-r border-blue-800">JIS (Japan)</th>
                                    <th className="px-8 py-5 font-bold">BS (UK)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {standards.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-blue-50 dark:hover:bg-slate-800/50 transition-colors bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300"
                                    >
                                        <td className="px-8 py-5 font-bold text-blue-600 border-r border-gray-100 dark:border-slate-800">{item.type}</td>
                                        <td className="px-8 py-5 border-r border-gray-100 dark:border-slate-800 font-medium">{item.astm}</td>
                                        <td className="px-8 py-5 border-r border-gray-100 dark:border-slate-800">{item.din}</td>
                                        <td className="px-8 py-5 border-r border-gray-100 dark:border-slate-800">{item.jis}</td>
                                        <td className="px-8 py-5">{item.bs}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
