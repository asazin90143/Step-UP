import Link from 'next/link';

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
            <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🎉</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for shopping with Step-up. Since this is a demo, no cards were charged and no shoes are coming. But you have excellent taste!
                </p>
                <Link
                    href="/"
                    className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-600 transition"
                >
                    Back to Store
                </Link>
            </div>
        </div>
    );
}