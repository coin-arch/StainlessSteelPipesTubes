'use client';

import React, { useState } from 'react';

export default function WeightCalculatorPage() {
    const [formData, setFormData] = useState({
        shape: 'round', // round, square
        od: '',
        thickness: '',
        length: '',
        quantity: '1'
    });

    const [result, setResult] = useState<number | null>(null);

    const calculateWeight = () => {
        const od = parseFloat(formData.od);
        const thick = parseFloat(formData.thickness);
        const len = parseFloat(formData.length);
        const qty = parseFloat(formData.quantity);

        if (!od || !thick || !len || !qty) return;

        let weightPerMeter = 0;

        if (formData.shape === 'round') {
            // Formula: (OD - Thickness) * Thickness * 0.02491 (SS density roughly)
            // Usually 0.02466 for 304, but let's use standard factor
            weightPerMeter = (od - thick) * thick * 0.02491;
        } else {
            // Square: (Width - Thickness) * Thickness * 0.0314 approx
            weightPerMeter = (od - thick) * thick * 0.0314;
        }

        const totalWeight = weightPerMeter * len * qty;
        setResult(totalWeight);
    };

    const handleReset = () => {
        setFormData({ shape: 'round', od: '', thickness: '', length: '', quantity: '1' });
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-24 px-4 font-[var(--font-outfit)]">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Weight Calculator
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Calculate the theoretical weight of Stainless Steel Pipes and Tubes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Calculator Form */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800">
                        <div className="space-y-6">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Shape</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setFormData({ ...formData, shape: 'round' })}
                                        className={`p-3 rounded-lg border text-sm font-semibold transition-all ${formData.shape === 'round'
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-700 hover:border-blue-400'
                                            }`}
                                    >
                                        Round Pipe/Tube
                                    </button>
                                    <button
                                        onClick={() => setFormData({ ...formData, shape: 'square' })}
                                        className={`p-3 rounded-lg border text-sm font-semibold transition-all ${formData.shape === 'square'
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-700 hover:border-blue-400'
                                            }`}
                                    >
                                        Square / Box
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    {formData.shape === 'round' ? 'Outer Diameter (OD) [mm]' : 'Width [mm]'}
                                </label>
                                <input
                                    type="number"
                                    value={formData.od}
                                    onChange={(e) => setFormData({ ...formData, od: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="e.g. 50.8"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Wall Thickness [mm]</label>
                                <input
                                    type="number"
                                    value={formData.thickness}
                                    onChange={(e) => setFormData({ ...formData, thickness: e.target.value })}
                                    className="w-full p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="e.g. 1.5"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Length [Meters]</label>
                                    <input
                                        type="number"
                                        value={formData.length}
                                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                                        className="w-full p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="e.g. 6"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        className="w-full p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="1"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    onClick={calculateWeight}
                                    className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-[1.02] transition-all"
                                >
                                    Calculate
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-6 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-white font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                                >
                                    Reset
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="bg-gradient-to-br from-blue-900 to-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center h-full relative overflow-hidden">

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -ml-10 -mb-10" />

                        {result !== null ? (
                            <div className="relative z-10 animate-in fade-in zoom-in duration-300">
                                <div className="text-blue-200 text-sm uppercase tracking-widest font-bold mb-2">Total Weight</div>
                                <div className="text-6xl font-bold mb-2 tracking-tight">
                                    {result.toFixed(2)} <span className="text-2xl text-blue-300">kg</span>
                                </div>
                                <div className="text-white/60 text-sm">
                                    {result.toFixed(2)} kg / {(result * 2.20462).toFixed(2)} lbs
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 text-white/50">
                                <div className="w-16 h-16 border-2 border-white/20 border-dashed rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⚖️</span>
                                </div>
                                <p>Enter dimensions to see the weight.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
