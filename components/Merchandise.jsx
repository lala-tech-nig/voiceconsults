"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const products = [
    {
        id: 1,
        name: "VoiceConsults T-Shirt",
        price: "₦5,000",
        image: "/tshirt.png",
        description: "Premium quality cotton tee with VoiceConsults branding"
    },
    {
        id: 2,
        name: "Book Summary Journal",
        price: "₦8,500",
        image: "/journal.png",
        description: "Elegant hardcover journal for your reading notes"
    },
    {
        id: 3,
        name: "Motivational Mug",
        price: "₦3,500",
        image: "/mug.png",
        description: "Start your day with inspiration and coffee"
    },
    {
        id: 4,
        name: "VoiceConsults Tote Bag",
        price: "₦4,500",
        image: "/tote-bag.png",
        description: "Stylish canvas bag for books and essentials"
    }
];

export default function Merchandise() {
    const WHATSAPP_NUMBER = "+2348166717522";

    const handleOrder = (product) => {
        const message = `Hello! I'm interested in ordering the following product from VoiceConsults:
        
Product: ${product.name}
Price: ${product.price}
Description: ${product.description}

Please let me know the next steps for purchase. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="px-6 py-20 max-w-7xl mx-auto bg-gradient-to-b from-orange-50/30 to-transparent">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-900 mb-3">Official Merchandise</h2>
                <p className="text-stone-500 text-lg">
                    Show your love for learning with our exclusive collection
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group cursor-pointer"
                        onClick={() => handleOrder(product)}
                    >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            {/* Product Image */}
                            <div className="relative aspect-square bg-stone-50 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-stone-500 mb-4 line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-orange-600">
                                        {product.price}
                                    </span>
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg shadow-orange-500/20 transition-all transform hover:scale-110 active:scale-95">
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
                <p className="text-stone-500 mb-4">
                    More products coming soon! Stay tuned.
                </p>
            </div>
        </section>
    );
}
